import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, ArrowRight } from "lucide-react";

export const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google login success:', credentialResponse);
    try {
      if (credentialResponse.credential) {
        toast({
          title: "Google login successful",
          description: (
            <div className="flex items-center gap-2">
              Welcome! Use our AI assistant <MessageCircle className="h-4 w-4" /> <ArrowRight className="h-4 w-4" />
            </div>
          ),
          duration: 6000,
          className: "left-0 bottom-4 fixed max-w-[20%]",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "There was an error logging in with Google",
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      variant: "destructive",
      title: "Google login failed",
      description: "Please try again or use email login",
    });
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
      useOneTap
      theme="outline"
      size="large"
      text="signin_with"
      shape="rectangular"
    />
  );
};