import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Full width background image container */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/lovable-uploads/35364432-c9b2-4ef3-9d9b-36188130ed12.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(208, 235, 255, 0.1)",
            backgroundBlendMode: "overlay"
          }}
        />
      </div>

      {/* Login Container */}
      <div className="relative w-full h-full flex items-center justify-center md:justify-end p-4 md:p-8">
        <div 
          className="w-full max-w-md py-6 px-4 md:px-8 mx-4 md:mr-12 rounded-3xl"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(230,243,255,0.15) 100%)",
            backdropFilter: "blur(10px)"
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Index;