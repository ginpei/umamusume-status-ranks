import { useEffect, useState } from "react";
import { Auth } from "../gp-firebase/firebase";
import { createUser, User } from "./User";

/**
 * Returns `null` if it's not loaded.
 * Returns an `User` with empty `id` if user does not log in.
 */
export function useFirebaseCurrentUser(auth: Auth): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((fbUser) => {
      const newUser = createUser({
        email: fbUser?.email ?? "",
        id: fbUser?.uid ?? "",
      });

      setUser(newUser);
    });
  }, []);

  return user;
}
