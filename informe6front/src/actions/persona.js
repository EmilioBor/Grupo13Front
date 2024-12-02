'use server';
import { getListaDirectores, getListaCiclista } from "@/lib/api/persona";
export async function getDirector() {
    return await getListaDirectores();
}

export async function getCiclistas(){
    return await getListaCiclista();
}