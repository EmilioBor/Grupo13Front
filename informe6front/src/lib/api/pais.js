'use server';
import axios from 'axios';

export async function getListaPaises() {
    try {
        const response = await axios.get('https://localhost:7087/api/Pais/api/v1/listarPais', {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Erro al devolver la lista de Pais');
        throw error;
    }
}