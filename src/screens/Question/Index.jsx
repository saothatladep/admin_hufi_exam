import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import ContentQuestion from './components/ContentQuestion';

const Question = (props) => {
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
          <ContentQuestion history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Question;
