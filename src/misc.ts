import { isFirebaseError } from "./gp-firebase/firebase";

export function rootPath(): string {
  return "/";
}

export function getErrorMessage(error: unknown): string {
  if (isFirebaseError(error)) {
    return `${error.name}: ${error.message} (${error.code})`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error as any)?.message ?? "謎のエラーです。";
}
