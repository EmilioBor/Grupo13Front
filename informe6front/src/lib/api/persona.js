'use server';
import axios from 'axios';

export async function getListaDirectores() {
    try {
        const response = await axios.get('https://localhost:7087/api/v1/buscardirector', {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Erro al devolver la lista de Directores');
        throw error;
    }
}

export async function getListaCiclista() {
    try {
        const response = await axios.get('https://localhost:7087/api/v1/buscarciclista', {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Erro al devolver la lista de Directores');
        throw error;
    }
}