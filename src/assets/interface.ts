export interface ArticleListData {
    aid: number
    time_str: string
    title: string
    type: number
}

export interface ReplyData {
    aid: number
    content: string
    email: string
    name: string
    rid: number
    time_stamp: number
    time_str: string
    url: string
}

export interface ArticleData {
    title: string
    time_str: string
    content: string
    time_stamp: number
    directory: string[]
    type: number | null
    read_num: number
    reply_num: number
}
