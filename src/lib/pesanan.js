import { logger } from "../../logger"
import { baseUrl } from "./variable"

export default async function getDetailPesan(kodePesan){
    try{

        // const url = `https://silaundry.my.id/api/pesan/${kodePesan}`
        // const url = `https://admin.harmonylaundry.my.id/api/pesan/${kodePesan}`
        const url = `https://go.harmonylaundry.my.id/api/public/detail-pesanan?kode_pesan=${kodePesan}`
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjkwNzYyNDAsInVzZXJfaWQiOjN9.La1NahBxsZU_dDoycZhhCrzn52u-1DDFrzLxQS4yX94"; // atau dari env / login user

        const data = await fetch(url, {
            cache: "no-cache",
            headers: {
                Authorization: `Bearer ${token}`,
                "X-PUBLIC-KEY": token
            },
        });

        logger.info("Detail Pesanan Fetched");

        // console.log( `Data Pesnanan : ${data.json()}`)

        return data.json()
    }catch(err){
        logger.error(err)
    }
}