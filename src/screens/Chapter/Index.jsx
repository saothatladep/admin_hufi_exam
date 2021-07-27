import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import Meta from '../../components/Meta';
import ContentChapter from './components/ContentChapter';

const Chapter = (props) => {
  const { history, location } = props;
  const l = useSelector((state) => state.languageChange);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <Meta title={`TonTon | ${l.chapter}`} />

          <MainFrame location={location} />
          <ContentChapter history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Chapter;
