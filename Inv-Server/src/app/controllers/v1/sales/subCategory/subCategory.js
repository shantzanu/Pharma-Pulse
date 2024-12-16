import MESSAGES from "../../../../helpers/messages.js";
import { SubCategoryInstance } from "../../../../models/sales/repository/subCategoryRepository.js";
import { CategoryInstance } from "../../../../models/sales/repository/categoryRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";
import { SUB_CATEGORY_SCHEMA as SCHEMA_CONST } from "../../../../mocks/schemaConst/salesSchemaConst.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { dirname, join, resolve } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAll = handleAsync(async (req, res) => {
  let { status = [SCHEMA_CONST.STATUS.ACTIVE, SCHEMA_CONST.STATUS.INACTIVE] } =
    req.query;
  const project = {
    categoryId: 1,
    name: 1,
    status: 1,
    category: "$categoryDetails.title",
    image: { $concat: [process.env.DOMAIN_URL, "productImages/", "$image"] },
  };
  const pipeline = [
    {
      $match: {
        status: { $in: status },
      },
    },
    {
      $lookup: {
        from: "category",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryDetails",
        pipeline: [{ $project: { _id: 1, title: 1 } }],
      },
    },
    {
      $unwind:"$categoryDetails"
    }
  ];
  let rows = await SubCategoryInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };

  let exists = await SubCategoryInstance.findOneDoc(
    {
      name: req.body.name,
    },
    { _id: 1 }
  );
  if (exists) {
    return res.preconditionFailed(
      MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Sub Category")
    );
  }
  if (req.file) { 
    createdObj.image = req.file.filename;
  }
  const userObj = await SubCategoryInstance.createDoc(createdObj);
  if (userObj) {
    return res.success({
      message: MESSAGES.apiSuccessStrings.CREATE("Sub Category"),
    });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };

  let exists = await SubCategoryInstance.getDocById(req.params.id);
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
  let updateData = await SubCategoryInstance.updateDoc(exists, createdObj);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Sub Category"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await SubCategoryInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity(errors);
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  let exist = await SubCategoryInstance.getDocById(req.params.id);
  let rawData = exist.toObject({ getters: false });

  let destination = resolve(
    __dirname,
    `../../../../../assets/productImages/${rawData.image}`
  );

  if (fs.existsSync(destination)) {
    fs.unlinkSync(destination);
  }
  const deleteItem = await SubCategoryInstance.deleteDoc(req.params.id);
  if (deleteItem)
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});

export const MasterData = handleAsync(async (req, res) => {
  let category = await CategoryInstance.findAllDoc({}, { _id: 1, title: 1 });
  return res.success(category);
});
