import { http, createConfig } from "@wagmi/vue";
import { metaMask, coinbaseWallet } from "@wagmi/vue/connectors";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";
import { arcTestnet } from "viem/chains";

const binanceWallet = getWagmiConnectorV2();

export const config = createConfig({
  chains: [arcTestnet],
  connectors: [metaMask(), binanceWallet(), coinbaseWallet()],
  transports: {
    [arcTestnet.id]: http(
      "https://rpc.testnet.arc.network"
    ),
  },
});