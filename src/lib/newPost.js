const blogUrl = "https://silaundry.my.id/api/konten";

export async function getBlogData () {
    try{

        const blogs = await fetch(blogUrl, {cache: 'no-store'});
        return blogs.json()
    }catch(err){
        return new Error(err)
    }

}

export async function getBlogPost(slug) {
    try{
        const blog= await fetch(`${blogUrl}/${slug}`);

        return blog.json()
    }catch(err){
        return new Error(err)
    }
}