export interface User {
  email: string;
  id: string;
}

export function createUser(initial: Partial<User> = {}): User {
  return {
    email: initial.email ?? "",
    id: initial.id ?? "",
  };
}
