export function removeFile(destination) {
  if (fs.existsSync(destination)) {
    fs.unlinkSync(destination);
  }
}
export function removeFilesInError(file) {
  if (file && file.length > 0) {
    for (const ele of file) {
      removeFile(ele.path);
    }
  }
}
export function removeSingleFileInError(file) {
  if (file) {
    removeFile(file.path);
  }
}
export function removeFileCreate(file) {
  if (file && file.length > 0) {
    removeFile(file[0].path);
  }
}

export const getMatchData = async (project, search) => {
  let match = {};
  if (!!search) {
    match["$or"] = [];
    for (let i = 0; i < Object.keys(project).length; i++) {
      const key = Object.keys(project)[i];
      match["$or"].push({ [key]: { $regex: `${search}`, $options: "i" } });
    }
  }
  return match;
};

export const getIncrementNumWithPrefix = ({ incPrefix, autoIncNo, digit }) => {
  return `${incPrefix ? incPrefix : ""}${String(autoIncNo).padStart(
    digit,
    "0"
  )}`;
};
