import { http, createConfig } from "wagmi";
import * as chains from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import rpcUrls, { getBestRpcUrl } from "./rpcurl";

// Filter out non-object values from chains
const allChains = Object.values(chains).filter(
  (chain) => typeof chain === "object" && chain !== null && "id" in chain
);

// Create transports using our custom RPC URLs
export const transports = Object.fromEntries(
  allChains.map((chain) => {
    // Get the best RPC URL based on our priority:
    // 1. User input > 2. Predefined list > 3. Default
    const rpcUrl = getBestRpcUrl(chain.id);

    if (rpcUrl) {
      return [chain.id, http(rpcUrl)];
    }

    // Fallback to default HTTP transport
    return [chain.id, http()];
  })
);

// Create the wagmi config
export const config = createConfig({
  // @ts-ignore
  chains: allChains,
  connectors: [injected(), metaMask()],
  transports: transports,
});

// Update the wagmi config with new RPC URLs
export const updateRpcUrl = (chainId: number, url?: string) => {
  if (chainId && url) {
    // Update the transport for this chain
    transports[chainId] = http(url);
  } else if (chainId) {
    // Use default if URL is not provided
    const fallbackUrl = rpcUrls[chainId];
    transports[chainId] = fallbackUrl ? http(fallbackUrl) : http();
  }
};

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
