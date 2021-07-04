import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import ContentExam from './components/ContentExam';

const Exam = (props) => {
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
          <ContentExam history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Exam;
