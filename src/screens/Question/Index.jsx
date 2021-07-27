import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import Meta from '../../components/Meta';
import ContentQuestion from './components/ContentQuestion';

const Question = (props) => {
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
          <Meta title={`TonTon | ${l.question}`} />
          <MainFrame location={location} />
          <ContentQuestion history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Question;
