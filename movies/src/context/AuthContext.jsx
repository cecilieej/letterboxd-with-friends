import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function loginWithGoogle() {
    return signInWithPopup(auth, provider);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (curr) => {
      setUser(curr);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
