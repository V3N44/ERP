import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, ArrowRight, MessageCircle } from "lucide-react";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

export const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(identifier, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: (
            <div className="flex items-center gap-2">
              Welcome back! Use our AI assistant <MessageCircle className="h-4 w-4" /> <ArrowRight className="h-4 w-4" />
            </div>
          ),
          duration: 6000,
          className: "left-0 top-4 fixed", // This positions the toast on the left side
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse: unknown) => {
    console.log('Google login success:', credentialResponse);
    toast({
      title: "Google login successful",
      description: "Welcome back!",
    });
    navigate("/dashboard");
  };

  const handleGoogleError = () => {
    toast({
      variant: "destructive",
      title: "Google login failed",
      description: "Please try again",
    });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-[#1A1F2C]">Login</h1>
          <p className="text-[#403E43]">Enter your credentials to access your account.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="identifier" className="text-sm font-medium text-[#403E43]">
              Email or Username
            </label>
            <Input
              id="identifier"
              type="text"
              placeholder="Enter your email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              disabled={isLoading}
              className="border-2 border-[#F1F1F1] rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#403E43]">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="border-2 border-[#F1F1F1] rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end">
              <ForgotPasswordDialog />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="remember" 
              className="rounded border-[#C8C8C9]"
              disabled={isLoading}
            />
            <label htmlFor="remember" className="text-sm text-[#403E43]">Remember me</label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-[#9F9EA1]">
              Or
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full border-2 border-[#F1F1F1] hover:bg-[#F6F6F7] text-[#403E43]"
          onClick={() => navigate("/guest")}
          disabled={isLoading}
        >
          Continue as Guest
        </Button>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};