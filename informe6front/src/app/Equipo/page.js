"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getPais } from "@/actions/pais"; // Asegúrate de tener esta función en el archivo correcto

export default function EquipoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    pais: "",  // Aquí se almacenará el id del país
    director: "",
  });
  const [paises, setPaises] = useState([]); // Para almacenar la lista de países
  const [error, setError] = useState(""); // Para manejar errores

  // Función para obtener países
  useEffect(() => {
    const fetchPais = async () => {
      try {
        const nombrePais = await getPais(); // Llama a la API que devuelve la lista de países
        setPaises(nombrePais); // Asigna los países al estado
      } catch (error) {
        console.error('Error al obtener los países', error);
        setError('No se pudieron cargar los países');
      }
    };
    fetchPais();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del equipo:", formData);
    // Aquí puedes enviar los datos al servidor o realizar alguna acción
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      {/* Botón Volver al Home */}
      <Link href="/" className="absolute top-4 left-4 text-xl text-blue-500 hover:underline">
        Volver al Inicio
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-12 rounded-xl shadow-2xl max-w-5xl w-full space-y-10"
      >
        {/* Título */}
        <h1 className="text-4xl font-bold text-center text-black">
          Alta de Equipo
        </h1>

        {/* Nombre y País */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label
              className="block text-lg font-medium mb-3 text-black"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre del equipo"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white outline-none"
            />
          </div>

          <div>
            <label
              className="block text-lg font-medium mb-3 text-black"
              htmlFor="pais"
            >
              País
            </label>
            <select
              id="pais"
              name="pais"
              value={formData.pais} // El valor seleccionado debe ser el id del país
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none" // Asegura que el texto se muestre en negro
            >
              <option value="">Selecciona un país</option>
              {paises.length > 0 ? (
                paises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))
              ) : (
                <option disabled>Cargando países...</option>
              )}
            </select>
          </div>
        </div>

        {/* Director */}
        <div>
          <label
            className="block text-lg font-medium mb-3 text-black"
            htmlFor="director"
          >
            Director
          </label>
          <div className="flex items-center border rounded-lg shadow-sm bg-white">
            <input
              type="text"
              id="director"
              name="director"
              placeholder="Buscar director"
              value={formData.director}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 outline-none text-black"
            />
            <button
              type="button"
              className="px-4 py-3 bg-gray-200 rounded-r-lg hover:bg-gray-300"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}

        {/* Botones */}
        <div className="flex justify-end space-x-6">
          <Link href={"/"}>
            <button
              type="button"
              className="px-8 py-4 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300"
              onClick={() => alert("Cancelar")}
            >
              Cancelar
            </button>
          </Link>
          <button
            type="submit"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Aceptar
          </button>
        </div>
      </form>

      {/* Mostrar los datos del formulario */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Datos Ingresados:</h2>
        <div className="mt-4">
          <p><strong>Nombre:</strong> {formData.nombre}</p>
          <p><strong>País:</strong> {formData.pais}</p>
          <p><strong>Director:</strong> {formData.director}</p>
        </div>
      </div>
    </div>
  );
}
