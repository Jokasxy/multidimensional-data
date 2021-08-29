import axios, { AxiosResponse } from 'axios';
import { TipoviPoziva } from '../konstante/konstante';

export const dohvatiPodatke = async (url: string, tipPoziva: TipoviPoziva, paramteri: string): Promise<any> => {
	try {
        let podaci: AxiosResponse<any>;
        if (paramteri.length > 0) {
            podaci = await axios({
                method: tipPoziva,
                url,
                ...JSON.parse(paramteri),
            });
        } else {
            podaci = await axios({
                method: tipPoziva,
                url,
            });
        }
		return podaci.data;
	} catch (pogreska) {
		throw pogreska;
	}
};
