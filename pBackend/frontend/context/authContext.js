import { createContext, useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  // const [auth, setAuth] = useState({ token: null, name: null, email: null });
  const [auth, setAuth] = useState({ token: null, name: "Rudra joshi", email: "rudrajoshi2481@gmail.com",bio:"this website is not conneccted to database right now" });
  useEffect(() => {
    if (hasCookie("userInfo")) {
        console.log(getCookie("userInfo"));
      setAuth(JSON.parse(getCookie("userInfo")));
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
        {console.log(auth,"LOL 01")}
      {props.children}
    </AuthContext.Provider>
  );
};
