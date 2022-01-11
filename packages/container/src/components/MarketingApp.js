import React, { useRef, useEffect } from "react";
import { mount } from 'marketing/MarketingApp';

export default () => {
    const ref = useRef(null);
    useEffect( () => {
        // ref.current is the reference to the html element
        mount(ref.current);
        // mount is going to take it and create an instance of our marketting app and render 
        // into the div below, this approach could also work for Angular or Vue or normal Html apps
    });

    return <div ref={ref}></div>
}