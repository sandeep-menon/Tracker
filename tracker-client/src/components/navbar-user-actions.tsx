import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuth } from "@/AuthContext";

function NavbarUserActions() {
  const { logout, userData } = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="hover:cursor-pointer">
            <AvatarFallback>{userData?.firstName[0]?.toUpperCase()}{userData?.lastName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="hover:cursor-pointer">
            My profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default NavbarUserActions;
