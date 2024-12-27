import { useAuth } from "@/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

interface DecodedToken {
  id: string;
}

interface UserData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
}

function Dashboard() {
  const { token, isLoggedIn } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const res = await axios("http://localhost:5000/api/user", {
          headers: {
            "x-auth-token": token
          }, 
          params: {
            id: decodedToken.id
          }
        })
        setUserData(res.data);
        setError(null);
      } catch(error) {
        console.error("Error fetching user data: ", error);
        setError("Failed to load user data");
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [token]);
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading... Please wait...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <p className="text-destructive font-semibold">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome {userData?.lastName}, {userData?.firstName}!</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoggedIn ? (
            <div className="space-y-4">
              <p>You are successfully logged in.</p>
              {userData && (
                <div className="space-y-2">
                  <p>Email: {userData.email}</p>
                  {/* Display other user data as needed */}
                </div>
              )}
            </div>
          ) : (
            <p>Please log in to view dashboard content.</p>
          )}
        </CardContent>
      </Card>

      {/* Rest of your dashboard content */}
    </div>
  );
}

export default Dashboard;