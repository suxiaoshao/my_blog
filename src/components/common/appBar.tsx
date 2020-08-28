import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import '../../style/components/common/appBar.scss';
import { GitHub, Brightness4, Brightness5 } from '@material-ui/icons';
import { ThemeContext } from './theme';
import { useTitle } from 'react-use';
import MySidebar from './sidebar';

interface MyAppBarProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}
export default function MyAppBar(props: MyAppBarProps): JSX.Element {
  const { theme, setTheme } = useContext(ThemeContext);
  useTitle(props.title);
  return (
    <div className="my-main">
      <AppBar position="sticky" className="my-app-bar">
        <Toolbar className="my-toolbar">
          {/*主信息*/}
          <MySidebar />
          {/*标题*/}
          <Typography className="tool-title" variant="h6">
            {props.title}
          </Typography>

          {/*两个按钮*/}
          <IconButton target="_blank" href="https://github.com/suxiaoshao">
            <GitHub />
          </IconButton>
          <IconButton
            onClick={() => {
              setTheme((value) => !value);
            }}
          >
            {theme ? <Brightness4 /> : <Brightness5 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={'my-content ' + (props.className !== undefined ? props.className : '')}>{props.children}</div>
    </div>
  );
}
