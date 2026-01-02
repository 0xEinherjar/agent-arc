import { privateKeyToAccount } from "viem/accounts";
import { left, right } from "../../shared/either.js";

export default class Service {
  constructor({ repository, walletProvider }) {
    this.repository = repository;
    this.walletProvider = walletProvider;
  }

  async execute(params) {    
    const user = await this.repository.loadOne({ id: params.id });
    if (!user) return left({ type: "NOT_FOUND", message: "User not found" });
    const account = privateKeyToAccount(params.privateKey);
    const wallet = await this.walletProvider.importWallet({ wallet: account.address, privateKey: privateKey });
    user.walletId = wallet.id,
    user.address = wallet.address;
    await this.repository.update(user);
    return right(null);
  }
}