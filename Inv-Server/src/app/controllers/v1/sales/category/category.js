import MESSAGES from "../../../../helpers/messages.js";
import { CategoryInstance } from "../../../../models/sales/repository/categoryRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";
import { CATEGORY_SCHEMA as SCHEMA_CONST } from "../../../../mocks/schemaConst/salesSchemaConst.js";
import fs from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAll = handleAsync(async (req, res) => {
  let { status = [SCHEMA_CONST.STATUS.ACTIVE, SCHEMA_CONST.STATUS.INACTIVE] } =
    req.query;
  const project = {
    title: 1,
    // image:1,
    image: { $concat: [process.env.DOMAIN_URL, "productImages/", "$image"] },
    status: 1,
  };
  const pipeline = [
    {
      $match: {
        status: { $in: status },
      },
    },
  ];
  let rows = await CategoryInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };
  let exists = await CategoryInstance.findOneDoc(
    {
      title: req.body.title,
    },
    { _id: 1 }
  );
  if (exists) {
    return res.preconditionFailed(
      MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Category")
    );
  }

  if (req.file) {
    console.log(req.file);
    createdObj.image = req.file.filename;
  }
  const userObj = await CategoryInstance.createDoc(createdObj);
  if (userObj) {
    return res.success({
      message: MESSAGES.apiSuccessStrings.CREATE("Category"),
    });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };

  let exists = await CategoryInstance.getDocById(req.params.id);
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

  let updateData = await CategoryInstance.updateDoc(exists, createdObj);
  if (!updateData) return res.preconditionFailed();
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Category"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await CategoryInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity();
  // exists.image = `${process.env.DOMAIN_URL}productImages/${exists.image}`;
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  let exist = await CategoryInstance.getDocById(req.params.id);
  let rawData = exist.toObject({ getters: false });

  let destination = resolve(
    __dirname,
    `../../../../../assets/productImages/${rawData.image}`
  );

  if (fs.existsSync(destination)) {
    fs.unlinkSync(destination);
  }

  const deleteItem = await CategoryInstance.deleteDoc(req.params.id);

  if (deleteItem)
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});
