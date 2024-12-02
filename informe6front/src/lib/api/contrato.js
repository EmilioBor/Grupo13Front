"use server";
import axios from "axios";
export async function contratoCiclista(nombre) {
    try {
        const response = await axios.get(`https://localhost:7087/api/Contrato/api/v1/buscarcontrato/${nombre}`, {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function agregarContrato(data) {
    try {
        const response = await axios.post('https://localhost:7087/api/Contrato/api/v1/createcontrato',data, {
              
        }, {
            httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
        });
        return await response.data;
    } catch (error) {
        console.error('Error fetching pedido:', error);
        throw error;
    }
}