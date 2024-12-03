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

export async function postsPersona(data) {
    try {
      const response = await axios.post('https://localhost:7087/api/v1/createpersona', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error al enviar datos a la API:', error.response || error.message);
      console.error('Detalles del error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        
      throw error; // Propaga el error para manejarlo en el componente
    }
  }
  