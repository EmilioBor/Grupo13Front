import axios from 'axios';

export async function agregandoEquipo(data) {
    try {
        const response = await axios.post('https://localhost:7087/api/Equipo/api/v1/createequipo',data, {
              
        }, {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching pedido:', error);
        throw error;
    }
}