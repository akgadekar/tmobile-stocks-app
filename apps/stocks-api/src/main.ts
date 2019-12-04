import { Server } from 'hapi';
import { StockRoutePlugin } from './plugins/stocks.route';
import { SERVER_CONSTANT } from './constants/server.constant';

(async () => {
  const server = new Server({
    port: SERVER_CONSTANT.DEFAULT_PORT,
    host: SERVER_CONSTANT.DEFAULT_HOST,
    cache: {
      name: SERVER_CONSTANT.CACHE_NAME,
      shared: true,
      provider: { constructor: require('@hapi/catbox-memory') }
    }
  });

  await server.register(StockRoutePlugin);

  await server.start();
  console.log('Server running on %s', server.info.uri);
})();

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
