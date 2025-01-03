import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { users } from "@/data/users";
import { loginUser } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (rememberedUser) {
      setUser(JSON.parse(rememberedUser));
    }
  }, []);

  const login = async (identifier: string, password: string, remember: boolean) => {
    try {
      const response = await loginUser({
        grant_type: 'password',
        username: identifier,
        password: password,
      });

      if (response.access_token) {
        const user = users.find(u => 
          u.email.toLowerCase() === identifier.toLowerCase() || 
          u.username?.toLowerCase() === identifier.toLowerCase()
        );
        
        if (user) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('access_token', response.access_token);
          
          if (remember) {
            localStorage.setItem('rememberedUser', JSON.stringify(user));
          } else {
            localStorage.removeItem('rememberedUser');
          }
          return true;
        }
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    // Don't remove rememberedUser on logout if it exists
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};