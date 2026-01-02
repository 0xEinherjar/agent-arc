import { createWalletClient, http } from "viem";
import { createViemAccount } from "@privy-io/node/viem";
import * as chains from "viem/chains";
import { left, right } from "../../shared/either.js";

export default class Service {
  constructor({ repository, walletProvider }) {
    this.repository = repository;
    this.walletProvider = walletProvider;
  }

  async execute(input) {    
    const user = await this.repository.loadOne({ id: input.id });
    if (!user) return left({ type: "NOT_FOUND", message: "User not found" });
    const account = await createViemAccount(this.walletProvider.getClient(), {
      walletId: user.walletId,
      address: user.address
    });    
    
    const client = createWalletClient({ 
      account: account, 
      chain: chains.arcTestnet,
      transport: http()
    });

    const hash = await client.sendTransaction({ 
      to: input.to,
      value: BigInt(input.value)
    })

    return right({ hash });
  }
}