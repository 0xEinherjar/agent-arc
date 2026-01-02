import { formatUnits } from 'viem'
import { usePublicClient } from "./usePublicClient.js";
const { client } = usePublicClient();

export const useGetBalance = () => {
  async function getBalance(address) {
    const balance = await client.getBalance({ address });
    return formatUnits(balance, client.chain.nativeCurrency.decimals);
  }

  return { getBalance };
};
