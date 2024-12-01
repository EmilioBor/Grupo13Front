'use server';
import { agregandoEquipo } from "@/lib/api/equipo";
export async function postEquipo(data) {
    return await agregandoEquipo(data);
}