import jwt from "jsonwebtoken";
import { left, right } from "../../shared/either.js";
import { constants } from "../../shared/constant.js"

export default class Auth {    
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute({ token }) {
    if (!token) return left({ type: "UNAUTHORIZED", message: "Token missing" });
    try {
      const payload = jwt.verify(token, constants.JWT_SECRET);            
      const user = await this.repository.loadOne({ id: payload.id });
      if (!user) return left({ type: "UNAUTHORIZED", message: "User not found" });
      return right({ id: payload.id, twitterId: payload.twitterId });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return left({ type: "UNAUTHORIZED", message: "Token has expired" });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return left({ type: "UNAUTHORIZED", message: "Invalid token or signature" });
      }
      return left({ type: "UNAUTHORIZED", message: "Invalid token" });
    }
  }
}