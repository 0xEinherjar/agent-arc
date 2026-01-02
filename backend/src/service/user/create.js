import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import User from "../../entity/user.js";
import { left, right } from "../../shared/either.js";

export default class Service {
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute(params) {
    const result = await this.repository.loadOne({ twitterId: params.twitterId });
    if (result) return left({ type: "UNAUTHORIZED", message: "User already created" });
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    const created = User.create({
      privateKey: privateKey,
      address: account.address,
      twitterId: params.twitterId,
      twitterUsername: params.twitterUsername,
    });
    if (created.isLeft()) return left({ type: "BAD_REQUEST", message: created.value });
    const user = created.value;
    await this.repository.create(user);
    return right(null);
  }
}