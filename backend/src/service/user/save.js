import User from "../../entity/user.js";
import { left, right } from "../../shared/either.js";

export default class Service {
  constructor({ repository, walletProvider }) {
    this.repository = repository;
    this.walletProvider = walletProvider;
  }

  async execute(params) {        
    let result = await this.repository.loadOne({ twitterId: params.id });
    if (result) {      
      if (result.twitterUsername != params.username || result.twitterAvatar != params.photos[0].value) {
        result.twitterUsername = params.username;
        result.twitterAvatar = params.photos[0].value;
        await this.repository.update(result);
      }
      return right({
        id: result.id,
        address: result.address,
        twitterId: result.twitterId,
        twitterUsername: result.twitterUsername,
        twitterAvatar: result.twitterAvatar,
      });
    }
    result = await this.repository.loadOne({ twitterUsername: params.username });
    if (result) {
      result.twitterId = params.id;
      result.twitterAvatar = params.photos[0].value;
      await this.repository.update(result);
      return right({
        id: result.id,
        address: result.address,
        twitterId: result.twitterId,
        twitterUsername: result.twitterUsername,
        twitterAvatar: result.twitterAvatar,
      });
    }
    const wallet = await this.walletProvider.createWallet();
    const created = User.create({
      walletId: wallet.id,
      address: wallet.address,
      twitterId: params.id,
      twitterUsername: params.username,
      twitterAvatar: params.photos[0].value,
    });    
    if (created.isLeft()) return left({ type: "BAD_REQUEST", message: created.value });
    const user = created.value;
    await this.repository.create(user);
    return right({
      id: user.id,
      address: user.address,
      twitterId: user.twitterId,
      twitterUsername: user.twitterUsername,
      twitterAvatar: user.twitterAvatar,
    });
  }
}