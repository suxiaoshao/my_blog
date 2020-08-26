import React, { useMemo, useState } from 'react';
import { ArticleDirectory } from '../../util/myUtils';
import { List, ListItem, ListSubheader, Collapse, ListItemText, IconButton } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

interface DirectoryProps {
  directory: ArticleDirectory[];
  active: string;
}
function DirectoryListItem(props: { value: ArticleDirectory; active: string }): JSX.Element {
  //是否打开预览
  const [openChildren, setOpenChildren] = useState<boolean>(false);
  //active 打开预览
  const activeOpen = useMemo<boolean>(
    () =>
      props.value.content === props.active ||
      props.value.children.some((value) => {
        return value.content === props.active;
      }),
    [props.active, props.value.children, props.value.content],
  );
  //真实的打开预览
  const realOpen = useMemo<boolean>(() => openChildren || activeOpen, [openChildren, activeOpen]);
  return (
    <>
      <ListItem
        button
        selected={props.value.content === props.active}
        onClick={() => {
          document.getElementById(props.value.content).scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ListItemText>{props.value.content}</ListItemText>
        <IconButton
          disabled={activeOpen}
          onClick={(event) => {
            event.stopPropagation();
            setOpenChildren((value) => !value);
          }}
        >
          {realOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={realOpen} unmountOnExit>
        <List>
          {props.value.children.map((value1) => {
            return (
              <ListItem
                key={value1.content}
                button
                style={{
                  paddingLeft: '32px',
                }}
                selected={value1.content === props.active}
                onClick={() => {
                  document.getElementById(value1.content).scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ListItemText>{value1.content}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
export default function MyDirectory(props: DirectoryProps): JSX.Element {
  return (
    <List subheader={<ListSubheader>目录</ListSubheader>}>
      {props.directory.map((value) => {
        return <DirectoryListItem key={value.content} value={value} active={props.active} />;
      })}
    </List>
  );
}
