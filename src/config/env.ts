export const APP_ENV = {
  IS_PROD: process.env.VITE_IS_PROD || false,
  ETHEREUM_PROVIDER: String(
    process.env.VITE_ETHEREUM_PROVIDER || 'https://rpc.ankr.com/eth'
  ),
  POLYGON_PROVIDER: String(
    process.env.VITE_POLYGON_PROVIDER || 'https://rpc.ankr.com/polygon'
  ),
  MAINNET_CHAIN_ID: Number(process.env.VITE_MAINNET_CHAIN_ID || 1),
  POLYGON_CHAIN_ID: Number(process.env.VITE_POLYGON_CHAIN_ID || 137),
  CONNECTOR_TYPE_STORAGE: String(
    process.env.VITE_CONNECTOR_TYPE_STORAGE || 'CONNECTOR_TYPE'
  ),
  SCROLL_POSITION_STORAGE: String(
    process.env.VITE_SCROLL_POSITION_STORAGE || 'SCROLL_POSITION'
  ),
  PAGE_LOAD_CHECK_STORAGE: String(
    process.env.VITE_PAGE_LOAD_CHECK_STORAGE || 'PAGE_LOAD_CHECK'
  ),
}
