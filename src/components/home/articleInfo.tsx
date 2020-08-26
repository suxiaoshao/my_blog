import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../common/theme';
import '../../style/components/home/arcticleInfo.scss';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { AccessAlarm, ChatBubble, Style, Visibility } from '@material-ui/icons';
import OpenButton from '../common/openButton';
import { LinkButton } from '../common/linkButton';
import { getFormatTime } from '../../util/myUtils';

interface ArticleInfoProp {
  imageIndex: number;
  className?: string;
  title: string;
  aid: number;
  type: number[];
  replyNum: number;
  readNum: number;
  timeStamp: number;
}

export default function ArticleInfo(props: ArticleInfoProp): JSX.Element {
  //图片列表和类型列表
  const { imageSrcList, typeList } = useContext(ThemeContext);
  //背景图片地址
  const [srcUrl, setSrcUrl] = useState<string>(imageSrcList[props.imageIndex]);
  //路由控制器
  const history = useHistory();
  //是否打开提示
  const [tipOpen, setTipOpen] = useState<boolean>(false);
  //信息列表
  const InfoList = (
    <List>
      <ListItem>
        <ListItemIcon>
          <AccessAlarm />
        </ListItemIcon>
        <ListItemText>{getFormatTime(props.timeStamp)}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Visibility />
        </ListItemIcon>
        <ListItemText>{props.readNum}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ChatBubble />
        </ListItemIcon>
        <ListItemText>{props.replyNum}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Style />
        </ListItemIcon>
        <ListItemText>
          {props.type.map<JSX.Element>((value) => {
            return <Chip key={value} label={typeList[value]} />;
          })}
        </ListItemText>
      </ListItem>
    </List>
  );

  //图片更新
  useEffect(() => {
    setSrcUrl(imageSrcList[props.imageIndex]);
  }, [imageSrcList, props.imageIndex]);

  return (
    <Card className={`${props.className !== undefined ? props.className + ' ' : ''} article-info`}>
      <CardHeader
        title={
          <LinkButton href={`/article/${props.aid}`} path={`/article/${props.aid}`} className="article-info-title">
            <Typography variant="h6" className={tipOpen ? undefined : 'article-info-close'}>
              {props.title}
            </Typography>
          </LinkButton>
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
        <CardContent>{InfoList}</CardContent>
      </Collapse>
      <Collapse in={!tipOpen} timeout="auto" unmountOnExit>
        <CardActionArea
          href={`/article/${props.aid}`}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/article/${props.aid}`);
          }}
        >
          <CardMedia component="img" title="背景图" image={srcUrl} />
        </CardActionArea>
      </Collapse>
    </Card>
  );
}
