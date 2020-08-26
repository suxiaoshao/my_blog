import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Path } from 'history';
export function LinkButton(props: {
  children: React.ReactNode;
  href: string;
  className?: string;
  path: Path;
  disabled?: boolean;
}): JSX.Element {
  //路由控制器
  const history = useHistory();
  return (
    <Button
      disabled={props.disabled}
      href={props.href}
      onClick={(e) => {
        e.preventDefault();
        history.push('/fail');
        setTimeout(() => {
          history.push(props.path);
        }, 1);
      }}
      className={props.className}
    >
      {props.children}
    </Button>
  );
}
