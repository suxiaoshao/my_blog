import React, { useEffect, useRef, useState } from 'react';
import MyAppBar from '../components/common/appBar';
import { useParams } from 'react-router-dom';
import { ArticleContent, getArticleContent } from '../util/http';
import MyMarkdown from '../components/article/markdown';
import { useMedia, useScroll } from 'react-use';
import '../style/view/article.scss';
import MyFab from '../components/common/myFab';
import { accessToDirectory, ArticleDirectory } from '../util/myUtils';
import MyDirectory from '../components/article/myDirectory';
import MyReply from '../components/article/myReply';

export function Article(): JSX.Element {
  //路由数据
  const match = useParams<{ aid: string }>();
  //文章数据
  const [articleContent, setArticleContent] = useState<ArticleContent>({
    content: '',
    readNum: 0,
    replyNum: 0,
    title: '',
    type: [],
    aid: -1,
    timeStamp: 0,
  });
  //页面宽度
  const isWide = useMedia('(min-width: 920px)');
  //目录数据
  const [directory, setDirectory] = useState<ArticleDirectory[]>([]);
  //文章滚动区的 ref
  const divList = useRef<HTMLDivElement>(null);
  //最近的章节
  const [activeChapter, setActiveChapter] = useState<string>('');
  //滚动长度
  const { y: scrollTop } = useScroll(divList);
  //获取页面数据

  useEffect(() => {
    getArticleContent(Number(match.aid)).then((res) => {
      if (res.success) {
        setArticleContent(res.data);
        divList.current.scrollTop = 0;
      }
    });
  }, [match.aid]);

  //获取目录数据
  useEffect(() => {
    setDirectory(accessToDirectory(articleContent.content));
  }, [articleContent]);

  // 获取被看到的部分
  useEffect(() => {
    const headList = document.querySelectorAll<HTMLHeadingElement>('h4,h3');
    for (let i = 0; i < headList.length; i++) {
      const head = headList[i];
      if (head.offsetTop >= scrollTop && head.offsetTop <= scrollTop + divList.current.clientHeight) {
        setActiveChapter(head.id);
        break;
      }
    }
    if (headList.length !== 0 && headList[headList.length - 1].offsetTop < scrollTop) {
      setActiveChapter(headList[headList.length - 1].id);
    }
  }, [scrollTop]);

  return (
    <MyAppBar title={isWide ? articleContent.title : ''} className="article">
      {isWide ? (
        <div className="info">
          <MyDirectory directory={directory} active={activeChapter} />
        </div>
      ) : (
        <MyFab>
          <MyDirectory directory={directory} active={activeChapter} />
        </MyFab>
      )}
      <div ref={divList} className="article-content">
        <MyMarkdown value={articleContent.content} />
        <MyReply father={divList} aid={Number(match.aid)} />
      </div>
    </MyAppBar>
  );
}
