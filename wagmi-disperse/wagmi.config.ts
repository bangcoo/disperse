import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { mainnet } from "wagmi/chains";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    etherscan({
      // @ts-ignore
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: [
        {
          name: "Disperse",
          address: {
            [mainnet.id]: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2",
          },
        },
        {
          name: "CreateX",
          address: {
            [mainnet.id]: "0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed",
          },
        },
      ],
    }),
    react(),
  ],
});
