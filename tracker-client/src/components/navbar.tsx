import { ModeToggle } from "./mode-toggle";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import NavbarUserActions from "./navbar-user-actions";
import { useUserStore } from "@/store/user";
function Navbar() {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return (
    <div className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border flex justify-between items-center px-4 py-2">
      <div className="text-xl">
        <a href={isLoggedIn ? "/dashboard" : "/"}>Tracker</a>
      </div>
      <div className="flex gap-4 items-center">
        {isLoggedIn && <NavbarUserActions />}
        {!isLoggedIn && (
          <Button
            variant="ghost"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            <User /> Sign In
          </Button>
        )}

        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
