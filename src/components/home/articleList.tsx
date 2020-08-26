import React, { useEffect, useRef, useState } from 'react';
import { ArticleInfoItem, getArticleList, getArticleNum } from '../../util/http';
import ArticleInfo from './articleInfo';
import { Button, Typography } from '@material-ui/core';
import '../../style/components/home/articleList.scss';
import { wallpaperNum } from '../../util/config';
import { articleLimit } from '../../util/config';

interface ArticleListProp {
  searchName: string;
  type: number[];
  sort: number;
  allType: boolean;
  className?: string;
}
export default function ArticleList(props: ArticleListProp): JSX.Element {
  //文章总数
  const [articleNum, setArticleNum] = useState<number>(0);
  //文章信息列表
  const [articleList, setArticleList] = useState<ArticleInfoItem[]>([]);
  //页面宽度的引用
  const listDiv = useRef<HTMLDivElement>(null);
  //储存滚动长度
  const [oldHeight, setOldHeight] = useState<number>(0);
  //获取数据的函数
  const getArticleData = async (offset: number) => {
    setOldHeight(listDiv.current.scrollTop);
    const articleNumData = await getArticleNum(props.searchName, props.type, props.allType);
    if (!articleNumData.success) {
      return;
    } else if (articleNumData.data.count < offset) {
      return;
    }
    setArticleNum(articleNumData.data.count);
    const articleListData = await getArticleList(
      offset,
      articleLimit,
      props.sort,
      props.searchName,
      props.type,
      props.allType,
    );
    if (!articleListData.success) {
      // return;
    }
    setArticleList((oldList) => {
      return oldList.concat(articleListData.data.articleList);
    });
  };

  //改变offset值
  useEffect(() => {
    setArticleList([]);
    getArticleData(0).then();
  }, [props.type, props.searchName, props.sort, props.allType]);

  //改变长度
  useEffect(() => {
    listDiv.current.scrollTop = oldHeight;
  }, [articleList]);

  return (
    <div ref={listDiv} className={'article-list' + (props.className !== undefined ? ' ' + props.className : '')}>
      {/*文章展示列表*/}
      <div className="list">
        {articleList.map((value) => {
          return <ArticleInfo {...value} className="list-item" key={value.aid} imageIndex={value.aid % wallpaperNum} />;
        })}
      </div>

      {/*获取型数据按钮*/}
      <Button
        className="load-button"
        onClick={() => {
          getArticleData(articleList.length).then();
        }}
        disabled={articleNum <= articleList.length}
      >
        <Typography variant="h6">{articleNum <= articleList.length ? '已经到底了' : '加载'}</Typography>
      </Button>
    </div>
  );
}
