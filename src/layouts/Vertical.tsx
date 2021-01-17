// @flow
import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import * as layoutConstants from '../constants/layout';
import ThemeCustomizer from '../components/ThemeCustomizer';
import { useTheme } from '../context/theme-context';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const LeftSidebar = React.lazy(() => import('../components/LeftSidebar'));
const Topbar = React.lazy(() => import('../components/Topbar'));
const Footer = React.lazy(() => import('../components/Footer'));
const RightSidebar = React.lazy(() => import('../components/RightSidebar'));

type VerticalLayoutProps = {
    children?: React.ReactNode
};

// loading
const emptyLoading = () => <div></div>;
const loading = () => <div className="text-center"></div>;

const VerticalLayout = (props: VerticalLayoutProps) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const { changeLayout, leftSideBarTheme, leftSideBarType, changeLeftSidebarTheme, changeLeftSidebarType } = useTheme();

    const data = {
        changeLayout: changeLayout,
        changeSidebarTheme: changeLeftSidebarTheme,
        changeSidebarType: changeLeftSidebarType,
        children: props.children,
        layout: {
            leftSideBarType: leftSideBarType,
            leftSideBarTheme: leftSideBarTheme,
        },
    };

    useEffect(() => {
        window.addEventListener("resize", updateDimensions.bind(this));

        changeLeftSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_DARK);

        // activate the condensed sidebar if smaller devices like ipad or tablet
        if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
            changeLeftSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
        }

        return () => {
            window.removeEventListener("resize", updateDimensions.bind(this));
        }
    }, []);

    const openLeftMenu = () => {
        if (document.body) document.body.classList.add('sidebar-enable');
    };

    const updateDimensions = () => {
        // activate the condensed sidebar if smaller devices like ipad or tablet
        if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
            changeLeftSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
        } else if (window.innerWidth > 1028) {
            changeLeftSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED);
        }
    }

    // get the child view which we would like to render
    const children = props.children || null;

    const isCondensed = leftSideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED;
    const isLight = leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_LIGHT;

    return (
        <div className="app">
            <div className="wrapper">
                <Suspense fallback={emptyLoading()}>
                    <LeftSidebar
                        {...data}
                        isCondensed={isCondensed}
                        isLight={isLight}
                        hideUserProfile={true}
                    />
                </Suspense>

                <div className="content-page">
                    <div className="content">
                        <Suspense fallback={emptyLoading()}>
                            <Topbar {...data} openLeftMenuCallBack={openLeftMenu} hideLogo={true} />
                        </Suspense>

                        <Container fluid>
                            <Suspense fallback={loading()}>{children}</Suspense>
                        </Container>
                    </div>

                    <Suspense fallback={emptyLoading()}>
                        {/* <Footer {...data} /> */}
                        <Footer />
                    </Suspense>
                </div>
            </div>

            <Suspense fallback={emptyLoading()}>
                <RightSidebar {...data}>
                    <ThemeCustomizer />
                </RightSidebar>
            </Suspense>
        </div>
    );
}

export default VerticalLayout;
