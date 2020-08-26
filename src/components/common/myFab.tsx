import { Add } from '@material-ui/icons';
import { Fab, SwipeableDrawer } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import '../../style/components/myFab.scss';
import { ThemeContext } from './theme';

export default function MyFab(props: { children: React.ReactNode }): JSX.Element {
  //标签页是否打开
  const [fabOpen, setFabOpen] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Fab
        onClick={() => {
          setFabOpen((value) => !value);
        }}
        className={'phone-button'}
        color="primary"
        aria-label="add"
      >
        <Add />
      </Fab>
      <SwipeableDrawer
        className={theme ? 'dark-tab' : 'light-tab'}
        onClose={() => {
          setFabOpen(false);
        }}
        onOpen={() => {
          setFabOpen(true);
        }}
        open={fabOpen}
        anchor="bottom"
      >
        <div className="content">{props.children}</div>
      </SwipeableDrawer>
    </>
  );
}
