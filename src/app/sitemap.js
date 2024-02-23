import { getPostData } from "@/lib/post"
import moment from "moment"

export default async function sitemap(){
    const posts = await getPostData()

    const indexed = {
        url: "https://harmonylaundrys.com/",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
    }
    const postSitemap = () => {
        return posts.fileContents.map((post) => ({
            url: `https://harmonylaundrys.com/blog/${post.id}`,
            lastModified: new Date(post.date),
            changeFrequency: 'daily',
            priority: 0.8
        }))
    }

    return [
        indexed,
        ...postSitemap()
    ]

}