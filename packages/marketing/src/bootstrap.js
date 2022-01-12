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

const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    );
};

// If above
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector("#__marketing-dev-root");
    if (devRoot) {
        mount(devRoot);
    }
}
export { mount };
console.log('Marketting page loaded..');