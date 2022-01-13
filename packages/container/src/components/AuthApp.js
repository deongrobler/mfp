import React, { useRef, useEffect } from "react";
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    // useEffect function is going to run itsself anytime when this component is changed in any way 
    // to limit the number of refreshes, we have to add a dependency array as the 2nd argument to useEffect()
    useEffect( () => {
        // ref.current is the reference to the html element
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ( 
                // The pathname: nextPathname is renaming the pathName to nextPathname
                // The curly braces goes into the object (that is location that is received and gets the pathname value)
                { pathname: nextPathname }) => {
                console.log(nextPathname);
                // This syncronizes the child app with the parent app hostory
                // Remember the child app's history is memoryHistory and the container app is browserHistory
                if (history.location.pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });
        // mount is going to take it and create an instance of our marketting app and render 
        // into the div below, this approach could also work for Angular or Vue or normal Html apps

        history.listen(onParentNavigate);
    }, [] );

    return <div ref={ref}></div>
}