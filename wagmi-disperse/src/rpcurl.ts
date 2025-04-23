import { bsc } from "wagmi/chains";

const rpcUrls: Record<number, string> = {
  [bsc.id]: "https://1rpc.io/bnb",
};

export default rpcUrls;

// Store and retrieve user-specified RPCs from localStorage
export const USER_RPC_STORAGE_KEY = "user_rpc_urls";

export const getUserRpcUrl = (chainId: number): string | undefined => {
  try {
    const stored = localStorage.getItem(USER_RPC_STORAGE_KEY);
    if (stored) {
      const userRpcs = JSON.parse(stored) as Record<string, string>;
      return userRpcs[chainId.toString()];
    }
  } catch (e) {
    console.error("Error retrieving user RPC:", e);
  }
  return undefined;
};

export const saveUserRpcUrl = (chainId: number, url: string): void => {
  try {
    const stored = localStorage.getItem(USER_RPC_STORAGE_KEY) || "{}";
    const userRpcs = JSON.parse(stored) as Record<string, string>;
    userRpcs[chainId.toString()] = url;
    localStorage.setItem(USER_RPC_STORAGE_KEY, JSON.stringify(userRpcs));
  } catch (e) {
    console.error("Error saving user RPC:", e);
  }
};

export const removeUserRpcUrl = (chainId: number): void => {
  try {
    const stored = localStorage.getItem(USER_RPC_STORAGE_KEY);
    if (stored) {
      const userRpcs = JSON.parse(stored) as Record<string, string>;
      delete userRpcs[chainId.toString()];
      localStorage.setItem(USER_RPC_STORAGE_KEY, JSON.stringify(userRpcs));
    }
  } catch (e) {
    console.error("Error removing user RPC:", e);
  }
};

// Get the most appropriate RPC URL following the priority:
// 1. User input RPC > 2. Predefined RPC > 3. Default (empty)
export const getBestRpcUrl = (chainId: number): string | undefined => {
  // First check for user-specified RPC
  const userRpc = getUserRpcUrl(chainId);
  if (userRpc) {
    return userRpc;
  }

  // Then check for predefined RPC
  const predefinedRpc = rpcUrls[chainId];
  if (predefinedRpc) {
    return predefinedRpc;
  }

  // Return undefined to use default behavior
  return undefined;
};
