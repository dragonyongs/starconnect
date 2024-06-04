// useAuth.js
import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    console.log('useAuth-context', context);  // 디버깅용 로그
    useDebugValue(context.auth, auth => auth?.email ? "Logged In" : "Logged Out");
    return context;
}

export default useAuth;
