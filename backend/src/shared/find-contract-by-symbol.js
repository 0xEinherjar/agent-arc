import { left, right } from "./either";
// Função para buscar contrato do token no CoinGecko
export async function findContractBySymbol(symbol, network) {
    // 1. Descobrir o ID do token no CoinGecko
    const coinsRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const coins = await coinsRes.json();

    const coin = coins.find(c => c.symbol.toLowerCase() === symbol.toLowerCase());
    if (!coin) return left("Token not found");

    // 2. Buscar os detalhes do token
    const detailRes = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
    const detail = await detailRes.json();

    // 3. Pegar o contrato na rede desejada
    const contract = detail.platforms[network];
    if (!contract) throw new Error(`Contract not found for ${symbol} on ${network}`);

    return right(contract);
}