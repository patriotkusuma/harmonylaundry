import { getBlogData } from "@/lib/newPost"
import { getPostData } from "@/lib/post"
import moment from "moment"

export default async function sitemap(){
    const posts = await getBlogData()

    const indexed = [
        {
            url: "https://harmonylaundrys.com/",
            lastModified: new Date("October, 21 2024"),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: "https://harmonylaundrys.com/blog",
            lastModified: new Date("November, 21 2024"),
            changeFrequency: 'yearly',
            priority: 0.8,
        }
    ]
    const postSitemap = () => {
        return posts.data.blog.map((post) => ({
            url: `https://harmonylaundrys.com/blog/${post.slug}`,
            lastModified: moment(post.created_date).toISOString(),
            changeFrequency: 'daily',
            priority: 0.8
        }))
    }

    return [
        ...indexed,
        ...postSitemap()
    ]

}