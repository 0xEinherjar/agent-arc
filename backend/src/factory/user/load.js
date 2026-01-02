import Database from "../../repository/database.js";
import Repository from "../../repository/user.js";
import Service from "../../service/user/load.js";

export const LoadUserFactory = () => {
  const database = new Database();
  const repository = new Repository(database);
  const service = new Service({ repository });
  return service;
};
