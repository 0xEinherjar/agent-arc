import { MongoClient, ServerApiVersion } from "mongodb";
import { constants } from "../shared/constant.js"

export default class Database {
  #databaseName = constants.MONGODB_NAME_DATABASE;
  static client = new MongoClient(constants.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  async close() {
    await Database.client.close();
  }

  async connect() {
    await Database.client.connect();
    await Database.client.db("admin").command({ ping: 1 });
  }

  async collection() {
    return await Database.client.db(this.#databaseName);
  }

  async find(collection, query) {
    return await Database.client.db(this.#databaseName).collection(collection).find(query).toArray();
  }

  async findWithProject(collection, query, project) {
    return await Database.client.db(this.#databaseName).collection(collection).find(query).project(project).toArray();
  }

  async findOne(collection, query) {
    return await Database.client.db(this.#databaseName).collection(collection).findOne(query);
  }

  async insertMany(collection, query) {
    return await Database.client.db(this.#databaseName).collection(collection).insertMany(query);
  }

  async insert(collection, params) {
    await Database.client.db(this.#databaseName).collection(collection).insertOne(params);
  }

  async update(collection, query, params) {
    await Database.client.db(this.#databaseName).collection(collection).updateOne(query, { $set: params });
  }

  async updateMany(collection, query, params) {
    await Database.client.db(this.#databaseName).collection(collection).updateMany(query, { $set: params });
  }

  async deleteAll(collection) {
    await Database.client.db(this.#databaseName).collection(collection).deleteMany({});
  }

  async aggregate(collection, query) {
    return await Database.client.db(this.#databaseName).collection(collection).aggregate([ { $group: query } ]).toArray();
  }
}