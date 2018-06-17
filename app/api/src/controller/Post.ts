export interface IPost {
    title: string
    content: string
    author: number // User ID
    date: number
    likes: number
    comments: number // Comments ID
    // Probably never add shares
    // shares: number // Shares ID
}