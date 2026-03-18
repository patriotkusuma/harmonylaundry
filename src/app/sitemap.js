import { getBlogData } from "@/lib/newPost"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(){
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
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    ]

    let postSitemap = []

    try {
        const posts = await getBlogData()

        // Response API: { data: [...], total: N }
        if (posts && Array.isArray(posts.data)) {
            postSitemap = posts.data.map((post) => ({
                url: `https://harmonylaundrys.com/blog/${post.slug}`,
                lastModified: post.updated_at || post.created_at || new Date(),
                changeFrequency: 'weekly',
                priority: 0.7
            }))
        }
    } catch (err) {
        console.error("Sitemap: Gagal fetch blog data:", err)
    }

    return [
        ...indexed,
        ...postSitemap
    ]
}
