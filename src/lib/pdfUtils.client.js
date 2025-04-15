import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const convertPdfToText = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();

          const text = content.items.map((item) => item.str).join(" ");
          fullText += text + "\n\n";
        }

        resolve(fullText.trim());
      } catch (err) {
        reject("Error while parsing PDF: " + err.message);
      }
    };

    reader.onerror = () => {
      reject("File reading failed: " + reader.error.message);
    };

    reader.readAsArrayBuffer(file);
  });
};
