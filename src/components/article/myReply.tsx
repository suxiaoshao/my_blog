import React, { MutableRefObject, useEffect, useState } from 'react';
import '../../style/components/article/myReply.scss';
import { getReplyList, getReplyNum, ReplyItem } from '../../util/http';
import { replyLimit } from '../../util/config';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Snackbar,
  Typography,
} from '@material-ui/core';
import OpenButton from '../common/openButton';
import { Close } from '@material-ui/icons';
import MyMarkdown from './markdown';
import { getFormatTime } from '../../util/myUtils';

const buddhaSrc: string = require('../../assets/buddha.svg');

function SnackbarButton(props: {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  href?: string;
  message: string;
  action?: React.ReactNode;
  autoHideDuration?: number;
}): JSX.Element {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  return (
    <>
      {/*按钮本体*/}
      <Button
        href={props.href}
        className={props.className}
        onClick={(event) => {
          props.onClick(event);
          setSnackbarOpen(true);
        }}
      >
        {props.children}
      </Button>

      {/*消息条*/}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        message={props.message}
        onClose={() => {
          setSnackbarOpen(false);
        }}
        autoHideDuration={props.autoHideDuration}
        action={
          <>
            {props.action}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setSnackbarOpen(false);
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}

// 每个 reply 元素
function ReplyItem(props: ReplyItem): JSX.Element {
  const [tipOpen, setTipOpen] = useState<boolean>(true);
  return (
    <>
      <Card elevation={0} className="my-reply-item">
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={buddhaSrc} />}
          title={props.name}
          subheader={
            <div className="reply-info">
              {/* 时间*/}
              <Typography variant="body2" color="textSecondary" className="reply-info-time">
                {getFormatTime(props.timeStamp)}
              </Typography>

              {/*邮箱*/}
              <SnackbarButton
                className="reply-info-button"
                onClick={() => {
                  document.execCommand(props.email);
                }}
                message="已复制到剪切板"
                autoHideDuration={3000}
              >
                <Typography variant="body2" color="textSecondary">
                  {props.email}
                </Typography>
              </SnackbarButton>

              {/*网站*/}
              {props.url !== '' ? (
                <SnackbarButton
                  className="reply-info-button"
                  href={props.url}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  autoHideDuration={3000}
                  message="是否打开此网站"
                  action={
                    <Button
                      color="primary"
                      onClick={() => {
                        window.open(props.url);
                      }}
                    >
                      确定
                    </Button>
                  }
                >
                  <Typography variant="body2" color="textSecondary">
                    {props.url.match(/\/\/(.+)\/?/)[1]}
                  </Typography>
                </SnackbarButton>
              ) : undefined}
            </div>
          }
          action={
            <OpenButton
              open={tipOpen}
              onClick={() => {
                setTipOpen((value) => !value);
              }}
            />
          }
        />
        <Collapse in={tipOpen} timeout="auto" unmountOnExit>
          <CardContent>
            <MyMarkdown value={props.content} className="reply-markdown" />
          </CardContent>
        </Collapse>
      </Card>
      <Divider />
    </>
  );
}

export default function MyReply(props: { aid: number; father: MutableRefObject<HTMLDivElement> }): JSX.Element {
  //评论总数
  const [replyNum, setReplyNum] = useState(0);
  //评论数
  const [replyList, setReplyList] = useState<ReplyItem[]>([]);
  //储存滚动长度
  const [oldHeight, setOldHeight] = useState<number>(0);
  //获取数据
  const getReplyData = async (offset: number) => {
    setOldHeight(props.father.current.scrollTop);
    const replyNumData = await getReplyNum(props.aid);
    setReplyNum(replyNumData.data.count);
    if (offset < replyNumData.data.count) {
      const replyListData = await getReplyList(props.aid, offset, replyLimit);
      setReplyList((oldList) => oldList.concat(replyListData.data.replyList));
    }
  };
  useEffect(() => {
    setReplyList([]);
    getReplyData(0).then();
  }, [props.aid]);
  useEffect(() => {
    props.father.current.scrollTop = oldHeight;
  }, [replyList]);
  return (
    <div className="my-reply">
      {replyList.map<JSX.Element>((value) => {
        return <ReplyItem {...value} key={value.rid} />;
      })}
      <Button
        className="load-button"
        onClick={() => {
          getReplyData(replyList.length).then();
        }}
        disabled={replyNum <= replyList.length}
      >
        <Typography variant="h6">{replyNum <= replyList.length ? '已经到底了' : '加载'}</Typography>
      </Button>
    </div>
  );
}
