'use service';
import axios from 'axios';

export async function postsPruebaEquipo(data) {
  try {
    const response = await axios.post('https://localhost:7087/api/PruebaEquipo/api/v1/createpruebaEquipo', data, {
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