import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import Meta from '../../components/Meta';
import ContentSubject from './components/ContentSubject';

const Subject = (props) => {
  const { history, location } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const l = useSelector((state) => state.languageChange);
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <Meta title={`TonTon | ${l.subject}`} />
          <MainFrame location={location} />
          <ContentSubject history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Subject;
