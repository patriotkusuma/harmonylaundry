import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'


const postDirectory = path.join(__dirname, '../posts/')

export async function getPostData() {

    const fullPath = fs.readdirSync('/posts/')

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
    const fileContents = fs.readFileSync(`/posts/${name}.md`, 'utf-8')
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