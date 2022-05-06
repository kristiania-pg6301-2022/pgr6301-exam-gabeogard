import { Router } from "express";
import { setupGoogle, signOut, signIn } from "../controllers/loginController";

const router = Router();
export const loginApi = () => {
  router.get("/", setupGoogle);

  router.delete("/", signOut);

  router.post("/:provider", signIn);
  return router;
};
