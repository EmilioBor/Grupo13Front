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