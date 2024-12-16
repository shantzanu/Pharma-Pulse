import MESSAGES from "../../../../helpers/messages.js";
import { HomeVisualInstance } from "../../../../models/sales/repository/homeVisualRepository.js";
// import { CategoryInstance } from "../../../../models/sales/repository/categoryRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";
import { HOME_VISUAL_SCHEMA as SCHEMA_CONST } from "../../../../mocks/schemaConst/salesSchemaConst.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { dirname, join, resolve } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAll = handleAsync(async (req, res) => {
  // let { status = [SCHEMA_CONST.STATUS.ACTIVE, SCHEMA_CONST.STATUS.INACTIVE] } =
  //   req.query;
  const project = {
    type: 1,
    status: 1,
    image: { $concat: [process.env.DOMAIN_URL, "productImages/", "$image"] },
  };
  const pipeline = [];
  let rows = await HomeVisualInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };

  // let exists = await HomeVisualInstance.findOneDoc(
  //   {
  //     name: req.body.name,
  //   },
  //   { _id: 1 }
  // );
  // if (exists) {
  //   return res.preconditionFailed(
  //     MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Sub Category")
  //   );
  // }
  if (req.file) {
    createdObj.image = req.file.filename;
  }
  const userObj = await HomeVisualInstance.createDoc(createdObj);
  if (userObj) {
    return res.success({
      message: MESSAGES.apiSuccessStrings.CREATE("Image"),
    });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };

  let exists = await HomeVisualInstance.getDocById(req.params.id);
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);

  if (req.file) {
    createdObj.image = req.file.filename;
    let destination = resolve(
      __dirname,
      `../../../../../assets/productImages/${exists.image}`
    );

    if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
  }
  let updateData = await HomeVisualInstance.updateDoc(exists, createdObj);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Image"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await HomeVisualInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity(errors);
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  let exist = await HomeVisualInstance.getDocById(req.params.id);
  let rawData = exist.toObject({ getters: false });

  let destination = resolve(
    __dirname,
    `../../../../../assets/productImages/${rawData.image}`
  );

  if (fs.existsSync(destination)) {
    fs.unlinkSync(destination);
  }
  const deleteItem = await HomeVisualInstance.deleteDoc(req.params.id);
  if (deleteItem)
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});
