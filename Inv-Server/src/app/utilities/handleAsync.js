import MESSAGES from "../helpers/messages.js";

const handleAsync = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: MESSAGES.errorTypes.INTERNAL_SERVER_ERROR });
  }
};

export default handleAsync;
