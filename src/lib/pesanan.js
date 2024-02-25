import { baseUrl } from "./variable"

export default async function getDetailPesan(kodePesan){
    try{

        const url = `https://silaundry.my.id/api/pesan/${kodePesan}`
        const data = await fetch(url, {cache:'no-store'})

        return data.json()
    }catch(err){
    }
}