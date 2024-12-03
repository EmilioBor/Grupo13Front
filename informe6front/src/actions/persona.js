'use server';
import { getListaDirectores, getListaCiclista, postsPersona } from "@/lib/api/persona";
export async function getDirector() {
    return await getListaDirectores();
}

export async function getCiclistas(){
    return await getListaCiclista();
}

export async function agregarPersona(data){
    return await postsPersona(data)
}