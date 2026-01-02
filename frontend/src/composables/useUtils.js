export const useUtils = () => {
  const truncateAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };
  return {
    truncateAddress,
  };
};