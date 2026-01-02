import User from "../entity/user.js";

export default class Repository {
  #database;
  #collection = "user";

  constructor(database) {
    this.#database = database;
  }

  async create(user) {    
    await this.#database.insert(
      this.#collection,
      {
        id: user.id,
        walletId: user.walletId,
        address: user.address,
        twitterId: user.twitterId,
        twitterUsername: user.twitterUsername,
        twitterAvatar: user.twitterAvatar,
      }
    );
  }

  async load(query) {
    const users = await this.#database.find(this.#collection, query);
    if (!users.length) return null;
    return users.map(
      (user) =>
        new User({
          id: user.id,
          walletId: user.walletId,
          address: user.address,
          twitterId: user.twitterId,
          twitterUsername: user.twitterUsername,
          twitterAvatar: user.twitterAvatar,
        })
    );
  }

  async loadOne(query) {
    const user = await this.#database.findOne(this.#collection, query);
    if (!user) return null;
    return new User({
      id: user.id,
      walletId: user.walletId,
      address: user.address,
      twitterId: user.twitterId,
      twitterUsername: user.twitterUsername,
      twitterAvatar: user.twitterAvatar,
    })
  }

  async update(user) {
    await this.#database.update(this.#collection,
      {
        id: user.id,
      },
      {
        walletId: user.walletId,
        address: user.address,
        twitterId: user.twitterId,
        twitterUsername: user.twitterUsername,
        twitterAvatar: user.twitterAvatar,
      }
    );
  }
}
