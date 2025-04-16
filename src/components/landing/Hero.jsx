import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Image from Next.js
import Link from "next/link"; // Import Link from Next.js
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex w-full items-center h-128">
      <div className="flex flex-col w-1/2 px-8">
        <div className="flex flex-col text-5xl font-bold mb-4 h-48">
          <h1 className="text-accent">Upload your notes.</h1>
          <h1>Get <span className="bg-gradient-to-r dark:from-pink-500 dark:to-yellow-500 from-cyan-500 to-green-400 bg-clip-text text-transparent font-semibold">AI-generated</span> flashcards</h1>
          <h1>and summaries — instantly.</h1>
        </div>
        <p className="text-xl mb-4 text-muted-foreground">
          Turn class notes into flashcards and summaries with one click. AI does
          the work, you get the grade.
        </p>
        <div>
          {/* Wrap the Button inside a Link component to navigate */}
          <Link href="/upload">
            <Button variant="accent">Get Started</Button>
          </Link>
          <Link href="/upload" className="mr-4">
            <Button variant="accent">Get Started</Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center w-1/2 p-6 mt-16">
        {/* Add the hero-image here */}
        <Image 
          src="/hero-image.png" 
          alt="Hero Image" 
          width={600}  // You can adjust the width as needed
          height={450} // Adjust the height as needed
          className="rounded-lg"  // Optional: Add any styling you want
        />
      <div className="flex justify-center items-center w-1/2 p-8 ">
        <Image src="/hero-image.png" alt="Image for Hero" width="800" height="600" className="object-contain"/>
      </div>
    </div>
  );
}
