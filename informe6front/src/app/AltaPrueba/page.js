"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getsEquipo } from "@/actions/equipo";
import { getContratoEquipo } from "@/actions/contraro";
import { getCiclistas } from "@/actions/persona";

export default function VistaEquipos() {
  const [equipo, setEquipo] = useState({
    nombre: "",
    nombrePais: "",
    nombrePersona: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(""); // Estado para capturar el nombre del equipo
  const [equiposList, setEquiposList] = useState([]); // Estado para almacenar la lista de equipos
  const [listContratos, setListContratos] = useState([]); // Estado para almacenar los contratos
  const [ciclistas, setCiclistas] = useState([]); // Estado para almacenar los ciclistas
  const [nuevoCiclista, setNuevoCiclista] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [searchCiclistaQuery, setSearchCiclistaQuery] = useState(""); // Estado para capturar la búsqueda de ciclistas
  const [filteredCiclistas, setFilteredCiclistas] = useState([]); // Ciclistas filtrados

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchCiclistaQuery(value);

    if (value.trim() !== "") {
      const filtered = ciclistas.filter((ciclista) =>
        `${ciclista.nombre} ${ciclista.apellido}`.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCiclistas(filtered);
    } else {
      setFilteredCiclistas(ciclistas);
    }
  };

  // Obtener los ciclistas
  useEffect(() => {
    const fetchCiclistas = async () => {
      try {
        const res = await getCiclistas();
        setCiclistas(res);
        setFilteredCiclistas(res);
      } catch (error) {
        console.error("Error al obtener los ciclistas:", error);
        setError("No se pudieron cargar los ciclistas");
      }
    };
    fetchCiclistas();
  }, []);

  // Obtener los contratos cuando se selecciona un equipo
  const handleEquipoSelect = (selectedEquipo) => {
    setEquipo({
      nombre: selectedEquipo.nombre,
      nombrePais: selectedEquipo.nombrePais,
      nombrePersona: selectedEquipo.nombrePersona,
    });
    setNombre(selectedEquipo.nombre); // Rellenar el campo de búsqueda con el nombre seleccionado
    setEquiposList([]); // Limpiar la lista de opciones al seleccionar

    // Obtener los contratos para el equipo seleccionado
    const fetchContratos = async () => {
      try {
        const contratos = await getContratoEquipo(); // Reemplaza esto con tu función que trae los contratos
        setListContratos(contratos); // Actualiza los contratos
      } catch (error) {
        console.error("Error al obtener los contratos:", error);
        setError("No se pudieron cargar los contratos");
      }
    };
    fetchContratos();
  };

  // Manejo de la selección del ciclista
  const handleSelectCiclista = (id, nombreCompleto) => {
    setNuevoCiclista({ ...nuevoCiclista, nombre: nombreCompleto });
    setSearchCiclistaQuery(""); // Limpiar el campo de búsqueda después de seleccionar
    setFilteredCiclistas(ciclistas); // Restaurar la lista completa de ciclistas
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      <Link href="/" className="absolute top-4 left-4 text-xl text-blue-500 hover:underline">
        Volver al Inicio
      </Link>  
      <div className="bg-gray-100 p-12 rounded-xl shadow-2xl w-full max-w-6xl space-y-10">
        <h1 className="text-3xl font-bold text-black">Alta Prueba</h1>

        {/* Formulario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Año Edición */}
          <div className="col-span-1 sm:col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Año Edición</label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* Nombre */}
          <div className="col-span-1 sm:col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Nombre</label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* Kilómetros Totales */}
          <div className="col-span-1 sm:col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Kilómetros Totales</label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* Cantidad Etapas */}
          <div className="col-span-1 sm:col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Cantidad Etapas</label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          <div>
          <label className="block text-lg font-medium mb-3 text-black" htmlFor="director">
            Ciclista Primero
          </label>
          <div className="flex items-center border rounded-lg shadow-sm bg-white">
            <select
              id="idPersona"
              name="idPersona"
              value={ciclistas.nombre}
              
              className="flex-1 px-4 py-3 outline-none text-black"
            >
              <option value="idPersona">Buscar Ciclista</option>
              {ciclistas.map((dir) => (
                <option key={dir.id} value={dir.id}>
                  {dir.nombre} {dir.apellido}
                </option>
              ))}
            </select>
          </div>
        </div>


          {/* Botón Agregar Ciclista */}
          <div className="flex justify-end p-8">
            <Link
              href={"/Persona"}
              className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-green-600 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
              Agregar Equipo
            </Link>
          </div>
        </div>

          {/* Tabla de Contratos */}
          <div className="overflow-x-auto">
          <table className="w-full border-collapse border  border-gray-300 text-black">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-4 text-left font-semibold">Número</th>
                  <th className="border border-gray-300 p-4 text-left font-semibold">Equipo</th>
                  <th className="border border-gray-300 p-4 text-left font-semibold">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {listContratos.length > 0 ? (
                  listContratos.map((contrato, index) => (
                    <tr key={index} className="bg-white">
                      <td className="border border-gray-300 p-4">{contrato.numero}</td>
                      <td className="border border-gray-300 p-4">{contrato.equipo}</td>
                      <td className="border border-gray-300 p-4 text-center">
                        <button className="text-red-500">Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-gray-300 p-4 text-center">No hay equipos cargados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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
      </div>
    </div>
  );
}
