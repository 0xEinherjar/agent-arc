import { createWalletClient, erc20Abi, http, publicActions, BaseError, ContractFunctionRevertedError, parseUnits, formatUnits } from "viem";
import * as chains from "viem/chains";
import { createViemAccount } from "@privy-io/node/viem"
import { left, right } from "../../shared/either.js";
import User from "../../entity/user.js";

export default class Service {
  constructor({ repository, walletProvider }) {
    this.repository = repository;
    this.walletProvider = walletProvider;
  }

  async execute(input) {
    try {
      const username = input.to.replace("@", "");
      const user = await this.repository.loadOne({ twitterId: input.id });
      if (!user) return left({ type: "NOT_FOUND", message: "User not found" });
      let recipient = await this.repository.loadOne({ twitterUsername: username });
      if (!recipient) {
        const wallet = await this.walletProvider.createWallet();
        const created = User.create({
          walletId: wallet.id,
          address: wallet.address,
          twitterUsername: username,
        });
        if (created.isLeft()) return left({ type: "BAD_REQUEST", message: created.value });
        recipient = created.value;
        await this.repository.create(recipient);
      };

      const account = await createViemAccount(this.walletProvider.getClient(), {
        walletId: user.walletId,
        address: user.address
      });

      const chain = chains[input.chain] || chains.arcTestnet;
      if (!chain) return left({ type: "INVALID_CHAIN", message: `Unsupported chain: ${input.chain}` });

      const client = createWalletClient({
        account: account,
        chain: chain,
        transport: http(),
      }).extend(publicActions);

      const decimals = await client.readContract({
        address: input.token,
        abi: erc20Abi,
        functionName: 'decimals',
      })

      const balance = await client.readContract({
        address: input.token,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account.address],
      })

      const balanceFormatted = formatUnits(balance, decimals);

      if (Number(balanceFormatted) < Number(input.value)) {
        return left({ type: "NOT_ENOUGH_BALANCE", message: "Not enough balance" });
      }

      const valueFormatted = parseUnits(String(input.value), decimals);

      const { request } = await client.simulateContract({
        address: input.token,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [recipient.address, valueFormatted],
      })

      const hash = await client.writeContract(request);

      return right(hash);
    } catch (error) {
      if (error instanceof BaseError) {
        const revertError = error.walk(err => err instanceof ContractFunctionRevertedError);
        if (revertError instanceof ContractFunctionRevertedError) {
          const errorName = revertError.data?.errorName ?? '';
          return left({ type: "ERROR_CONTRACT", message: errorName });
        }
      }
      return left({ type: "SERVER_ERROR", message: error })
    }
  }
}