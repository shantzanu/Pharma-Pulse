import FileHandler from "./fileHandler.js";

export const loadJson = async (filePath) => {
  const isJsonImportSupported = false;

  if (isJsonImportSupported) {
    try {
      const data = await import(filePath);
      console.log(`JSON imported successfully from ${filePath}`);
      return data;
    } catch (err) {
      console.error(`Error importing JSON from ${filePath}:`, err);
    }
  }

  // Fallback for environments where JSON import might fail or be undesirable
  return await loadJsonFromFile(filePath);
};

// Fallback function to read and parse JSON from the file system
const loadJsonFromFile = async (filePath) => {
  try {
    const file = new FileHandler(filePath);
    const data = await file.readFile();
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file from ${filePath}:`, error);
    throw error;
  }
};
