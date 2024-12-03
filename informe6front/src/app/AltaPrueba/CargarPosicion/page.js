"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getsEquipo } from "@/actions/equipo";

export default function CargarEquipo() {
  const [formData, setFormData] = useState({
    nombre: "",
    idPais: "",
    idPersona: "",
  });
  const [equipos, setEquipos] = useState([]); // Lista cargada de equipos
  const [tablaEquipos, setTablaEquipos] = useState([]); // Equipos agregados a la tabla
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listEquipos = await getsEquipo();
        setEquipos(listEquipos);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("No se pudieron cargar los datos");
      }
    };
    fetchData();
  }, []);

  const handleAgregarEquipo = () => {
    const equipoSeleccionado = equipos.find((eq) => eq.nombre === formData.nombre);
    if (equipoSeleccionado && !tablaEquipos.some((e) => e.nombre === equipoSeleccionado.nombre)) {
      setTablaEquipos((prev) => [
        ...prev,
        { ...equipoSeleccionado, numero: prev.length + 1 },
      ]);
    }
  };

  const handleEliminarEquipo = (numero) => {
    setTablaEquipos((prev) =>
      prev
        .filter((equipo) => equipo.numero !== numero) // Eliminamos el equipo
        .map((equipo, index) => ({ ...equipo, numero: index + 1 })) // Recalculamos los números
    );
  };

  const handleAceptar = () => {
    localStorage.setItem("tablaEquipos", JSON.stringify(tablaEquipos));
    alert("Equipos enviados correctamente");
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      <Link
        href="/"
        className="absolute top-4 left-4 text-xl text-blue-500 hover:underline"
      >
        Volver al Inicio
      </Link>

      <form className="bg-gray-100 p-12 rounded-xl shadow-2xl max-w-5xl w-full space-y-10">
        <h1 className="text-4xl font-bold text-center text-black">Cargar Equipo</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Desplegable para seleccionar un equipo */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-lg font-medium mb-3 text-black"
            >
              Seleccionar Equipo
            </label>
            <select
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full p-4 border text-black rounded-lg shadow-sm bg-white outline-none"
            >
              <option value="">Selecciona un equipo</option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.nombre}>
                  {equipo.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón para agregar equipo */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAgregarEquipo}
            className="px-8 py-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          >
            Agregar Equipo
          </button>
        </div>

        {/* Tabla de equipos */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4 text-left font-semibold">
                  Número
                </th>
                <th className="border border-gray-300 p-4 text-left font-semibold">
                  Equipo
                </th>
                <th className="border border-gray-300 p-4 text-left font-semibold">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {tablaEquipos.length > 0 ? (
                tablaEquipos.map((equipo) => (
                  <tr key={equipo.numero} className="bg-white">
                    <td className="border border-gray-300 p-4">{equipo.numero}</td>
                    <td className="border border-gray-300 p-4">{equipo.nombre}</td>
                    <td className="border border-gray-300 p-4 text-center">
                      <button
                        onClick={() => handleEliminarEquipo(equipo.numero)}
                        className="text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="border border-gray-300 p-4 text-center"
                  >
                    No hay equipos cargados
                  </td>
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
              type="button"
              onClick={handleAceptar}
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
