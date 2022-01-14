import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Progress from "./components/Progress";
import Header from "./components/Header";
import { 
    StylesProvider, 
    createGenerateClassName 
} from "@material-ui/core";

// The next few lines load the components eagerly
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

// However to only load when needed do the following
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});
// BrowserRouter is the BrowserHistory component

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/auth" >
                            <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                        </Route>
                        <Route path="/" >
                            <MarketingLazy />
                        </Route>
                    </Switch>
                </Suspense>
            </div>
            </StylesProvider>
        </BrowserRouter>
        );
}


