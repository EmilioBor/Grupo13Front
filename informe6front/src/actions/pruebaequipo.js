"use service";

import { postsPruebaEquipo } from "@/lib/api/pruebaequipo";

export async function agregandoPruebaEquipo(data){
    return await postsPruebaEquipo(data);
}