import { left, right } from "../../shared/either.js";

export default class Service {
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute(query) {
    const result = await this.repository.loadOne(query);
    if (!result) return left({ type: "NOT_FOUND", message: "User not found" });
    return right({
      id: result.id,
      address: result.address,
      twitterId: result.twitterId,
      twitterUsername: result.twitterUsername,
      twitterAvatar: result.twitterAvatar,
    });
  }
}