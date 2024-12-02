'use server';
import { agregarContrato, contratoCiclista } from "@/lib/api/contrato";

export async function getContratoEquipo(nombre) {
    return await contratoCiclista(nombre);
}

export async function postContrato(data){
    return await agregarContrato(data);
}