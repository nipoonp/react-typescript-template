import React, { FunctionComponent } from 'react';
import { Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { Route } from 'react-router-dom';

// auth
import { Login } from '../pages/auth/Login';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';

// other
const Page1 = React.lazy(() => import('../pages/Page1'));
const Page2 = React.lazy(() => import('../pages/Page2'));

interface PrivateRouteProps extends RouteProps {
    component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/other/page1" />,
    route: PrivateRoute,
};

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        }
    ],
};

// dashboards
const otherRoutes = {
    path: '/other',
    name: 'Other',
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
        {
            path: '/other/page1',
            name: 'Page1',
            component: Page1,
            route: PrivateRoute,
        },
        {
            path: '/other/page2',
            name: 'Page2',
            component: Page2,
            route: PrivateRoute,
        },
    ],
};

const otherRoutes2 = {
    path: '/components',
    name: 'Components',
    icon: 'uil-home-alt',
    children: [
        {
            path: '/components/page3',
            name: 'Page3',
            component: Page3,
            route: PrivateRoute,
        },
        {
            path: '/components/page4',
            name: 'Page4',
            component: Page4,
            route: PrivateRoute,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes: any[]) => {
    let flatRoutes: any[] = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [rootRoute, otherRoutes, otherRoutes2, authRoutes];

const appMenuRoutes = [otherRoutes, otherRoutes2];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, appMenuRoutes, allFlattenRoutes };
