"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
// Define the context type
interface AuthContextType {
  user: { email: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === "demouser" && password === "demopass") {
      router.push("./LessonForm");
      const userData = { email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      alert("Invalid credentials! Use demouser/demopass.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
