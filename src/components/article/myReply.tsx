import React, { MutableRefObject, useEffect, useMemo, useState } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Typography,
} from '@material-ui/core';
import OpenButton from '../common/openButton';
import { Email, Link } from '@material-ui/icons';
import MyMarkdown from './markdown';
import { getFormatTime } from '../../util/myUtils';
import ReplyPost from './replyPost';

const buddhaSrc: string = require('../../assets/buddha.svg');

// info列表
function ReplyUserInfo(props: { url: string; email: string }): JSX.Element {
  return (
    <List dense>
      <ListItem>
        <ListItemIcon>
          <Email />
        </ListItemIcon>
        <ListItemText primary="邮箱" secondary={props.email} />
      </ListItem>
      {props.url !== '' ? (
        <ListItem>
          <ListItemIcon>
            <Link />
          </ListItemIcon>
          <ListItemText className="have-action" primary="网址" secondary={props.url} />
          <ListItemSecondaryAction>
            <Button
              onClick={() => {
                window.open(props.url);
              }}
            >
              前往
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ) : undefined}
    </List>
  );
}

// 每个 reply 元素
export function ReplyItemComponents(props: ReplyItem): JSX.Element {
  //是否打开内容
  const [contentOpen, setContentOpen] = useState<boolean>(true);
  //锚点
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  //是否打开信息
  const infoOpen = useMemo<boolean>(() => {
    return anchorEl !== null;
  }, [anchorEl]);
  return (
    <>
      <Card elevation={0} className="my-reply-item">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <Popover
                className={'reply-info'}
                anchorEl={anchorEl}
                open={infoOpen}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                <ReplyUserInfo email={props.email} url={props.url} />
              </Popover>
              <Button
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <img src={buddhaSrc} alt="头像" className="MuiAvatar-img" />
              </Button>
            </Avatar>
          }
          title={props.name}
          subheader={
            <Typography variant="body2" color="textSecondary">
              发布于{getFormatTime(props.timeStamp)}
            </Typography>
          }
          action={
            <OpenButton
              open={contentOpen}
              onClick={() => {
                setContentOpen((value) => !value);
              }}
            />
          }
        />
        <Collapse in={contentOpen} timeout="auto" unmountOnExit>
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
  // 新评论列表
  const [newReplyList, setNewReplyList] = useState<ReplyItem[]>([]);
  //获取数据
  const getReplyData = async (offset: number) => {
    setOldHeight(props.father.current.scrollTop);
    const replyNumData = await getReplyNum(props.aid);
    setReplyNum(replyNumData.data.count);
    if (offset < replyNumData.data.count) {
      const replyListData = await getReplyList(props.aid, offset, replyLimit);
      setReplyList((oldList) =>
        oldList.concat(
          // 去除已添加的新评论数据
          replyListData.data.replyList.filter((value) => {
            return !newReplyList.some((value1) => {
              return value1.rid === value.rid;
            });
          }),
        ),
      );
    }
  };
  //修改文章时
  useEffect(() => {
    setReplyList([]);
    setNewReplyList([]);
    getReplyData(0).then();
  }, [props.aid]);
  useEffect(() => {
    props.father.current.scrollTop = oldHeight;
  }, [replyList]);
  return (
    <div className="my-reply">
      <ReplyPost
        onPost={(value) => {
          setOldHeight(props.father.current.scrollTop);
          setReplyList((oldValue) => [value].concat(oldValue));
          setNewReplyList((oldValue) => [value].concat(oldValue));
        }}
      />
      {replyList.map<JSX.Element>((value) => {
        return <ReplyItemComponents {...value} key={value.rid} />;
      })}
      <Button
        className="load-button"
        onClick={() => {
          getReplyData(replyList.length - newReplyList.length).then();
        }}
        disabled={replyNum <= replyList.length}
      >
        <Typography variant="h6">{replyNum <= replyList.length ? '已经到底了' : '加载'}</Typography>
      </Button>
    </div>
  );
}
