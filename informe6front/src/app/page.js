import Link from "next/link";

export default function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 sm:p-20 gap-16">
      {/* Título */}
      <div className="text-center mt-2">
        <h1 className="text-5xl sm:text-6xl font-bold text-black mb-4">
          PERIÓDICO DEPORTIVO
        </h1>
        <h3 className="text-2xl sm:text-3xl font-medium text-gray-600">
          Gestión de Eventos Ciclísticos
        </h3>
      </div>

      {/* Botones */}
      <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
        <Link href={"/VistaEquipo"}>
          <button
            className="px-12 z-30 py-6 bg-blue-500 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#3b82f6;] hover:[text-shadow:2px_2px_2px_#60a5fa] text-3xl"
            >
            Vista Equipo
          </button>
        </Link>
        <Link href="/Contrato">
          <button
            className="px-12 z-30 py-6 bg-blue-500 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#3b82f6;] hover:[text-shadow:2px_2px_2px_#60a5fa] text-3xl"
          >
            Alta Contrato
          </button>
        </Link>
        <Link href={"/AltaPrueba"}>
          <button
            className="px-12 z-30 py-6 bg-blue-500 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#3b82f6;] hover:[text-shadow:2px_2px_2px_#60a5fa] text-3xl"
            >
            Alta Prueba
          </button>
        </Link>
      </div>
    </div>
  );
}
