"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContratoPage() {
  const [formData, setFormData] = useState({
    ciclista: "",
    equipo: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [numeroContrato, setNumeroContrato] = useState(0);

  // Manejo del número de contrato al cargar la página
  useEffect(() => {
    const ultimoNumero = localStorage.getItem("numeroContrato") || 0; // Obtener el último número de contrato
    const nuevoNumero = parseInt(ultimoNumero) + 1; // Incrementar en 1
    setNumeroContrato(nuevoNumero); // Actualizar el estado
    localStorage.setItem("numeroContrato", nuevoNumero); // Guardar el nuevo número en localStorage
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del contrato:", { ...formData, numeroContrato });
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
        {/* Número de Contrato */}
        <div className="text-right">
          <h2 className="text-xl font-semibold text-black">
            Número de Contrato: <span className="font-bold">{numeroContrato}</span>
          </h2>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-center text-black">
          Alta de Contrato
        </h1>

        {/* Ciclista y Equipo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label
              className="block text-lg font-medium mb-3 text-black"
              htmlFor="ciclista"
            >
              Ciclista
            </label>
            <div className="flex items-center border rounded-lg shadow-sm bg-white">
              <input
                type="text"
                id="ciclista"
                name="ciclista"
                placeholder="Buscar ciclista"
                value={formData.ciclista}
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

          <div>
            <label
              className="block text-lg font-medium mb-3 text-black"
              htmlFor="equipo"
            >
              Equipo
            </label>
            <div className="flex items-center border rounded-lg shadow-sm bg-white">
              <input
                type="text"
                id="equipo"
                name="equipo"
                placeholder="Buscar equipo"
                value={formData.equipo}
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
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label
              className="block text-lg font-medium mb-3 text-black"
              htmlFor="fechaInicio"
            >
              Fecha Inicio
            </label>
            <div className="flex items-center border rounded-lg shadow-sm bg-white">
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 outline-none text-black"
              />
              <span className="px-4 py-3 bg-gray-200 rounded-r-lg">📅</span>
            </div>
          </div>

          <div>
            <label
              className="block text-lg font-medium mb-3 text-black"
              htmlFor="fechaFin"
            >
              Fecha Fin
            </label>
            <div className="flex items-center border rounded-lg shadow-sm bg-white">
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 outline-none text-black"
              />
              <span className="px-4 py-3 bg-gray-200 rounded-r-lg">📅</span>
            </div>
          </div>
        </div>

        {/* Botones */}
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
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
}
