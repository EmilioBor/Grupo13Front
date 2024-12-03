"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { getsEquipo } from "@/actions/equipo";
import { getContratoEquipo } from "@/actions/contraro";
import { getCiclistas } from "@/actions/persona";
import { postPrueba } from "@/actions/prueba";

export default function VistaEquipos() {
  
  // Estados
  const [equipo, setEquipo] = useState({
    nombre: "",
    nombrePais: "",
    nombrePersona: "",
  });
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [equiposList, setEquiposList] = useState([]);
  const [ciclistas, setCiclistas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    añoEdicion: "",
    cantEtapas: "",
    kmTotales: "",
    idPersona: "",
  });
  
  // Efectos
  useEffect(() => {
    const fetchCiclistas = async () => {
      try {
        const res = await getCiclistas();
        setCiclistas(res);
      } catch (error) {
        console.error("Error al obtener los ciclistas:", error);
        setError("No se pudieron cargar los ciclistas");
      }
    };
    fetchCiclistas();
  }, []);
  
  // Funciones
  const handleEquipoSelect = (selectedEquipo) => {
    setEquipo({
      nombre: selectedEquipo.nombre,
      nombrePais: selectedEquipo.nombrePais,
      nombrePersona: selectedEquipo.nombrePersona,
    });
    setNombre(selectedEquipo.nombre);
    setEquiposList([]); // Aquí falta cerrar la función con `}`
  }; // Agrega este cierre.
  
  
  const router = useRouter(); 
  
  const handleApiSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        nombre: formData.nombre,
        añoEdicion: parseInt(formData.añoEdicion, 10),
        cantEtapas: parseInt(formData.cantEtapas, 10),
        kmTotales: parseInt(formData.kmTotales, 10),
        idPersona: parseInt(formData.idPersona, 10),
      };

      const response = await postPrueba(payload);
      alert("Prueba cargada con éxito");

      
        router.push("/Contrato");
      
    } catch (error) {
      console.error("Error al enviar los datos:", error.response || error.message);
      alert(`Ocurrió un error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
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
          <InputField
            label="Año Edición"
            value={formData.añoEdicion}
            onChange={(e) => setFormData({ ...formData, añoEdicion: e.target.value })}
          />
          <InputField
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
          <InputField
            label="Kilómetros Totales"
            value={formData.kmTotales}
            onChange={(e) => setFormData({ ...formData, kmTotales: e.target.value })}
          />
          <InputField
            label="Cantidad Etapas"
            value={formData.cantEtapas}
            onChange={(e) => setFormData({ ...formData, cantEtapas: e.target.value })}
          />
          <SelectField
            label="Ciclista Primero"
            options={ciclistas}
            value={formData.idPersona}
            onChange={(e) => setFormData({ ...formData, idPersona: e.target.value })}
          />
        </div>

        <div className="flex justify-end p-8">
          
          <button
            onClick={handleApiSubmit}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-green-600 px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
          >
            Agregar Equipo
          </button>
          
        </div>

        {/* Tabla */}
        {/* <DataTable data={equiposList} /> */}
      </div>
    </div>
  );
}

// Componente auxiliar para inputs
const InputField = ({ label, value, onChange }) => (
  <div className="col-span-1">
    <label className="block text-lg font-medium mb-2 text-black">{label}</label>
    <input
      type="text"
      className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
      value={value}
      onChange={onChange}
    />
  </div>
);

// Componente auxiliar para selects
const SelectField = ({ label, options, value, onChange }) => (
  <div className="col-span-1">
    <label className="block text-lg font-medium mb-3 text-black">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-4 border rounded-lg shadow-sm bg-white text-black outline-none"
    >
      <option value="">Seleccionar Ciclista</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.nombre} {opt.apellido}
        </option>
      ))}
    </select>
  </div>
);

// Componente auxiliar para la tabla
const DataTable = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300 text-black">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-4 text-left font-semibold">Número</th>
          <th className="border border-gray-300 p-4 text-left font-semibold">Equipo</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="bg-white">
              <td className="border border-gray-300 p-4">{item.id}</td>
              <td className="border border-gray-300 p-4">{item.nombre}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="border border-gray-300 p-4 text-center">
              No hay equipos cargados
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
