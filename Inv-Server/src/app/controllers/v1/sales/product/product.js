import MESSAGES from "../../../../helpers/messages.js";
import { ProductInstance } from "../../../../models/sales/repository/productRepository.js";
import { ItemInstance } from "../../../../models/sales/repository/itemRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";

export const getAll = handleAsync(async (req, res) => {
  const project = {
    date: 1,
    docName: 1,
    customerName: 1,
    contactNo: 1,
    address: 1,
    data: 1,
    status: 1,
    productCode: 1,
    total: 1,
  };
  let rows = await ProductInstance.getAllPaginate({
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
  const userObj = await ProductInstance.createDoc(createdObj);

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
  let exists = await ProductInstance.getDocById(req.params.id);
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);

  let updateData = await ProductInstance.updateDoc(exists, createdObj);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Product"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await ProductInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity();
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  let exist = await ProductInstance.getDocById(req.params.id);

  const deleteItem = await ProductInstance.deleteDoc(req.params.id);
  if (deleteItem)
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});

export const MasterData = handleAsync(async (req, res) => {
  let masterData = await ItemInstance.findAllDoc({});
  // let category = await CategoryInstance.findAllDoc({}, { _id: 1, title: 1 });
  let item = await ItemInstance.findAllDoc({});

  return res.success({ masterData, item });
});
