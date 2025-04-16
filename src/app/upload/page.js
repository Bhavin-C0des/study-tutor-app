"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { saveNotesToLocalStorage, convertFileToText } from "@/lib/storageUtils";
import { Upload, TextIcon, FileText, UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function UploadPage() {
  const [mode, setMode] = useState("file");
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setInputText("");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setInputText("");
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    let notes = "";

    // Show loading toast and save its ID
    const toastId = toast.loading("Uploading and processing your notes...");

    try {
      if (mode === "file" && file) {
        notes = await convertFileToText(file);
      } else if (mode === "text" && inputText.trim() !== "") {
        notes = inputText;
      }

      // Flashcards
      const flashcardsRes = await fetch("/api/generateFlashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: notes }),
      });

      if (!flashcardsRes.ok) throw new Error("Flashcards generation failed.");
      const flashcardsData = await flashcardsRes.json();
      localStorage.setItem("flashcards", JSON.stringify(flashcardsData.flashcards));

      // Summary
      const summaryRes = await fetch("/api/generateSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: notes }),
      });

      if (!summaryRes.ok) throw new Error("Summary generation failed.");
      const summaryData = await summaryRes.json();
      localStorage.setItem("summary", JSON.stringify(summaryData.summary));

      // Dismiss loading and show success
      toast.dismiss(toastId);
      toast.success("Notes uploaded and processed successfully!");

      // Wait a bit before navigating
      setTimeout(() => {
        setIsLoading(false);
        router.push("/summary");
      }, 1500); // Adjust delay to your liking
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please try again.");
      console.error("Upload error:", error);
      setIsLoading(false);
    }
  };

  const isUploadEnabled =
    (mode === "file" && file) || (mode === "text" && inputText.trim() !== "");

  const resetInputs = () => {
    setFile(null);
    setInputText("");
  };

  const onTabChange = (value) => {
    setMode(value);
    resetInputs();
  };

  return (
    <div className="min-h-screen bg-background p-8 pt-20">
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h2 className="text-4xl font-bold text-secondary-foreground">Upload Page</h2>
        <p className="mt-2 text-lg text-foreground">
          Select or drag & drop your file, or paste your notes.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-card shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-6 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Upload Your Notes
          </h1>

          <Tabs defaultValue="file" onValueChange={onTabChange}>
            <TabsList className="flex justify-center space-x-4">
              <TabsTrigger value="file" className="px-4 py-2 text-lg font-medium hover:bg-accent/10 rounded-lg">
                Upload File
              </TabsTrigger>
              <TabsTrigger value="text" className="px-4 py-2 text-lg font-medium hover:bg-accent/10 rounded-lg">
                Paste Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file">
              <label
                htmlFor="file-upload"
                className="mt-4 block border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {file ? (
                  <p className="text-foreground font-medium">{file.name}</p>
                ) : (
                  <p className="text-muted-foreground">Click or drag & drop to select a file</p>
                )}
                <Input
                  id="file-upload"
                  type="file"
                  accept=".txt,.pdf,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </TabsContent>

            <TabsContent value="text">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your notes here..."
                className="mt-4 resize-none border border-border rounded-lg p-4 max-h-[150px] overflow-y-auto"
              />
            </TabsContent>
          </Tabs>

          {isUploadEnabled && (
            <div className="flex justify-center mt-3">
              <Button
                onClick={handleUpload}
                disabled={isLoading}
                className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-3 rounded-full shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="w-full md:w-1/3 bg-popover p-8 sticky top-0">
          <h3 className="text-2xl font-semibold text-foreground mb-4">How to Upload</h3>
          <ol className="space-y-4 text-foreground list-decimal pl-5">
            <li className="flex items-center">
              <span className="mr-3 text-accent">
                <FileText className="inline-block w-5 h-5 mr-1" />
              </span>
              Select a .txt, .pdf, or .docx file.
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-accent">
                <TextIcon className="inline-block w-5 h-5 mr-1" />
              </span>
              Or switch to "Paste Notes" to enter your text.
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-accent">
                <UploadCloud className="inline-block w-5 h-5 mr-1" />
              </span>
              Drag & drop your file into the area.
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-accent">
                <Upload className="inline-block w-5 h-5 mr-1" />
              </span>
              Click "Upload" to start processing.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
