export const APP_ENV = {
  ETHEREUM_PROVIDER: String(
    process.env.ETHEREUM_PROVIDER || 'https://rpc.ankr.com/eth'
  ),
  POLYGON_PROVIDER: String(
    process.env.POLYGON_PROVIDER || 'https://rpc.ankr.com/polygon'
  ),
}
