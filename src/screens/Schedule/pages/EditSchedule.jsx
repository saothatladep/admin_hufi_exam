import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../../components/MainFrame/Index';
import ContentEditSchedule from '../components/ContentEditSchedule';

const EditExam = (props) => {
  const { history, location, match } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <MainFrame location={location} />
          <ContentEditSchedule history={history} match={match} />
        </>
      )}
    </div>
  );
};

export default EditExam;
