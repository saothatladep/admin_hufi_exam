import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../components/MainFrame/Index';
import ContentSchedule from './components/ContentSchedule';

const Schedule = (props) => {
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
          <ContentSchedule history={history} location={location} />
        </>
      )}
    </div>
  );
};

export default Schedule;
