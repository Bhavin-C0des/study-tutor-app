import ToggleTheme from "./Theme/ToggleTheme";

export default function Navbar() {
    return(
        <nav className="flex items-center justify-between px-16 py-2 border-b transition-duration-200">

            <a href="/" className="text-3xl font-bold hover:scale-105 transition">Crux AI</a>

            <div className="flex flex-row gap-8">
                <a href="/" className="hover:text-accent">Home</a>
                <a href="/" className="hover:text-accent">About</a>
                <a href="/" className="hover:text-accent">Features</a>
                <a href="/upload" className="hover:text-accent">Upload</a>
            </div>

            <div className="w-8 h-8">
                <ToggleTheme />
            </div>
        </nav>
    )
}