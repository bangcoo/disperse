import { http, createConfig } from "wagmi";
import * as chains from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import rpcs from "./rpcurl";

const allChains = Object.values(chains).filter(
  (chain) => typeof chain === "object" && chain !== null && "id" in chain
);
export const transports = Object.fromEntries(
  allChains.map((chain) => {
    const rpcFlag = rpcs?.[chain.id];

    if (rpcFlag) {
      return [chain.id, http(rpcFlag)];
    }
    return [chain.id, http()];
  })
);

export const config = createConfig({
  // @ts-ignore
  chains: allChains,
  connectors: [injected(), metaMask()],
  transports: transports,
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
