import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../../components/MainFrame/Index';
import ContentDetailSchedule from '../components/ContentDetailSchedule';

const DetailSchedule = (props) => {
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
          <ContentDetailSchedule history={history} />
        </>
      )}
    </div>
  );
};

export default DetailSchedule;
