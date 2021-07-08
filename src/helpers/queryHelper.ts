import axios from 'axios';

export const queryApiData = async (url: string): Promise<any> => {
    try {
        const data = await axios.get(url);

        return data.data;
    } catch (error) {
        throw error;
    }
    
}
