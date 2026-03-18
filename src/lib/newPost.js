import { logger } from "../../logger";

const baseUrl = "https://go.harmonylaundry.my.id/api/blogs";

export async function getBlogData ({ limit = 100 } = {}) {
    try{
        const res = await fetch(`${baseUrl}?limit=${limit}&offset=0`, {cache:'no-cache'});
        logger.info(`Blog Data Fetched SuccessFully (limit=${limit})`)
        return res.json()
    }catch(err){
        logger.info(err)
        return null
    }
}

export async function getBlogDataPaginated({ page = 1, limit = 9 } = {}) {
    try {
        const offset = (page - 1) * limit
        const res = await fetch(`${baseUrl}?limit=${limit}&offset=${offset}`, { cache: 'no-cache' });
        logger.info(`Blog Data Page ${page} (limit=${limit}, offset=${offset}) Fetched`)
        const json = await res.json()

        const blogs = json?.data || []
        const total = json?.total ?? blogs.length
        const totalPages = Math.ceil(total / limit)

        return {
            data: {
                blog: blogs,
            },
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                perPage: limit,
            }
        }
    } catch (err) {
        logger.info(err)
        return null
    }
}

export async function getBlogPost(slug) {
    try{
        const res = await fetch(`${baseUrl}/slug/${slug}`, {cache:'no-cache'});
        logger.info(`Blog Slug ${slug}`)
        logger.info("Blog Post Fetched Successfully")
        return res.json()
    }catch(err){
        logger.info(err)
        return null
    }
}