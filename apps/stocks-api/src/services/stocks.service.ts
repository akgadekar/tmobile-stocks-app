import { SERVER_CONSTANT } from '../constants/server.constant';
import { environment } from '../environments/environment';

const axios = require('axios');

export const getStocksData = async (server, request) => {

    const { symbol, time_period } = request.params;

    const stocksCache = server.cache({
        cache: SERVER_CONSTANT.CACHE_NAME,
        expiresIn: 10 * 1000,
        generateFunc: async () => {
            try {
                const stocksApiUrl = `${environment.apiURL}/${symbol}/${SERVER_CONSTANT.API_CHART}/${time_period}?${SERVER_CONSTANT.API_TOKEN}=${environment.apiKey}`;
                const data = await axios.get(stocksApiUrl);             
                return data['data'];
            } catch (err) {   
                console.log('Exception::', err);          
                return err;
            }

        },
        generateTimeout: 2000
    }); 

    return await stocksCache.get(`${SERVER_CONSTANT.CACHE_KEY}_${symbol}_${time_period}`);
}

