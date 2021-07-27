import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../../components/MainFrame/Index';
import Meta from '../../../components/Meta';
import ContentDetailExam from '../components/ContentDetailExam';

const DetailExam = (props) => {
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
          <ContentDetailExam history={history} />
        </>
      )}
    </div>
  );
};

export default DetailExam;
