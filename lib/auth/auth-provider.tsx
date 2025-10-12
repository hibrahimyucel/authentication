"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";

//type auth = { id: string; roles: Array<string> };

type myContext = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const mc: myContext = { id: "", setId: () => "" };

const mycontex = createContext<myContext>(mc);

type AuthProviderProps = PropsWithChildren;

export default function MyProvider({ children }: AuthProviderProps) {
  const [id, setId] = useState<string>("");
  return (
    <mycontex.Provider value={{ id, setId }}>
      {id}
      {children}
    </mycontex.Provider>
  );
}

export const usemyContext = () => useContext(mycontex);
