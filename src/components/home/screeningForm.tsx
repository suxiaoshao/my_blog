import React, { useContext, useMemo, useState } from 'react';
import { Button, Chip, TextField, Card, CardContent, CardHeader, IconButton, CardActions } from '@material-ui/core';
import '../../style/components/home/screeningForm.scss';
import { ThemeContext } from '../common/theme';
import { Add, DeleteForever, Publish } from '@material-ui/icons';

//表单
export default function ScreenForm(props: {
  searchName: string;
  sort: number;
  type: number[];
  allType: boolean;
  onSearchNameChange: (value: string) => void;
  onSortChange: (value: number) => void;
  onTypeListChange: (value: number[]) => void;
  onAllTypeChange: (value: boolean) => void;
}): JSX.Element {
  //展示的搜索
  const [showSearchName, setShowSearchName] = useState<string>(props.searchName);
  //总 type 列表
  const { typeList } = useContext(ThemeContext);
  //未被选择的 type
  const notChooseType = useMemo<number[]>(() => {
    return typeList
      .map((value, index) => {
        return index;
      })
      .filter((value) => {
        return !props.type.some((value1) => {
          return value1 === value;
        });
      });
  }, [props.type, typeList]);

  return (
    <div className={`screening-form`}>
      {/*搜索输入框*/}
      <TextField
        label="回车标题搜索"
        className="search-input"
        value={showSearchName}
        onChange={(event) => {
          setShowSearchName(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            props.onSearchNameChange(showSearchName);
          }
        }}
        onBlur={() => {
          props.onSearchNameChange(showSearchName);
        }}
      />

      {/*排序方式*/}
      <div className="sort-button-group">
        <Button
          disabled={props.sort === -1}
          onClick={() => {
            props.onSortChange(-1);
          }}
        >
          最新文章
        </Button>
        <Button
          disabled={props.sort === 1}
          onClick={() => {
            props.onSortChange(1);
          }}
        >
          最早文章
        </Button>
      </div>

      {/*类型选择*/}
      <div className="type-input">
        {/*已被选择*/}
        <Card elevation={0}>
          <CardHeader
            action={
              <IconButton
                disabled={props.type.length === 0}
                onClick={() => {
                  props.onTypeListChange([]);
                }}
              >
                <DeleteForever />
              </IconButton>
            }
            subheader="被选择的类型"
          />
          <CardContent className="selected-type">
            {props.type.map((value) => {
              return (
                <Chip
                  key={value}
                  label={typeList[value]}
                  onDelete={() => {
                    const newList = [...props.type].filter((value1) => {
                      return value1 !== value;
                    });
                    props.onTypeListChange(newList);
                  }}
                />
              );
            })}
          </CardContent>
          <CardActions className="select-all-type">
            <Button
              disabled={props.allType}
              onClick={() => {
                props.onAllTypeChange(true);
              }}
            >
              全匹配
            </Button>
            <Button
              disabled={!props.allType}
              onClick={() => {
                props.onAllTypeChange(false);
              }}
            >
              非全匹配
            </Button>
          </CardActions>
        </Card>

        {/*未被选择*/}
        <Card elevation={0}>
          <CardHeader
            action={
              <IconButton
                disabled={notChooseType.length === 0}
                onClick={() => {
                  props.onTypeListChange(typeList.map((value, index) => index));
                }}
              >
                <Publish />
              </IconButton>
            }
            subheader="未被选择的类型"
          />
          <CardContent className="not-selected-type">
            {notChooseType.map((value) => {
              return (
                <Chip
                  key={value}
                  label={typeList[value]}
                  deleteIcon={<Add />}
                  onDelete={() => {
                    const newList = [...props.type];
                    newList.push(value);
                    props.onTypeListChange(newList);
                  }}
                />
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
