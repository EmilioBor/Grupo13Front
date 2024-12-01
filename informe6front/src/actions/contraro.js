'use server';
import { contratoCiclista } from "@/lib/api/contrato";

export async function getContratoEquipo(nombre) {
    return await contratoCiclista(nombre);
}