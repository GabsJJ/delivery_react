import { createContext } from "react";
import type { AuthContextProps } from "./AuthProvider.tsx"; // ou definir o tipo aqui

export const AuthContext = createContext({} as AuthContextProps);
