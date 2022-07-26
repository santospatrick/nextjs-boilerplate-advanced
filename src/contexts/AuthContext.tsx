import api from "@/services/api";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SigninValues) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type Props = {
  children: ReactNode;
};

type SigninValues = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  remember_me_token: null;
  name: string;
  created_at: string;
  updated_at: string;
  status: boolean;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextjs-boilerplate-advanced.token": token } = parseCookies();
    if (token) {
      api.get("me").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  async function signIn(values: SigninValues) {
    const { data } = await api.post("/login", values);

    const { token } = data;

    setCookie(undefined, "nextjs-boilerplate-advanced.token", token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data: user } = await api.get("me");

    setUser(user);

    Router.push("/");
  }

  function logout() {
    destroyCookie(null, "nextjs-boilerplate-advanced.token");
    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
