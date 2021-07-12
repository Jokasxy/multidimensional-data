import axios, { AxiosResponse } from 'axios';
import { QueryTypes } from '../consts/consts';

export const queryApiData = async (url: string, method: QueryTypes, params: string): Promise<any> => {
	try {
        let data: AxiosResponse<any>;
        if (params.length > 0) {
            data = await axios({
                method,
                url,
                ...JSON.parse(params),
            });
        } else {
            data = await axios({
                method,
                url,
            });
        }
		return data.data;
	} catch (error) {
		throw error;
	}
};
