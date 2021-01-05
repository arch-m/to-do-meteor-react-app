import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TaskScreen } from '../components/tasks/TaskScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <Router>
      <div className="container">
        <Switch>
          <PublicRoute path="/auth" component={ AuthRouter } isLoggedIn={ !!user }/>
          <PrivateRoute exact path="/" component={ TaskScreen } isLoggedIn={ !!user }/>
        </Switch>
      </div>
    </Router>
  );
}