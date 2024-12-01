'use client';
import Link from "next/link";
export default function VistaEquipo(){
    return (
        
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
        <Link href="/" className="absolute top-4 left-4 text-xl text-blue-500 hover:underline">
        Volver al Inicio
        </Link>
        <h1 className="text-black">Vista Equipo</h1>
    </div>
)
}