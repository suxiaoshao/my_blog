import React, { useState } from 'react';
import MyAppBar from '../components/common/appBar';
import '../style/view/home.scss';
import { useMedia } from 'react-use';
import ArticleList from '../components/home/articleList';
import ScreeningForm from '../components/home/screeningForm';
import MyFab from '../components/common/myFab';

export default function Home(): JSX.Element {
  //页面宽度
  const isWide = useMedia('(min-width: 850px)');
  // 搜索词
  const [searchName, setSearchName] = useState<string>('');
  //类型
  const [type, setType] = useState<number[]>([]);
  //排序
  const [sort, setSort] = useState<number>(-1);
  //类型形式
  const [allType, setAllType] = useState<boolean>(false);

  return (
    <MyAppBar title="首页" className="home">
      {isWide ? (
        <div className="info">
          <ScreeningForm
            searchName={searchName}
            sort={sort}
            type={type}
            allType={allType}
            onSearchNameChange={(value) => {
              setSearchName(value);
            }}
            onSortChange={(value) => {
              setSort(value);
            }}
            onTypeListChange={(value) => {
              setType(value);
            }}
            onAllTypeChange={(value) => {
              setAllType(value);
            }}
          />
        </div>
      ) : (
        <MyFab>
          <ScreeningForm
            searchName={searchName}
            sort={sort}
            type={type}
            allType={allType}
            onSearchNameChange={(value) => {
              setSearchName(value);
            }}
            onSortChange={(value) => {
              setSort(value);
            }}
            onTypeListChange={(value) => {
              setType(value);
            }}
            onAllTypeChange={(value) => {
              setAllType(value);
            }}
          />
        </MyFab>
      )}
      <ArticleList className="main" searchName={searchName} type={type} sort={sort} allType={allType} />
    </MyAppBar>
  );
}
