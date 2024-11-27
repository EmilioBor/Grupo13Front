'use server';
import { getListaPaises } from "@/lib/api/pais";
export async function getPais() {
    return await getListaPaises();
}