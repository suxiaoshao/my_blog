import React, { useContext, useState } from 'react';
import { useMedia } from 'react-use';
import { IconButton, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, Home, Create } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import '../../style/components/mySidebar.scss';
import { ThemeContext } from './theme';
import { LinkButton } from './linkButton';

export default function MySidebar(): JSX.Element {
  //页面宽度
  const isWide = useMedia('(min-width: 850px)');
  //history
  const myHistory = useHistory();
  //pathName
  const myLocation = useLocation();
  //侧边是否打开
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  //是否为暗黑模式
  const { theme } = useContext(ThemeContext);

  return isWide ? (
    <>
      <LinkButton href="/" path="/" disabled={myLocation.pathname === '/'}>
        首页
      </LinkButton>
      <LinkButton href="/article/5" path="/article/5" disabled={myLocation.pathname === '/article/5'}>
        我的学习路线
      </LinkButton>
    </>
  ) : (
    <>
      <IconButton
        onClick={() => {
          setSideOpen(true);
        }}
      >
        <Menu />
      </IconButton>
      <SwipeableDrawer
        className={theme ? 'my-drawer-dark' : 'my-drawer-light'}
        onClose={() => {
          setSideOpen(false);
        }}
        onOpen={() => {
          setSideOpen(true);
        }}
        open={sideOpen}
      >
        <List>
          <ListItem
            button
            disabled={myLocation.pathname === '/'}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              myHistory.push('/');
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>首页</ListItemText>
          </ListItem>
          <ListItem
            button
            disabled={myLocation.pathname === '/article/5'}
            href="/article/5"
            onClick={(e) => {
              e.preventDefault();
              myHistory.push('/article/5');
            }}
          >
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText>我的学习路线</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}
