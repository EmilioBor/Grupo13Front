"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CargarEquipo() {
  const [formData, setFormData] = useState({
    nombre: "",
    idPais: "",
    idPersona: "",
  });
  const [paises, setPaises] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nombrePais = await getPais();
        const nombreDirector = await getDirector();
        setPaises(nombrePais);
        setDirectores(nombreDirector);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("No se pudieron cargar los datos");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      {/* Link para volver al inicio */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-xl text-blue-500 hover:underline"
      >
        Volver al Inicio
      </Link>

      {/* Formulario */}
      <form
        // onSubmit={handleSubmit}
        className="bg-gray-100 p-12 rounded-xl shadow-2xl max-w-5xl w-full space-y-10"
      >
        <h1 className="text-4xl font-bold text-center text-black">Cargar Equipo</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Campo de texto para nombre del equipo */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-lg font-medium mb-3 text-black"
            >
              Equipo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre del equipo"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full p-4 border text-black rounded-lg shadow-sm bg-white outline-none"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-6">
          <Link href="/VistaEquipo">
            <button
              type="button"
              className="px-8 py-4 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300"
            >
              Cancelar
            </button>
          </Link>
          <button
            type="submit"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Aceptar"}
          </button>
        </div>
      </form>
    </div>
  );
}
