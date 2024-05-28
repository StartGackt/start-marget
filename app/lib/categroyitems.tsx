import { FolderKanban , Rss , Crown } from "lucide-react"
import {ReactNode} from "react"

interface iAppProps {
    name: string
    title: string
    image: React.ReactNode
    id: number
}
export const categoryItems: iAppProps[] = [
    {
        id : 0,
        name : "product",
        title : "Product",
        image : <FolderKanban />
    },
    {
        id : 1,
        name : "blog",
        title : "Blog",
        image : <Rss />
    },
    {
        id : 2,
        name : "about",
        title : "Contact",
        image : <Crown />
    }
]
