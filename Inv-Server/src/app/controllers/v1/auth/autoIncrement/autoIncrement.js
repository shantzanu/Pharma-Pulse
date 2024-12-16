import MESSAGES from "../../../../helpers/messages.js";
import handleAsync from "../../../../utilities/handleAsync.js";
import { AutoIncrementInstance } from "../../../../models/auth/repository/autoIncrementRepository.js";
import { getIncrementNumWithPrefix } from "../../../../helpers/utility.js";
export const getAll = handleAsync(async (req, res) => {
  const project = {
    collectionName: 1,
    incPrefix: 1,
    digit: 1,
    autoIncNo: 1,
  };
  const pipeline = [];
  let rows = await AutoIncrementInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

export const create = handleAsync(async (req, res) => {
  let exists = await AutoIncrementInstance.findOneDoc(
    {
      collectionName: req.body.collectionName,
    },
    { _id: 1 }
  );
  if (exists) {
    let error = MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("AutoIncrement");
    return res.preconditionFailed(error);
  }
  const incObj = await AutoIncrementInstance.createDoc(req.body);
  if (incObj) {
    res.success({
      message: MESSAGES.apiSuccessStrings.CREATE("AutoIncrement"),
    });
  }
});

export const update = handleAsync(async (req, res) => {
  let existing = await AutoIncrementInstance.getDocById(req.params.id);
  if (!existing)
    res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);
  let updatedDoc = await AutoIncrementInstance.updateDoc(existing, req.body);
  if (!updatedDoc) {
    return res.preconditionFailed(errors);
  }
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("AutoIncrement"),
  });
});

export const getById = handleAsync(async (req, res) => {
  let existing = await AutoIncrementInstance.getDocById(req.params.id);
  if (!existing) {
    return res.unprocessableEntity(errors);
  }
  return res.success(existing);
});

export const deleteById = handleAsync(async (req, res) => {
  const deleteItem = await AutoIncrementInstance.deleteDoc(req.params.id);
  if (deleteItem) {
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
  }
});

export const getNextIncNo = async ({ collectionName, incPrefix }) => {
  let incObj = await AutoIncrementInstance.findOneDoc({
    collectionName,
  });
  if (!incObj) {
    incObj = await AutoIncrementInstance.createDoc({
      collectionName,
      incPrefix,
    });
  }
  return {
    incPrefix: incObj?.incPrefix,
    autoIncNo: incObj?.autoIncNo ?? 1,
    digit: incObj?.digit ?? 4,
  };
};

export const setNextIncNo = async ({ collectionName, incPrefix }) => {
  let incObj = await AutoIncrementInstance.findOneDoc({
    collectionName,
  });
  if (!incObj) {
    incObj = await AutoIncrementInstance.createDoc({
      collectionName,
      incPrefix,
    });
  } else {
    incObj.autoIncNo = incObj.autoIncNo++;
    await incObj.save();
  }
  return {
    incPrefix: incObj.incPrefix,
    autoIncNo: incObj.autoIncNo,
    digit: incObj?.digit ?? 4,
  };
};

export const getAndSetIncNo = async (data, incrementFlag = false) => {
  const autoIncObj = await getNextIncNo(data);
  const autoIncrementNo = getIncrementNumWithPrefix(autoIncObj);
  if (incrementFlag) {
    await setNextIncNo(data);
  }
  return autoIncrementNo;
};
