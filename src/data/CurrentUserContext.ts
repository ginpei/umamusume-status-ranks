import { createContext, useContext } from "react";
import { createUser, User } from "./User";

const CurrentUserContext = createContext(createUser());

export const CurrentUserProvider = CurrentUserContext.Provider;

export function useCurrentUser(): User {
  return useContext(CurrentUserContext);
}

export function useLoggedIn(): boolean {
  const user = useCurrentUser();
  return user.id !== "";
}
