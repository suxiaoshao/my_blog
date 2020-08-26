import React, { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { getWallpaper } from '../../util/image';
import { wallpaperNum } from '../../util/config';
import { useSessionStorage } from 'react-use';
import { getTypeList } from '../../util/http';

export interface ThemeContextProp {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
  imageSrcList: string[];
  typeList: string[];
}

export const ThemeContext = createContext<ThemeContextProp>({
  theme: true,
  setTheme: () => {
    console.log(111);
  },
  imageSrcList: [],
  typeList: [],
});

export function MyThemeProvider(props: { children: React.ReactNode }): JSX.Element {
  // 是否为暗黑主题
  const [theme, setTheme] = useSessionStorage<boolean>('theme');
  //主题对象
  const themeObject = useMemo<Theme>(() => {
    return createMuiTheme({
      palette: {
        type: theme ? 'dark' : 'light',
      },
    });
  }, [theme]);
  // 图片url数组
  const [imageSrcList, setImageSrcList] = useState<string[]>(() => {
    const loadingSrc: string = require('../../assets/loading.svg');
    const list: string[] = [];
    for (let i = 0; i < wallpaperNum; i++) {
      list.push(loadingSrc);
    }
    return list;
  });
  //类型数组
  const [typeList, setTypeList] = useState<string[]>([]);
  //获取图片数组
  useEffect(() => {
    for (let i = 0; i < wallpaperNum; i++) {
      getWallpaper(i).then((url) => {
        setImageSrcList((list) => {
          const newList = [...list];
          newList[i] = url;
          return newList;
        });
      });
    }
    getTypeList().then((data) => {
      setTypeList(data.data.typeList);
    });
    return () => {
      imageSrcList.forEach((value) => {
        URL.revokeObjectURL(value);
      });
    };
  }, []);

  return (
    <MuiThemeProvider theme={themeObject}>
      <CssBaseline />
      <ThemeContext.Provider
        value={{
          theme: theme,
          setTheme: setTheme,
          imageSrcList: imageSrcList,
          typeList: typeList,
        }}
      >
        <div className={theme ? 'my-dark' : 'my-light'}>{props.children}</div>
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
