import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../../components/MainFrame/Index';
import Meta from '../../../components/Meta';
import ContentEditExam from '../components/ContentEditExam';

const EditExam = (props) => {
  const { history, location, match } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const l = useSelector((state) => state.languageChange);
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <Meta title={`TonTon | ${l.exam}`} />
          <MainFrame location={location} />
          <ContentEditExam history={history} match={match} />
        </>
      )}
    </div>
  );
};

export default EditExam;
