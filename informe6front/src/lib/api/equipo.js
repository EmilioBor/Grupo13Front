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

export async function buscarequipo(nombre) {
    try {
        const response = await axios.get(`https://localhost:7087/api/Equipo/api/v1/buscarequiponombre/${nombre}`, {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
export async function listaEquipo() {
    try {
        const response = await axios.get(`https://localhost:7087/api/Equipo/api/v1/listarEquipo`, {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}