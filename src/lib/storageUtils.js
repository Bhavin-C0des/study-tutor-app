import { convertPdfToText } from "./pdfUtils.client";  // Import the updated convertPdfToText function
import mammoth from "mammoth";

// Save notes to Local Storage
export const saveNotesToLocalStorage = (notes) => {
  try {
    console.log("Saving notes to localStorage");
    localStorage.setItem("userNotes", notes);
  } catch (error) {
    console.error("Error saving notes to localStorage", error);
  }
};

// Get notes from Local Storage
export const getNotesFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Only access localStorage if running on the client side
    return localStorage.getItem("userNotes") || "";
  }
  return ""; // Return an empty string if on the server
};

// Main file conversion entry
export async function convertFileToText(file) {
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (fileExtension === "txt") {
    return await convertTxtToText(file);
  } else if (fileExtension === "pdf") {
    return await convertPdfToText(file);  // This will now use the pdf2json function
  } else if (fileExtension === "docx") {
    return await convertDocxToText(file);
  } else {
    throw new Error("Unsupported file type");
  }
}

// TXT conversion
async function convertTxtToText(file) {
  return await file.text();
}

// DOCX conversion
async function convertDocxToText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      mammoth.extractRawText({ arrayBuffer: reader.result })
        .then(result => resolve(result.value))
        .catch(() => reject("Error extracting text from DOCX"));
    };

    reader.onerror = () => reject("Error reading DOCX file");
    reader.readAsArrayBuffer(file);
  });
}
