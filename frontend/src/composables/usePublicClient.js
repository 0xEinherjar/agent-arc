import { createPublicClient, http } from "viem";
import { arcTestnet } from "viem/chains";

export const usePublicClient = () => {
  const client = createPublicClient({
    chain: arcTestnet,
    transport: http(import.meta.env.VITE_BASE_RPC),
  });

  return { client };
};
