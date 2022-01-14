/* 
    Mount function to startup the app
    =================================
    -- Dev mode
    If we are in development and in isolation,
    call mount immidiately 

    -- Prod / Container mode
    If we are in container 
    we should export the mount function

*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath } ) => {
    // The default history is only used for standalone development mode 
    // See comment below ie. if (process.env.NODE_ENV === 'development')
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });
    
    if (onNavigate) {
        history.listen(onNavigate);
    }
    
    ReactDOM.render(
        <App onSignIn={onSignIn} history={history} />,
        el
    );

    // The following return is for the communication from the container app
    return {
        onParentNavigate( { pathname: nextPathname } ) {
            if (history.location.pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
};

// If above
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector("#__auth-dev-root");
    if (devRoot) {
        // The reason for the createBrowserHistory() argument is to cater for standalone development to still have the routes like /pricing, etc...
        mount(devRoot, { defaultHistory: createBrowserHistory()});
    }
}
export { mount };
console.log('Marketting page loaded..');