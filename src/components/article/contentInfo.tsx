import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Chip } from '@material-ui/core';
import '../../style/components/article/contentInfo.scss';
import { getFormatTime } from '../../util/myUtils';
import { Create, Visibility, Chat } from '@material-ui/icons';
import { ThemeContext } from '../common/theme';

export default function ContentInfo(props: {
  readNum: number;
  replyNum: number;
  title: string;
  type: number[];
  timeStamp: number;
}): JSX.Element {
  const { typeList } = useContext(ThemeContext);
  return (
    <Card elevation={0} className="content-info">
      <CardHeader title={props.title} />
      <CardContent>
        <div className="simple-info">
          <Typography variant="body2" color="textSecondary" className="info-item" component="span">
            <Create className="icon" /> {getFormatTime(props.timeStamp)}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="info-item" component="span">
            <Visibility className="icon" /> {props.readNum}次访问
          </Typography>
          <Typography variant="body2" color="textSecondary" className="info-item" component="span">
            <Chat className="icon" /> {props.replyNum}个评论
          </Typography>
        </div>
        <div className="type-info">
          {props.type.map<JSX.Element>((value) => (
            <Chip className="type-label" label={typeList[value]} key={value} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
