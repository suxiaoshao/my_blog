import axios from 'axios';
import { baseUrl } from './config';
import qs from 'qs';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

//web数据基本形式
export interface WebInterface<T = never> {
  success: boolean;
  msg: string;
  data: T;
}

export interface WebErrorInterface<T = never> {
  data: { success: boolean; msg: string; data: T };
}

//文章数量
export interface ArticleNumData {
  count: number;
}

//文章列表信息
export interface ArticleInfoItem {
  title: string;
  aid: number;
  type: number[];
  replyNum: number;
  readNum: number;
  timeStamp: number;
}

//文章列表数据
export interface ArticleListData {
  articleList: ArticleInfoItem[];
}

//文章内容数据
export interface ArticleContent {
  title: string;
  aid: number;
  type: number[];
  replyNum: number;
  readNum: number;
  content: string;
  timeStamp: number;
}

//文章类型数组
export interface TypeList {
  typeList: string[];
}

//评论数量
export interface ReplyNum {
  count: number;
}

//评论列表信息
export interface ReplyItem {
  aid: number;
  content: string;
  email: string;
  name: string;
  rid: number;
  url: string;
  timeStamp: number;
}

//评论列表
export interface ReplyList {
  replyList: ReplyItem[];
}

//获取文章数量
export async function getArticleNum(
  searchName: string,
  type: number[],
  allType: boolean,
): Promise<WebInterface<ArticleNumData>> {
  const response = await axios.get<WebInterface<ArticleNumData>>(
    '/articleNum?' +
      qs.stringify(
        {
          searchName: searchName,
          type: type,
          allType: allType,
        },
        { indices: false },
      ),
  );
  return response.data;
}

//获取文章列表
export async function getArticleList(
  offset: number,
  limit: number,
  sort: number,
  searchName: string,
  type: number[],
  allType: boolean,
): Promise<WebInterface<ArticleListData>> {
  const response = await axios.get<WebInterface<ArticleListData>>(
    '/articleList?' +
      qs.stringify(
        {
          offset: offset,
          limit: limit,
          searchName: searchName,
          type: type,
          sort: sort,
          allType: allType,
        },
        { indices: false },
      ),
  );
  return response.data;
}

//获取文章内容
export async function getArticleContent(aid: number): Promise<WebInterface<ArticleContent>> {
  const res = await axios.get<WebInterface<ArticleContent>>(`/article/${aid}`);
  return res.data;
}

//获取类型数组
export async function getTypeList(): Promise<WebInterface<TypeList>> {
  const res = await axios.get<WebInterface<TypeList>>('/typeList');
  return res.data;
}

//获取评论总数
export async function getReplyNum(aid: number): Promise<WebInterface<ReplyNum>> {
  const res = await axios.get<WebInterface<ReplyNum>>(`/replyNum/${aid}`).catch<WebErrorInterface<ReplyNum>>(() => {
    return {
      data: {
        success: false,
        msg: '网络错误',
        data: {
          count: 0,
        },
      },
    };
  });
  return res.data;
}

//获取评论列表
export async function getReplyList(aid: number, offset: number, limit: number): Promise<WebInterface<ReplyList>> {
  const res = await axios
    .get<WebInterface<ReplyList>>(
      `/replyList/${aid}?` +
        qs.stringify({
          offset: offset,
          limit: limit,
        }),
    )
    .catch<WebErrorInterface<ReplyList>>(() => {
      return {
        data: {
          msg: '网络错误',
          success: false,
          data: {
            replyList: [],
          },
        },
      };
    });
  return res.data;
}

//发送评论
export async function postReply(
  aid: number,
  name: string,
  url: string,
  email: string,
  content: string,
): Promise<WebInterface<ReplyItem>> {
  const res = await axios
    .post<WebInterface<ReplyItem>>('/uploadReply', {
      aid: aid,
      name: name,
      url: url,
      email: email,
      content: content,
    })
    .catch<WebErrorInterface<ReplyItem>>(() => {
      return {
        data: {
          msg: '网络错误',
          success: false,
          data: {
            aid: -1,
            name: '',
            email: '',
            content: '',
            url: '',
            timeStamp: -1,
            rid: -1,
          },
        },
      };
    });
  return res.data;
}
