import { AuthFactory } from "../factory/auth/auth.js";

export default async function (request, response, next) {    
  const result = await AuthFactory().execute({ token: request.cookies?.token });
  if (result.isLeft()) {
    return response.status(401).json({ message: result.value.message });
  }
  request.user = { id: result.value.id, twitterId: result.value.twitterId };
  return next();
}