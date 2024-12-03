"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getsEquipo } from "@/actions/equipo";
import { getContratoEquipo } from "@/actions/contraro";

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

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setNombre(value);

    if (value.trim() !== "") {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getsEquipo(); // Obtenemos la lista de equipos
          const filteredEquipos = res.filter((equipo) =>
            equipo.nombre.toLowerCase().includes(value.toLowerCase())
          );
          setEquiposList(filteredEquipos);
        } catch (error) {
          console.error("Error al obtener los equipos:", error);
          setError("No se pudieron cargar los equipos");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // Limpiar los datos si no hay texto en el campo de búsqueda
      setEquiposList([]); // Limpiar la lista de equipos
      setEquipo({
        nombre: "",
        nombrePais: "",
        nombrePersona: "",
      }); // Limpiar los datos del equipo seleccionado
      setCiclistas([]); // Limpiar la lista de ciclistas
      setListContratos([]); // Limpiar los contratos
    }
  };

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
        const contratos = await getContratoEquipo(selectedEquipo.nombre); // Reemplaza esto con tu función que trae los contratos
        setListContratos(contratos); // Actualiza los contratos
      } catch (error) {
        console.error("Error al obtener los contratos:", error);
        setError("No se pudieron cargar los contratos");
      }
    };
    fetchContratos();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCiclista({ ...nuevoCiclista, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      <Link href="/" className="absolute top-4 left-4 text-xl text-blue-500 hover:underline">
        Volver al Inicio
      </Link>  
      <div className="bg-gray-100 p-12 rounded-xl shadow-2xl w-full max-w-6xl space-y-10">
        <h1 className="text-3xl font-bold text-black">Vista Equipos</h1>

        {/* Formulario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Campo de búsqueda de equipo */}
          <div className="flex items-center space-x-4 relative">
            <input
              type="text"
              placeholder="🔍 Buscar equipo"
              className="flex-1 p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
              value={nombre} // Se enlaza al estado de nombre
              onChange={handleSearchChange} // Actualiza el nombre con cada cambio
            />
            {nombre.trim() !== "" && equiposList.length > 0 && ( // Solo mostrar la lista si hay algo en el campo de búsqueda
              <ul className="absolute top-full left-0 w-full bg-white shadow-xl text-black mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto z-10 transition-all duration-300 ease-in-out">
                {equiposList.map((equipo) => (
                  <li
                    key={equipo.id}
                    className="p-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ease-in-out rounded-lg"
                    onClick={() => handleEquipoSelect(equipo)}
                  >
                    {equipo.nombre}
                  </li>
                ))}
              </ul>
            )}
            <Link
              type="button"
              href={"/Equipo"}
              className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-600 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              Agregar Equipo
            </Link>
          </div>

          {/* País (debajo del campo de buscar equipo) */}
          <div className="col-span-2">
            <label className="block text-lg font-medium mb-2 text-black">País</label>
            <input
              type="text"
              value={equipo.nombrePais} // Completa con el nombre del país del equipo
              readOnly
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>

          {/* Director */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-lg font-medium mb-2 text-black">Director</label>
            <input
              type="text"
              value={equipo.nombrePersona} // Completa con el nombre del director del equipo
              readOnly
              className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
            />
          </div>
        </div>

        {/* Botón de agregar ciclista mejorado */}
        <div className="flex justify-end mb-4">
          <Link
            href={"/AltaPersona"}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-green-600 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
          >
            Agregar Ciclista
          </Link>
        </div>

        {/* Tabla de contratos */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4 text-left font-semibold">Ciclista</th>
                <th className="border border-gray-300 p-4 text-left font-semibold">Año Inicio</th>
                <th className="border border-gray-300 p-4 text-left font-semibold">Fecha Fin</th>
              </tr>
            </thead>
            <tbody>
              {listContratos.length > 0 ? (
                listContratos.map((contrato, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border border-gray-300 p-4">{contrato.nombrePersona}</td>
                    <td className="border border-gray-300 p-4">{contrato.fechaInicio}</td>
                    <td className="border border-gray-300 p-4">{contrato.fechaFin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border border-gray-300 p-4 text-center">No hay contratos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
