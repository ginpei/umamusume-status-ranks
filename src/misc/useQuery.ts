import { useLocation } from "react-router";

/**
 * https://reactrouter.com/web/example/query-parameters
 */
export function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}
