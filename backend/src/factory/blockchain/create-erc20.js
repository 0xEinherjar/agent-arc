import Database from "../../repository/database.js";
import Repository from "../../repository/user.js";
import Service from "../../service/blockchain/create-erc20.js";
import WalletProvider from "../../wallet-provider.js";

export const CreateErc20Factory = () => {
  const database = new Database();
  const repository = new Repository(database);
  const walletProvider = new WalletProvider();
  const service = new Service({ repository, walletProvider });
  return service;
};
