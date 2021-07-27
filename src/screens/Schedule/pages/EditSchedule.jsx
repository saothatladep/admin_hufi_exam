import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../../components/MainFrame/Index';
import Meta from '../../../components/Meta';
import ContentEditSchedule from '../components/ContentEditSchedule';

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
          <Meta title={`TonTon | ${l.schedule}`} />
          <MainFrame location={location} />
          <ContentEditSchedule history={history} match={match} />
        </>
      )}
    </div>
  );
};

export default EditExam;
