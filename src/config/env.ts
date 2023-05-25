export const APP_ENV = {
  ETHEREUM_PROVIDER: String(
    process.env.ETHEREUM_PROVIDER || 'https://rpc.ankr.com/eth'
  ),
  POLYGON_PROVIDER: String(
    process.env.POLYGON_PROVIDER || 'https://rpc.ankr.com/polygon'
  ),
  MAINNET_CHAIN_ID: Number(process.env.MAINNET_CHAIN_ID || 1),
  POLYGON_CHAIN_ID: Number(process.env.POLYGON_CHAIN_ID || 137),
  METAMASK_URL: String(process.env.METAMASK_URL || 'https://metamask.io/'),
  CONNECTOR_TYPE_STORAGE: String(
    process.env.CONNECTOR_TYPE_STORAGE || 'CONNECTOR_TYPE'
  ),
}
