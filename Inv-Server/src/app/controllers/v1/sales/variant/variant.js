import MESSAGES from "../../../../helpers/messages.js";
import { VariantInstance } from "../../../../models/sales/repository/variantRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";

export const getAll = handleAsync(async (req, res) => {
  const project = {
    name: 1,
    description: 1,
    status: 1,
  };
  const pipeline = [];
  let rows = await VariantInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let exists = await VariantInstance.findOneDoc(
    {
      name: req.body.name,
    },
    { _id: 1 }
  );
  if (exists){
    return  res.preconditionFailed(
      MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Variant")
    );}
  const userObj = await VariantInstance.createDoc(req.body);
  if (userObj) {
    return res.success({ message: MESSAGES.apiSuccessStrings.CREATE("Variant") });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let exists = await VariantInstance.getDocById(req.params.id);
  if (!exists) return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);
  let updateData = await VariantInstance.updateDoc(exists, req.body);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Variant"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await VariantInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity(errors);
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  const deleteItem = await VariantInstance.deleteDoc(req.params.id);
  if (deleteItem) return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});
