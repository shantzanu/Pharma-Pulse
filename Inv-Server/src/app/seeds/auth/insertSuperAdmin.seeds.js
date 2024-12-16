import SUPER_ADMIN from "../../mocks/superAdminUser.json" assert { type: "json" };
import { UserInstance } from "../../models/auth/repository/userRepository.js";

export const insertSuperAdmin = async () => {
  try {
    let user = await UserInstance.findOneDoc({ email:SUPER_ADMIN.email });
    if (!user) {
      await UserInstance.createDoc(SUPER_ADMIN);
    } else {
      user.password = SUPER_ADMIN.password;
      await user.save();
    }
    console.info("Super Admin updated successfully!!");
  } catch (error) {
    throw new Error(error);
  }
};
