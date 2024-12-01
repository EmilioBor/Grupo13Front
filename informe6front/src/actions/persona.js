'use server';
import { getListaDirectores } from "@/lib/api/persona";
export async function getDirector() {
    return await getListaDirectores();
}