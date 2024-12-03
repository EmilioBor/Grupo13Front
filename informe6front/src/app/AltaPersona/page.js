'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPais } from "@/actions/pais";
import { agregarPersona } from "@/actions/persona";

export default function VistaEquipos() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    idPais: "",
    rol: true,
  });

  const [paises, setPaises] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  

  useEffect(() => {

    const fetchData = async () => {
      try {
        const nombrePais = await getPais();
        setPaises(nombrePais);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("No se pudieron cargar los datos");
      }
    };
    fetchData();
  }, []);  // This ensures useEffect runs only on client-side

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleApiSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: parseInt(formData.dni, 10),
        fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
        idPais: parseInt(formData.idPais, 10),
        rol: formData.rol
      };

      console.log("Enviando datos:", payload);

      const response = await agregarPersona(payload);

      console.log("Datos enviados con éxito:", response);
      alert("Persona registrada con éxito.");

      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        idPais: "",
        rol: true,
      });
      
      
    } catch (err) {
      console.error("Error al enviar los datos:", err);
      alert(`Ocurrió un error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirm = window.confirm("¿Estás seguro de que deseas registrar esta persona?");
    if (confirm) {
      handleApiSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      <Link href="/" className="absolute top-4 left-4 text-xl text-blue-500 hover:underline">
        Volver al Inicio
      </Link>
      
      <div className="bg-gray-100 p-12 rounded-xl shadow-2xl w-full max-w-6xl space-y-10">
        <h1 className="text-3xl font-bold text-black">Alta Persona</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* Apellido */}
          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* DNI */}
          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">DNI</label>
            <input
              type="number"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* País */}
          <div className="col-span-1">
            <label className="block text-lg font-medium mb-3 text-black" htmlFor="idPais">
              País
            </label>
            <select
              id="idPais"
              name="idPais"
              value={formData.idPais}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {/* Botón */}
          <div className="col-span-2 flex justify-end pt-8">
            <button
              type="submit"
              className={`bg-green-600 px-6 py-2 text-white font-semibold rounded-md shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Guardar Datos"}
            </button>
          </div>


        </form>
          <div className="flex justify-end space-x-6">
          <Link href={"/VistaEquipo"}>
            <button
              type="button"
              className="px-8 py-4 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300"
            >
              Cancelar
            </button>
          </Link>
          <Link href={"/Contrato"}>
          <button
            type="submit"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            disabled={loading}
            >
            Aceptar
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}
