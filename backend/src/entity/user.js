import { randomUUID } from "crypto";
import { left, right } from "../shared/either.js";

export default class User {
  constructor({ id, walletId, address, twitterId, twitterUsername, twitterAvatar }) {
    this.id = id || randomUUID();
    this.walletId = walletId;
    this.address = address;
    this.twitterId = twitterId;
    this.twitterUsername = twitterUsername;
    this.twitterAvatar = twitterAvatar;
  }

  static create(props) {
    const error = User.#validateProps(props)
    if (error) return left(error);
    return right(new User(props));
  }

  static #validateProps({ walletId, address }) {
    if (!walletId) return "Wallet Id is required.";
    if (!address) return "Address is required.";
    return null;
  }
}
