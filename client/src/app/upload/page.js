export default function UploadPage() {
    return (
        <main className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <h1 className="text-2xl font-bold">Upload Your Notes</h1>
        <p className="mt-4 text-lg">Get AI-generated flashcards and summaries instantly.</p>
        <div className="mt-8">
            <input type="file" accept=".pdf, .docx, .txt" />
            <button className="ml-4 p-2 bg-blue-500 text-white rounded">Upload</button>
        </div>
        </main>
    );
}