// @flow
import React, { Component, Suspense, useEffect } from 'react';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
// const Footer = React.lazy(() => import("./Footer"));
// loading
const loading = () => <div className="text-center"></div>;

type AuthLayoutProps = {
    children?: any,
};

const AuthLayout = (props: AuthLayoutProps) => {
    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        }
    }, []);

    const children = props.children || null;
    return <Suspense fallback={loading()}>{children}</Suspense>;
}

export default AuthLayout;
