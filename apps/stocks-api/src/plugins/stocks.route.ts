import { SERVER_CONSTANT } from '../constants/server.constant';
import { getStocksData } from '../services/stocks.service';

// stocks route plugin
export const StockRoutePlugin = {
    name: SERVER_CONSTANT.PLUGINS.STOCK_ROUTES,
    version: SERVER_CONSTANT.PLUGINS.VERSION_V1,
    register: async (server, options) => {
        server.route([{
            path: SERVER_CONSTANT.API_V1.getStocks,
            method: SERVER_CONSTANT.API_METHODS.GET,
            handler: async function (request, h) {
                const response = await getStocksData(server, request);
                return h.response(response);
            }
        }]);
    }
};

