import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const dirRelativeToPublicFolder = 'posts';
const postDirectory = path.resolve('./public', dirRelativeToPublicFolder);

export async function getPostData() {

    const fullPath = fs.readdirSync('public/posts/')

    const fileContents = fullPath.map((fileName) => {
        const id = fileName.replace(/\.md$/,'')

        const path = fs.readFileSync(`public/posts/${id}.md`, 'utf-8')
        const matterResult = matter(path)

    
        return{
            id,
            ...matterResult.data
        }
    })

    return {
        fileContents,
        fullPath
    }
}

export async function getSinglePost(name){
    const filepath = path.join('/',postDirectory, `${name}.md`)
    const fileContents = fs.readFileSync(filepath, 'utf-8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return{
        name,
        contentHtml,
        ...matterResult.data,
    }
}