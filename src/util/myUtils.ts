import { MutableRefObject, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

//返回大小
export function useSize(
  div: MutableRefObject<HTMLElement>,
): {
  height: number;
  width: number;
} {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  //返回可视高度
  useEffect(() => {
    if (div !== null) {
      setHeight(div.current.clientHeight);
      setWidth(div.current.clientWidth);
      window.onresize = () => {
        setHeight(div.current.clientHeight);
        setWidth(div.current.clientWidth);
      };
    }
    return () => {
      if (div !== null) {
        window.onresize = null;
      }
    };
  }, [div]);
  return { height: height, width: width };
}

export interface ArticleDirectory {
  level: 2 | 3;
  content: string;
  children: ArticleDirectory[];
}

//返回目录
export function accessToDirectory(articleContent: string): ArticleDirectory[] {
  const regex = /(?<headPower>#+) +(?<name>.*)\n/;
  const regexResult = articleContent.match(new RegExp(regex, 'g'));
  if (regexResult !== null) {
    const articleDirectory: ArticleDirectory[] = [];
    regexResult.forEach((value) => {
      const regexResult2 = value.match(regex);
      if (regexResult2.groups['headPower'].length === 2) {
        articleDirectory.push({
          level: 2,
          content: regexResult2.groups['name'],
          children: [],
        });
      } else if (regexResult2.groups['headPower'].length === 3 && articleDirectory.length >= 1) {
        articleDirectory[articleDirectory.length - 1].children.push({
          level: 3,
          content: regexResult2.groups['name'],
          children: [],
        });
      }
    });
    return articleDirectory;
  }
  return [];
}

export function getFormatTime(timeStamp: number): string {
  const time = dayjs(timeStamp);
  const now = dayjs(new Date());
  //输出差距时间
  if (now.diff(time, 'day') <= 2) {
    return time.fromNow();
  } else if (now.get('year') - time.get('year') == 0) return time.format('M月D日');
  else {
    return time.format('YYYY年M月D日');
  }
}
