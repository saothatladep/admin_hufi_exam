import React from 'react';
import { useSelector } from 'react-redux';
import MainFrame from '../../../components/MainFrame/Index';
import Meta from '../../../components/Meta';
import ContentDetailSchedule from '../components/ContentDetailSchedule';

const DetailSchedule = (props) => {
  const { history, location } = props;
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
          <ContentDetailSchedule history={history} />
        </>
      )}
    </div>
  );
};

export default DetailSchedule;
