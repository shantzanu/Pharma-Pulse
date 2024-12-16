import handleAsync from "../utilities/handleAsync.js"; 
import { insertSuperAdmin } from "./auth/insertSuperAdmin.seeds.js";

const initialInsert = handleAsync(async () => { 
  await insertSuperAdmin();
});
export default initialInsert;
