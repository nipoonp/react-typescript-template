import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useAPI } from '../context/api-context';
import { useRoutes } from '../context/routes-context';
import AuthLayout from '../layouts/Auth';

// // import { allFlattenRoutes as routes } from './index';
// import { isUserAuthenticated } from '../helpers/authUtils';
// import * as layoutConstants from '../constants/layout';

// // All layouts/containers
// import AuthLayout from '../layouts/Auth';
// import VerticalLayout from '../layouts/Vertical';
import VerticalLayout from '../layouts/Vertical';
// import DetachedLayout from '../layouts/Detached';

const Routes = () => {
    const { routes } = useRoutes();
    // returns the layout
    // const getLayout = () => {
    //     // if (!isUserAuthenticated()) return AuthLayout;

    //     let layoutCls = VerticalLayout;

    //     switch (this.props.layout.layoutType) {
    //         case layoutConstants.LAYOUT_HORIZONTAL:
    //             layoutCls = VerticalLayout;
    //             break;
    //         case layoutConstants.LAYOUT_DETACHED:
    //             layoutCls = DetachedLayout;
    //             break;
    //         default:
    //             layoutCls = VerticalLayout;
    //             break;
    //     }
    //     return layoutCls;
    // };

    // shouldComponentUpdate(nextProps, nextState) {
    //     let oldRoutes = { ...this.props.routes };
    //     let newRoutes = { ...nextProps.routes };

    //     let oldLayout = { ...this.props.layout };
    //     delete oldLayout.showRightSidebar;
    //     let newLayout = { ...nextProps.layout };
    //     delete newLayout.showRightSidebar;
    //     return (
    //         JSON.stringify(oldLayout) !== JSON.stringify(newLayout) ||
    //         JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user) ||
    //         JSON.stringify(oldRoutes) !== JSON.stringify(newRoutes)
    //     );
    // }

    // const Layout = this.getLayout();
    // rendering the router with layout
    return (
        <BrowserRouter>
            {/* <Layout {...this.props}> */}
            <Layout>
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            !route.children && (
                                <route.route
                                    key={index}
                                    path={route.path}
                                    roles={route.roles}
                                    exact={route.exact}
                                    component={route.component}></route.route>
                            )
                        );
                    })}
                </Switch>
            </Layout>
            {/* </Layout> */}
        </BrowserRouter>
    );
}

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    const { isUserLoggedIn } = useAPI();

    // if (!isUserLoggedIn) return <AuthLayout>{props.children}</AuthLayout>;

    return (
        <VerticalLayout>{props.children}</VerticalLayout>
    )
}

export default Routes;