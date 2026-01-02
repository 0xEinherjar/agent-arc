import Database from "../../repository/database.js";
import Repository from "../../repository/user.js";
import Service from "../../service/blockchain/transfer-native.js";
import WalletProvider from "../../wallet-provider.js";

export const TransferNativeFactory = () => {
  const database = new Database();
  const repository = new Repository(database);
  const walletProvider = new WalletProvider();
  const service = new Service({ repository, walletProvider });
  return service;
};
