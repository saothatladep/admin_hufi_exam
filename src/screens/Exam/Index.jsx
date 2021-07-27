import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import Meta from '../../components/Meta';
import ContentExam from './components/ContentExam';

const Exam = (props) => {
  const { history, location } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const l = useSelector((state) => state.languageChange);
  const { userInfo } = userLogin;
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <Meta title={`TonTon | ${l.exam}`} />
          <MainFrame location={location} />
          <ContentExam history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Exam;
