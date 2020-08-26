import React from 'react';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
export default function OpenButton(props: { open: boolean; onClick: () => void }): JSX.Element {
  return (
    <IconButton
      onClick={() => {
        props.onClick();
      }}
    >
      {props.open ? <ExpandLess /> : <ExpandMore />}
    </IconButton>
  );
}
