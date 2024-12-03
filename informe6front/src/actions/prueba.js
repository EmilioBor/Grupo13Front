'use service';

import { postsPrueba } from "@/lib/api/prueba";

export async function postPrueba(data){
    return await postsPrueba(data);
}