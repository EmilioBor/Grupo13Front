"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCiclistas } from "@/actions/persona";
import { getsEquipo } from "@/actions/equipo";
import { postContrato } from "@/actions/contraro";


export default function ContratoPage() {
  const [formData, setFormData] = useState({
    fechaFin: "",
    fechaInicio: "",
    idPersona: "",
    idEquipo: "",
  });

  const [ciclistas, setCiclistas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [filteredCiclistas, setFilteredCiclistas] = useState([]);
  const [filteredEquipos, setFilteredEquipos] = useState([]);
  const [searchCiclistaQuery, setSearchCiclistaQuery] = useState("");
  const [searchEquipoQuery, setSearchEquipoQuery] = useState("");
  const [isCiclistaDropdownVisible, setCiclistaDropdownVisible] = useState(false);
  const [isEquipoDropdownVisible, setEquipoDropdownVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensaje de éxito

  useEffect(() => {
    const fetchData = async () => {
      const ciclistasData = await getCiclistas();
      const equiposData = await getsEquipo();
      setCiclistas(ciclistasData);
      setFilteredCiclistas(ciclistasData);
      setEquipos(equiposData);
      setFilteredEquipos(equiposData);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "ciclista") {
      setSearchCiclistaQuery(value);
      setFilteredCiclistas(
        ciclistas.filter((c) =>
          `${c.nombre} ${c.apellido}`.toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    if (name === "equipo") {
      setSearchEquipoQuery(value);
      setFilteredEquipos(
        equipos.filter((e) =>
          e.nombre.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSelectCiclista = (id, nombreCompleto) => {
    setFormData({ ...formData, idPersona: id });
    setSearchCiclistaQuery(nombreCompleto);
    setFilteredCiclistas([]);
    setCiclistaDropdownVisible(false);
  };

  const handleSelectEquipo = (id, nombre) => {
    setFormData({ ...formData, idEquipo: id });
    setSearchEquipoQuery(nombre);
    setFilteredEquipos([]);
    setEquipoDropdownVisible(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!formData.fechaInicio || !formData.fechaFin) {
        alert("Por favor, complete ambas fechas.");
        return;
      }
  
      const fechaInicio = new Date(formData.fechaInicio);
      const fechaFin = new Date(formData.fechaFin);
  
      // Verificar si las fechas son válidas
      if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
        alert("Una de las fechas es inválida.");
        return;
      }
  
      const payload = {
        fechaFin: fechaFin.toISOString(),
        fechaInicio: fechaInicio.toISOString(),
        idPersona: parseInt(formData.idPersona, 10),
        idEquipo: parseInt(formData.idEquipo, 10),
      };
  
      console.log("Datos enviados:", payload);
      const res = await postContrato(payload);
  
      
        setSuccessMessage("¡Contrato creado con éxito!");
        setFormData({ idPersona: "", idEquipo: "", fechaInicio: "", fechaFin: "" });
        setTimeout(() => setSuccessMessage(""), 5000);
      
    } catch (error) {
      console.error("Error al crear el contrato:", error);
      alert("Ocurrió un error al intentar cargar el contrato.");
    }
  };
  
  
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
      <Link href="/" className="absolute top-4 left-4 text-xl text-blue-500 hover:underline">
        Volver al Inicio
      </Link>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-12 rounded-xl shadow-2xl max-w-5xl w-full space-y-10">
        <h1 className="text-4xl font-bold text-center text-black">Alta de Contrato</h1>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Ciclista */}
          <div>
            <label className="block text-lg font-medium mb-3 text-black" htmlFor="ciclista">
              Ciclista
            </label>
            <div className="relative flex items-center border rounded-lg shadow-sm bg-white">
              <input
                type="text"
                id="ciclista"
                name="ciclista"
                placeholder="Buscar ciclista"
                value={searchCiclistaQuery}
                onChange={handleInputChange}
                onFocus={() => setCiclistaDropdownVisible(true)}
                className="flex-1 px-4 py-3 outline-none text-black"
              />
              {isCiclistaDropdownVisible && filteredCiclistas.length > 0 && (
                <ul className="absolute top-full left-0 w-full text-black bg-white shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredCiclistas.map((ciclista) => (
                    <li
                      key={ciclista.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() =>
                        handleSelectCiclista(ciclista.id, `${ciclista.nombre} ${ciclista.apellido}`)
                      }
                    >
                      {ciclista.nombre} {ciclista.apellido}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Equipo */}
          <div>
            <label className="block text-lg font-medium mb-3 text-black" htmlFor="equipo">
              Equipo
            </label>
            <div className="relative flex items-center border rounded-lg shadow-sm bg-white">
              <input
                type="text"
                id="equipo"
                name="equipo"
                placeholder="Buscar equipo"
                value={searchEquipoQuery}
                onChange={handleInputChange}
                onFocus={() => setEquipoDropdownVisible(true)}
                className="flex-1 px-4 py-3 outline-none text-black"
              />
              {isEquipoDropdownVisible && filteredEquipos.length > 0 && (
                <ul className="absolute top-full left-0 w-full text-black bg-white shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredEquipos.map((equipo) => (
                    <li
                      key={equipo.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectEquipo(equipo.id, equipo.nombre)}
                    >
                      {equipo.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Fecha Inicio */}
          <div>
            <label className="block text-lg font-medium mb-3 text-black" htmlFor="fechaInicio">
              Fecha Inicio
            </label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 outline-none text-black"
            />
          </div>

          {/* Fecha Fin */}
          <div>
            <label className="block text-lg font-medium mb-3 text-black" htmlFor="fechaFin">
              Fecha Fin
            </label>
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 outline-none text-black"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-6">
          <Link href={"/"}>
            <button type="button" className="px-8 py-4 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300">
              Cancelar
            </button>
          </Link>
          <button type="submit" className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
}
