interface APIError {
  type: string;
  message: string;
}
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function SignInSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const api = import.meta.env.VITE_API_BASE_URL;

  const login = async () => {
    try {

      const res = await axios.post(`${api}/api/login`, {
        email,
        password,
      });
      setToken(res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof AxiosError) {
        const apiError = err.response?.data as APIError;
        if (apiError?.type == "error") {
          const errorMessage = apiError?.message;
          toast({
            title: "Uh oh! Something went wrong.",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          const errorMessage = "Unexpected error! Please try again later.";
          toast({
            title: "Uh oh! Something went wrong.",
            description: errorMessage,
            variant: "destructive",
          });
        }
      } else {
        const errorMessage = "Unexpected error! Please try again later.";
        toast({
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  const register = async () => {
    if (password !== retypePassword) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Passwords do not match!",
        variant: "destructive"
      });
      return;
    }
    try {
      const res = await axios.post(`${api}/api/register`, {
        name,
        firstName,
        lastName,
        email,
        password
      });
      // navigate("/login", { replace: true });
      if (res.data.type === "success") {
        toast({
          title: "Success!",
          description: "User created successfully. Please login.",
          variant: "info"
        });
      }

    } catch (err) {
      if (err instanceof AxiosError) {
        const apiError = err.response?.data as APIError;
        if (apiError?.type == "error") {
          const errorMessage = apiError?.message;
          toast({
            title: "Uh oh! Something went wrong.",
            description: errorMessage,
            variant: "destructive"
          });
        } else {
          const errorMessage = "Unexpected error! Please try again later.";
          toast({
            title: "Uh oh! Something went wrong.",
            description: errorMessage,
            variant: "destructive",
          });
        }
      } else {
        const errorMessage = "Unexpected error! Please try again later.";
        toast({
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Register as a user for Tracker. Click on Register button when
                finished.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="john.doe" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="john.doe@example.com" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="a strong password..."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordretype">Retype password</Label>
                <Input
                  id="passwordretype"
                  type="password"
                  placeholder="retype strong password..."
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={register}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>
                Enter your registered email and password to log in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john.doe@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="your secret password..."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={login}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

  );
}

export default SignInSignUp;
