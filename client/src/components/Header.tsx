import { linklyLogo } from "@/assets";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";

const Header = () => {

    const navigate = useNavigate();

    return (
        <nav className="px-4 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="flex items-center justify-between py-4">
                <Link to="/" className="flex items-center space-x-2">
                    <img src={linklyLogo} alt="Linkly Logo" className="h-6 w-auto" />
                    <span className="text-xl font-bold tracking-tighter">Linkly</span>
                </Link>

                <div>
                    <Button onClick={() => navigate("/auth")}>Login</Button>                    
                </div>
            </div>
        </nav>
    );
};


// <header>
//      <div class="container mx-auto px-4 lg:px-28 h-16 flex items-center justify-between">
//      <a class="flex items-center space-x-2" href="/" data-discover="true">
//          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mountain h-5 w-5">
//              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
//          </svg>
//          <span class="text-xl font-bold tracking-tighter">zipp2</span>
//      </a>
//          <nav class="flex items-center space-x-6">
//              <a class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3" href="/login" data-discover="true">
//          Log in / Sign up
//      </a>
//          </nav>
//      </div>
// </header>


export default Header;