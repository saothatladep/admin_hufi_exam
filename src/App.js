import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './screens/Login/Index';
import Subject from './screens/Subject/Index';
import Chapter from './screens/Chapter/Index';
import User from './screens/User/Index';
import Question from './screens/Question/Index';
import Exam from './screens/Exam/Index';
import DetailExam from './screens/Exam/pages/DetailExam';
import EditExam from './screens/Exam/pages/EditExam';
import Schedule from './screens/Schedule/Index';
import Result from './screens/Result/Index';

const app = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/subject" component={Subject} />
        <Route path="/chapter" component={Chapter} />
        <Route path="/user" component={User} />
        <Route path="/question" component={Question} />
        <Route path="/exam" component={Exam} exact />
        <Route path="/exam/detail" component={DetailExam} />
        <Route path="/schedule" component={Schedule} exact />
        <Route path="/result" component={Result} exact />
        <Route path="/exam/edit/:id" component={EditExam} />
      </Switch>
    </>
  );
};

export default app;
