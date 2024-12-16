import MESSAGES from "../../../../helpers/messages.js";
import { PurchaseBillInstance } from "../../../../models/sales/repository/purchaseBillRepository.js";
import { CategoryInstance } from "../../../../models/sales/repository/categoryRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";
import { PURCHASE_BILL_SCHEMA as SCHEMA_CONST } from "../../../../mocks/schemaConst/salesSchemaConst.js";
import { fileURLToPath } from "url";
import { ItemInstance } from "../../../../models/sales/repository/itemRepository.js";
import { dirname, join, resolve } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAll = handleAsync(async (req, res) => {
  const project = {
    gstNo: 1,
    partyName: 1,
    billDate: 1,
    total: 1,
    data: 1,
    status: 1,
  };
  let rows = await PurchaseBillInstance.getAllPaginate({
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };
  createdObj.total = createdObj.data.reduce(
    (acc, item) => acc + (item.qty || 0) * (item.mrp || 0),
    0
  );
  const userObj = await PurchaseBillInstance.createDoc(createdObj);

  if (userObj) {
    return res.success({
      message: MESSAGES.apiSuccessStrings.CREATE("Product"),
    });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };
  createdObj.total = createdObj.data.reduce(
    (acc, item) => acc + (item.qty || 0) * (item.mrp || 0),
    0
  );
  let exists = await PurchaseBillInstance.getDocById(req.params.id);
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);

  let updateData = await PurchaseBillInstance.updateDoc(exists, createdObj);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Product"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await PurchaseBillInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity();
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  let exist = await PurchaseBillInstance.getDocById(req.params.id);

  const deleteItem = await PurchaseBillInstance.deleteDoc(req.params.id);
  if (deleteItem)
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});

export const MasterData = handleAsync(async (req, res) => {
  let masterData = await ItemInstance.findAllDoc({});
  // let category = await CategoryInstance.findAllDoc({}, { _id: 1, title: 1 });
  let item = await ItemInstance.findAllDoc({});

  return res.success({ masterData, item });
});
