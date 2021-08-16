import { queryCache } from "react-query";
import { Authentication } from "@domain/user/interfaces/Authentication";
import userApi from "../api/userApi";
import { User } from "../interfaces/User";

const useAuthentication = () => {
  const login = async ({ email, password }: User): Promise<Authentication | void> => {
    try {
      const authentication = await userApi.authenticate(email, password);

      if (authentication) {
        localStorage.setItem("authentication", JSON.stringify(authentication));
      }

      return authentication;
    } catch (err) {
      alert("Unexpected Error");
    }
  };

  const signUp = async ({ name, email, password }: User): Promise<void> => {
    if (!name) {
      return;
    }
    
    return userApi.create(name, email, password);
  };

  const logout = () => {
    localStorage.removeItem("authentication");
    queryCache.clear();
  };

  const getAccessToken = () => {
    try {
      const authentication = localStorage.getItem("authentication");

      if (authentication) {
        return JSON.parse(authentication).accessToken;
      }
    } catch {
      return null;
    }
  };

  return {
    login,
    logout,
    signUp,
    getAccessToken,
  };
};

export default useAuthentication;
