import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import ContentResult from './components/ContentResult';

const Result = (props) => {
  const { history, location } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <MainFrame location={location} />
          <ContentResult history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Result;
