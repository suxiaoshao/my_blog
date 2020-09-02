import React, { useMemo, useState } from 'react';
import { Collapse, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle, EmailRounded, LinkRounded, Send } from '@material-ui/icons';
import '../../style/components/article/replyPost.scss';
import { ReplyItemComponents } from './myReply';
import { useParams } from 'react-router-dom';
import { postReply, ReplyItem } from '../../util/http';

export default function ReplyPost(props: { onPost: (value: ReplyItem) => void }): JSX.Element {
  // name 的输入值
  const [name, setName] = useState<string>('');
  // email 的输入值
  const [email, setEmail] = useState<string>('');
  // url 的输入值
  const [url, setUrl] = useState<string>('');
  //content
  const [content, setContent] = useState<string>('');
  //email是否出错
  const emailError = useMemo<boolean>(() => {
    return !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email);
  }, [email]);
  //url 是否正确
  const urlError = useMemo<boolean>(() => {
    return !/(^$|^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$)/.test(url);
  }, [url]);
  //是否可发送
  const allowPost = useMemo<boolean>(() => {
    return !emailError && !urlError && name !== '' && content !== '';
  }, [content, emailError, name, urlError]);
  //路由数据
  const match = useParams<{ aid: string }>();
  return (
    <div className="reply-post">
      <div className="reply-base">
        {/*名字项*/}
        <TextField
          value={name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            setName(event.target.value);
          }}
          error={name === ''}
          label="名字"
          className="reply-base-item"
          helperText={name === '' ? '必填' : undefined}
          variant="filled"
        />

        {/*邮箱项*/}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRounded />
              </InputAdornment>
            ),
          }}
          error={emailError}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          label="邮箱"
          className="reply-base-item"
          helperText={emailError ? (email === '' ? '必填' : '请输入正确格式') : undefined}
          variant="filled"
        />
        <TextField
          error={urlError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkRounded />
              </InputAdornment>
            ),
          }}
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
          }}
          label="个人网址"
          className="reply-base-item"
          helperText={urlError ? '格式错误' : '非必填'}
          variant="filled"
        />
      </div>
      <TextField
        className="content"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        label="内容"
        multiline
        rowsMax={10}
        error={content === ''}
        variant="filled"
        helperText={content === '' ? '必填' : undefined}
        placeholder="支持markdown"
        InputProps={{
          endAdornment: (
            <IconButton
              className={allowPost ? 'post-button' : undefined}
              disabled={!allowPost}
              onClick={() => {
                postReply(Number(match.aid), name, url, email, content).then((value) => {
                  setContent('');
                  setEmail('');
                  setUrl('');
                  setName('');
                  props.onPost(value.data);
                });
              }}
            >
              <Send />
            </IconButton>
          ),
        }}
      />
      <Collapse in={allowPost} timeout="auto" unmountOnExit className="preview">
        <ReplyItemComponents
          aid={Number(match.aid)}
          content={content}
          email={email}
          name={name}
          rid={-1}
          url={url}
          timeStamp={new Date().getTime()}
        />
      </Collapse>
    </div>
  );
}
