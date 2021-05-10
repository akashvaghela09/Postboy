import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../Components/Home';

const Allroutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route>
                    <h1>Page Not Found</h1>
                </Route>
            </Switch>
        </div>
    )
}

export { Allroutes }