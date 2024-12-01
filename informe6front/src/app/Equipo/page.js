"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getPais } from "@/actions/pais";
import { getDirector } from "@/actions/persona";
import { postEquipo } from "@/actions/equipo";

export default function EquipoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    idPais: "",
    idPersona: "",
  });
  const [paises, setPaises] = useState([]);
  const [directores, setDirector] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nombrePais = await getPais();
        const nombreDirector = await getDirector();
        setPaises(nombrePais);
        setDirector(nombreDirector);
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

  const handleApiSubmit = async () => {
    try {
      console.log("Enviando datos:", formData);
      setLoading(true);

      
      const response = await postEquipo(formData);

      console.log("Datos enviados con éxito:", response);
      alert("Equipo registrado con éxito");
    } catch (err) {
      console.error("Error al enviar los datos:", err);
      alert(`Ocurrió un error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirm = window.confirm("¿Estás seguro de que deseas registrar este equipo?");
    if (confirm) {
      handleApiSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      <Link href="/" className="absolute top-4 left-4 text-xl text-blue-500 hover:underline">
        Volver al Inicio
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-12 rounded-xl shadow-2xl max-w-5xl w-full space-y-10"
      >
        <h1 className="text-4xl font-bold text-center text-black">Alta de Equipo</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label className="block text-lg font-medium mb-3 text-black" htmlFor="nombre">
              Nombre
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

          <div>
            <label className="block text-lg font-medium mb-3 text-black" htmlFor="pais">
              País
            </label>
            <select
              id="idPais"
              name="idPais"
              value={formData.idPais}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            >
              <option value="idPais">Selecciona un país</option>
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

        <div>
          <label className="block text-lg font-medium mb-3 text-black" htmlFor="director">
            Director
          </label>
          <div className="flex items-center border rounded-lg shadow-sm bg-white">
            <select
              id="idPersona"
              name="idPersona"
              value={formData.idPersona}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 outline-none text-black"
            >
              <option value="idPersona">Buscar director</option>
              {directores.map((dir) => (
                <option key={dir.id} value={dir.id}>
                  {dir.nombre} {dir.apellido}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="flex justify-end space-x-6">
          <Link href={"/"}>
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
