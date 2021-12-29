import dotenv from "dotenv";
import { connectDB, disconnectDB, syncTables, dropTables } from "./database/db";

dotenv.config();

(async () => {
  await connectDB();
  await dropTables(["currentStates"]);
  await syncTables();
  await disconnectDB();
})();
