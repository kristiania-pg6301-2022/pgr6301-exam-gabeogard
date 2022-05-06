import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const server = app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server launched on http://localhost:${server.address()?.port}`);
});
