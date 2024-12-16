import MESSAGES from "../../../../helpers/messages.js";
import { ItemInstance } from "../../../../models/sales/repository/itemRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";

export const getAll = handleAsync(async (req, res) => {
  const project = {
    name: 1,
    category: 1,
    pack: 1,
    batchNo: 1,
    shelf: 1,
    expiryDate: 1,
    qty: 1,
    mrp: 1,
    status: 1,
  };
  const pipeline = [];
  let rows = await ItemInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let exists = await ItemInstance.findOneDoc(
    {
      name: req.body.name,
    },
    { _id: 1 }
  );
  if (exists){
    return  res.preconditionFailed(
      MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Variant")
    );}
  const userObj = await ItemInstance.createDoc(req.body);
  if (userObj) {
    return res.success({ message: MESSAGES.apiSuccessStrings.CREATE("Variant") });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let exists = await ItemInstance.getDocById(req.params.id);
  if (!exists) return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);
  let updateData = await ItemInstance.updateDoc(exists, req.body);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Variant"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await ItemInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity(errors);
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  const deleteItem = await ItemInstance.deleteDoc(req.params.id);
  if (deleteItem) return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});
