import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex w-full items-center h-128">
      <div className="flex flex-col w-1/2 px-8">
        <div className="flex flex-col text-5xl font-bold mb-4 h-64">
          <h1 className="text-accent">Upload your notes.</h1>
          <h1>Get AI-generated flashcards</h1>
          <h1>and summaries — instantly.</h1>
        </div>
        <p className="text-xl mb-4 text-muted-foreground">
          Turn class notes into flashcards and summaries with one click. AI does
          the work, you get the grade.
        </p>
        <div>
          <Button variant="accent">Get Started</Button>
        </div>
      </div>

      <div className="flex justify-center items-center w-1/2 p-6 bg-muted rounded-lg shadow-xl space-y-8">
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Feature 1
              </h3>
              <p className="text-muted-foreground">
                This is a brief description of feature 1, highlighting its key
                benefits in a simple and clean format.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Feature 2
              </h3>
              <p className="text-muted-foreground">
                This feature provides a practical solution to common problems,
                aiming to improve productivity and efficiency.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Feature 3
              </h3>
              <p className="text-muted-foreground">
                The third feature is designed to enhance the user experience,
                providing flexibility and ease of use across different devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
