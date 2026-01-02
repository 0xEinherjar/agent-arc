import { left, right } from "../../shared/either.js";

export default class Service {
  constructor({ repository, walletProvider }) {
    this.repository = repository;
    this.walletProvider = walletProvider;
  }

  async execute(params) {        
    const user = await this.repository.loadOne({ id: params.id });
    if (!user) return left({ type: "NOT_FOUND", message: "User not found" });
    const privateKey = await this.walletProvider.exportWallet(user.walletId);
    
    return right({ privateKey });
  }
}