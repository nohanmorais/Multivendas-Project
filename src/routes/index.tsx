import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home';
import Sales from '../pages/sales';

const Routes: React.FC = () => (
    <Switch>
        <Route  exact path='/'  component={Home}/>
        <Route path='/sales' component={Sales} />
    </Switch>
)

export default Routes;