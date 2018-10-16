import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/App';
import RequireAuth from '../components/auth/Require_auth';
import Signin from '../components/auth/Signin';
import Signout from '../components/auth/Signout';
import Signup from '../components/auth/Signup';
import Feature from '../components/Feature';
import Welcome from '../components/Welcome';

const Routes = () => {
    return (
        <App>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/feature" component={RequireAuth(Feature)} />
        </App>
    );
};

export default Routes;
