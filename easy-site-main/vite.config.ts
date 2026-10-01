import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          start: path.resolve(__dirname, 'start.html'),
          markets: path.resolve(__dirname, 'markets.html'),
          forex: path.resolve(__dirname, 'forex.html'),
          commodities: path.resolve(__dirname, 'commodities.html'),
          stocks: path.resolve(__dirname, 'stocks.html'),
          bonds: path.resolve(__dirname, 'bonds.html'),
          futures: path.resolve(__dirname, 'futures.html'),
          options: path.resolve(__dirname, 'options.html'),
          crypto: path.resolve(__dirname, 'crypto.html'),
          articles: path.resolve(__dirname, 'articles.html'),
          art_trade: path.resolve(__dirname, 'articles/what-is-trade.html'),
          art_money: path.resolve(__dirname, 'articles/what-is-money.html'),
          art_market: path.resolve(__dirname, 'articles/what-is-a-market.html'),
          art_price: path.resolve(__dirname, 'articles/how-price-is-formed.html'),
          art_participants: path.resolve(__dirname, 'articles/market-participants.html'),
          art_liquidity: path.resolve(__dirname, 'articles/liquidity.html'),
          art_volatility: path.resolve(__dirname, 'articles/volatility.html'),
          art_risk: path.resolve(__dirname, 'articles/risk.html'),
          art_assets: path.resolve(__dirname, 'articles/financial-assets.html'),
          art_exchanges: path.resolve(__dirname, 'articles/exchanges.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

