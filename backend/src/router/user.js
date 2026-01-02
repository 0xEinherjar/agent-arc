import { Router } from "express";
import { LoadUserFactory } from "../factory/user/load.js";
import { ImportWalletFactory } from "../factory/user/import-wallet.js";
import { ExportWalletFactory } from "../factory/user/export-wallet.js";
import { WithdrawFactory } from "../factory/user/withdraw.js";
import { httpStatusFromErrorType } from "../shared/http-status.js";
import AuthMiddleware from "../middleware/auth.js";

const router = Router();

router.use(AuthMiddleware);

router.get('/', async (request, response, next) => {
  try {
    const result = await LoadUserFactory().execute({ id: request.user.id });
    if (result.isRight()) return response.status(200).json(result.value);
    return response
      .status(httpStatusFromErrorType(result.value.type))
      .json({ error: result.value.message });
  } catch (error) {
    next(error);
  }
});

// router.get('/export-wallet', async (request, response) => {
//   try {
//     const result = await ExportWalletFactory().execute({ id: request.user.id });
//     if (result.isRight()) return response.status(200).json(result.value);
//     return response
//       .status(httpStatusFromErrorType(result.value.type))
//       .end(result.value.message);
//   } catch (_) {
//     return response.status(500).end("Internal server error");
//   }
// });

// router.post('/import-wallet', async (request, response) => {
//   try {
//     const result = await ImportWalletFactory().execute(Object.assign({ id: request.user.id }, { privateKey: request.body.privateKey }));
//     if (result.isRight()) return response.status(204).end();
//     return response
//       .status(httpStatusFromErrorType(result.value.type))
//       .end(result.value.message);
//   } catch (_) {
//     return response.status(500).end("Internal server error");
//   }
// });

router.post('/withdraw', async (request, response, next) => {
  try {    
    const result = await WithdrawFactory().execute(Object.assign({ id: request.user.id }, request.body ));
    if (result.isRight()) return response.status(201).json(result.value);
    return response
      .status(httpStatusFromErrorType(result.value.type))
      .json({ error: result.value.message });
  } catch (error) {
    next(error);
  }
});

export default router;