import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import Meta from '../../components/Meta';
import ContentResult from './components/ContentResult';

const Result = (props) => {
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
          <Meta title={`TonTon | ${l.result}`} />
          <MainFrame location={location} />
          <ContentResult history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Result;
