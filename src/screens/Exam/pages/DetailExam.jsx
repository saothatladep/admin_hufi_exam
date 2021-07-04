import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../../components/MainFrame/Index';
import ContentDetailExam from '../components/ContentDetailExam';

const DetailExam = (props) => {
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
          <ContentDetailExam />
        </>
      )}
    </div>
  );
};

export default DetailExam;
