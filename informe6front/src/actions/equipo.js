'use server';
import { agregandoEquipo, buscarequipo, listaEquipo } from "@/lib/api/equipo";
export async function postEquipo(data) {
    return await agregandoEquipo(data);
}

export async function getbynombre(nombre) {
    return await buscarequipo(nombre);
}

export async function getsEquipo() {
    return await listaEquipo();
}