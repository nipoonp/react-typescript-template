// @flow
import React, { useState } from 'react';
import {
    LAYOUT_DETACHED,
    LAYOUT_HORIZONTAL,
    LAYOUT_VERTICAL,
    LAYOUT_WIDTH_BOXED,
    LAYOUT_WIDTH_FLUID,
    LEFT_SIDEBAR_THEME_DARK,
    LEFT_SIDEBAR_THEME_DEFAULT,
    LEFT_SIDEBAR_THEME_LIGHT,
    LEFT_SIDEBAR_TYPE_CONDENSED,
    LEFT_SIDEBAR_TYPE_FIXED,
    LEFT_SIDEBAR_TYPE_SCROLLABLE,
} from '../constants/layout';
import { useTheme } from '../context/theme-context';


const ThemeCustomizer = () => {
    const [isHorizontalLayout, setIsHorizontalLayout] = useState<boolean>(false);
    const [isDetachedLayout, setIsDetachedLayout] = useState<boolean>(false);
    const [isBoxed, setIsBoxed] = useState<boolean>(false);
    const [isSidebarScrollable, setIsSidebarScrollable] = useState<boolean>(false);
    const [isCondensed, setIsCondensed] = useState<boolean>(false);
    const [isLight, setIsLight] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);

    const {
        layoutType,
        layoutWidth,
        leftSideBarTheme,
        leftSideBarType,
        isRightSidebarVisible,
        changeLayout,
        changeLayoutWidth,
        changeLeftSidebarTheme,
        changeLeftSidebarType,
        toggleRightSidebar,
        showRightSidebar,
        hideRightSidebar,
    } = useTheme();


    // useEffect(() => {
    //     loadStateFromProps();
    // }, [props])

    // const handleClose = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     hideRightSidebar();
    // };

    const loadStateFromProps = () => {
        setIsHorizontalLayout(layoutType === LAYOUT_HORIZONTAL);
        setIsDetachedLayout(layoutType === LAYOUT_DETACHED);
        setIsBoxed(layoutWidth === LAYOUT_WIDTH_BOXED);
        setIsSidebarScrollable(leftSideBarType === LEFT_SIDEBAR_TYPE_SCROLLABLE);
        setIsCondensed(leftSideBarType === LEFT_SIDEBAR_TYPE_CONDENSED);
        setIsLight(leftSideBarTheme === LEFT_SIDEBAR_THEME_LIGHT);
        setIsDark(leftSideBarTheme === LEFT_SIDEBAR_THEME_DARK);
    }

    const changeThemeLayout = (e: React.ChangeEvent<HTMLInputElement>) => {
        var layout = e.currentTarget.value;
        switch (layout) {
            case 'horizontal':
                setIsHorizontalLayout(!isHorizontalLayout);
                setIsCondensed(false);
                setIsDetachedLayout(false);

                changeLayout(LAYOUT_HORIZONTAL);
                break;
            case 'detached':
                setIsDetachedLayout(!isDetachedLayout);
                setIsHorizontalLayout(false);
                setIsBoxed(false);
                changeLayout(LAYOUT_DETACHED);
                break;
            default:
                setIsHorizontalLayout(false);
                setIsCondensed(false);
                setIsDetachedLayout(false);
                changeLayout(LAYOUT_VERTICAL);
                break;
        }
    };

    const changeWidthMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        var mode = e.currentTarget.value;
        switch (mode) {
            case 'boxed':
                setIsBoxed(true);
                changeLayoutWidth(LAYOUT_WIDTH_BOXED);
                break;
            default:
                setIsBoxed(false);
                changeLayoutWidth(LAYOUT_WIDTH_FLUID);
                break;
        }
    };

    const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        var theme = e.currentTarget.value;
        switch (theme) {
            case 'light':
                setIsLight(true);
                changeLeftSidebarTheme(LEFT_SIDEBAR_THEME_LIGHT);
                break;
            case 'dark':
                setIsLight(false);
                setIsDark(true);
                changeLeftSidebarTheme(LEFT_SIDEBAR_THEME_DARK);
                break;
            default:
                setIsLight(false);
                setIsDark(false);
                changeLeftSidebarTheme(LEFT_SIDEBAR_THEME_DEFAULT);
                break;
        }
    };

    const changeLeftSiderbarType = (e: React.ChangeEvent<HTMLInputElement>) => {
        var type = e.currentTarget.value;
        switch (type) {
            case 'condensed':
                setIsCondensed(true);
                setIsSidebarScrollable(false);
                setIsLight(false);
                setIsDark(false);
                changeLeftSidebarType(LEFT_SIDEBAR_TYPE_CONDENSED);
                break;
            case 'scrollable':
                setIsCondensed(false);
                setIsSidebarScrollable(true);
                changeLeftSidebarType(LEFT_SIDEBAR_TYPE_SCROLLABLE);
                break;
            default:
                setIsCondensed(false);
                setIsSidebarScrollable(false);
                changeLeftSidebarType(LEFT_SIDEBAR_TYPE_FIXED);
                break;
        }
    };

    return (
        <>
            <div className="mt-2 p-2">
                <div className="alert alert-primary" role="alert">
                    <strong>Customize the layout, sidebar menu, etc</strong>
                </div>
            </div>

            <h5 className="pl-3">Layout</h5>

            <div className="pl-3">
                <div className="pt-2">
                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="layout"
                            value="vertical"
                            id="vertical-check"
                            onChange={changeThemeLayout}
                            checked={!isHorizontalLayout && !isDetachedLayout}
                        />
                        <label className="custom-control-label" htmlFor="vertical-check">
                            Vertical Layout (Default)
                            </label>
                    </div>

                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="layout"
                            value="horizontal"
                            id="horizontal-check"
                            onChange={changeThemeLayout}
                            checked={isHorizontalLayout}
                        />
                        <label className="custom-control-label" htmlFor="horizontal-check">
                            Horizontal Layout
                            </label>
                    </div>

                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="layout"
                            value="detached"
                            id="detached-check"
                            onChange={changeThemeLayout}
                            checked={isDetachedLayout}
                        />
                        <label className="custom-control-label" htmlFor="detached-check">
                            Detached Layout
                            </label>
                    </div>
                </div>
            </div>

            <hr className="mb-0 mt-2" />
            <h5 className="pl-3">Width</h5>

            <div className="mt-2 pl-3">
                <div className="custom-control custom-switch mb-1">
                    <input
                        type="radio"
                        className="custom-control-input"
                        name="width"
                        value="fluid"
                        id="fluid-check"
                        checked={!isBoxed}
                        onChange={changeWidthMode}
                        disabled={isDetachedLayout}
                    />
                    <label className="custom-control-label" htmlFor="fluid-check">
                        Fluid
                        </label>
                </div>
                <div className="custom-control custom-switch mb-1">
                    <input
                        type="radio"
                        className="custom-control-input"
                        name="width"
                        value="boxed"
                        id="boxed-check"
                        checked={isBoxed}
                        onChange={changeWidthMode}
                        disabled={isDetachedLayout}
                    />
                    <label className="custom-control-label" htmlFor="boxed-check">
                        Boxed
                        </label>
                </div>
            </div>

            <hr className="mb-0" />
            <h5 className="pl-3">Left Sidebar</h5>

            <div className="pl-3">
                <div className="pt-2">
                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="theme"
                            value="default"
                            id="default-theme-check"
                            checked={!isLight && !isDark}
                            onChange={changeTheme}
                            disabled={isDetachedLayout || isHorizontalLayout}
                        />
                        <label className="custom-control-label" htmlFor="default-theme-check">
                            Default
                            </label>
                    </div>

                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="theme"
                            value="light"
                            id="light-theme-check"
                            onChange={changeTheme}
                            checked={isLight}
                            disabled={isDetachedLayout || isHorizontalLayout}
                        />
                        <label className="custom-control-label" htmlFor="light-theme-check">
                            Light
                            </label>
                    </div>

                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="theme"
                            value="dark"
                            id="dark-theme-check"
                            onChange={changeTheme}
                            checked={isDark}
                            disabled={isDetachedLayout || isHorizontalLayout}
                        />
                        <label className="custom-control-label" htmlFor="dark-theme-check">
                            Dark
                            </label>
                    </div>
                </div>
            </div>

            <div className="pl-3">
                <div className="pt-2">
                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="left-sidebar-width"
                            value="fixed"
                            id="left-sidebar-width-fixed"
                            checked={!isCondensed && !isSidebarScrollable}
                            onChange={changeLeftSiderbarType}
                            disabled={isDetachedLayout || isHorizontalLayout}
                        />
                        <label className="custom-control-label" htmlFor="left-sidebar-width-fixed">
                            Fixed (Default)
                            </label>
                    </div>

                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="left-sidebar-width"
                            value="condensed"
                            id="left-sidebar-width-condensed"
                            onChange={changeLeftSiderbarType}
                            checked={isCondensed}
                            disabled={isHorizontalLayout}
                        />
                        <label className="custom-control-label" htmlFor="left-sidebar-width-condensed">
                            Condensed
                            </label>
                    </div>

                    <div className="custom-control custom-switch mb-1">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name="left-sidebar-width"
                            value="scrollable"
                            id="left-sidebar-width-scrollable"
                            onChange={changeLeftSiderbarType}
                            checked={isSidebarScrollable}
                            disabled={isHorizontalLayout}
                        />
                        <label className="custom-control-label" htmlFor="left-sidebar-width-scrollable">
                            Scrollable
                            </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThemeCustomizer;
