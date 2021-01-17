import React, { useState } from "react";
import {
    LAYOUT_DETACHED,
    LAYOUT_HORIZONTAL,
    LAYOUT_VERTICAL,
    LAYOUT_WIDTH_FLUID,
    LEFT_SIDEBAR_THEME_DEFAULT,
    LEFT_SIDEBAR_TYPE_FIXED,
    LEFT_SIDEBAR_TYPE_SCROLLABLE,
} from '../constants/layout';


// ADD THIS BACK WHEN CHANGED TO TYPESCRIPT
// type ContextProps = {
//     login: () => void;
// };

// const ThemeContext = React.createContext<ContextProps>({
//     login: () => { },
// });


const ThemeContext = React.createContext({
    layoutType: "",
    layoutWidth: "",
    leftSideBarTheme: "",
    leftSideBarType: "",
    isRightSidebarVisible: false,
    changeLayout: (layout: string) => { },
    changeLayoutWidth: (width: string) => { },
    changeLeftSidebarTheme: (theme: string) => { },
    changeLeftSidebarType: (type: string) => { },
    toggleRightSidebar: () => { },
    showRightSidebar: () => { },
    hideRightSidebar: () => { },
});

const ThemeProvider = (props: { children: React.ReactNode }) => {
    const [layoutType, setLayoutType] = useState(LAYOUT_VERTICAL);
    const [layoutWidth, setLayoutWidth] = useState(LAYOUT_WIDTH_FLUID);
    const [leftSideBarTheme, setLftSideBarTheme] = useState(LEFT_SIDEBAR_THEME_DEFAULT);
    const [leftSideBarType, setLeftSideBarType] = useState(LEFT_SIDEBAR_TYPE_FIXED);
    const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);

    const changeBodyAttribute = (attribute: string, value: string) => {
        if (document.body) document.body.setAttribute(attribute, value);
        return true;
    }

    const manageBodyClass = (cssClass: string, action = 'toggle') => {
        switch (action) {
            case 'add':
                if (document.body) document.body.classList.add(cssClass);
                break;
            case 'remove':
                if (document.body) document.body.classList.remove(cssClass);
                break;
            default:
                if (document.body) document.body.classList.toggle(cssClass);
                break;
        }

        return true;
    }

    const changeLayout = (layout: string) => {
        setLayoutType(layout);
        changeBodyAttribute('data-layout', layout);

        if (layout === LAYOUT_VERTICAL) {
            changeLeftSidebarTheme(LEFT_SIDEBAR_THEME_DEFAULT);
            changeLeftSidebarType(LEFT_SIDEBAR_TYPE_FIXED);
        }

        if (layout === LAYOUT_HORIZONTAL) {
            changeLeftSidebarTheme(LEFT_SIDEBAR_THEME_DEFAULT);
            changeLeftSidebarType(LEFT_SIDEBAR_TYPE_FIXED);
        }

        if (layout === LAYOUT_DETACHED) {
            changeLayoutWidth(LAYOUT_WIDTH_FLUID);
            changeLeftSidebarType(LEFT_SIDEBAR_TYPE_SCROLLABLE);
            changeLeftSidebarTheme(LEFT_SIDEBAR_THEME_DEFAULT);
        }
    }

    const changeLayoutWidth = (width: string) => {
        setLayoutWidth(width);
        changeBodyAttribute('data-layout-mode', width);
    }

    const changeLeftSidebarTheme = (theme: string) => {
        setLftSideBarTheme(theme);
        changeBodyAttribute('data-leftbar-theme', theme);
    }

    const changeLeftSidebarType = (type: string) => {
        setLeftSideBarType(type);
        changeBodyAttribute('data-leftbar-compact-mode', type);
    }

    const toggleRightSidebar = () => {
        setIsRightSidebarVisible(!isRightSidebarVisible);
        manageBodyClass('right-bar-enabled');
    }

    const showRightSidebar = () => {
        setIsRightSidebarVisible(true);
        manageBodyClass('right-bar-enabled', 'add');
    }

    const hideRightSidebar = () => {
        setIsRightSidebarVisible(false);
        manageBodyClass('right-bar-enabled', 'remove');
    }

    return (
        <ThemeContext.Provider
            value={{
                layoutType: layoutType,
                layoutWidth: layoutWidth,
                leftSideBarTheme: leftSideBarTheme,
                leftSideBarType: leftSideBarType,
                isRightSidebarVisible: isRightSidebarVisible,
                changeLayout: changeLayout,
                changeLayoutWidth: changeLayoutWidth,
                changeLeftSidebarTheme: changeLeftSidebarTheme,
                changeLeftSidebarType: changeLeftSidebarType,
                toggleRightSidebar: toggleRightSidebar,
                showRightSidebar: showRightSidebar,
                hideRightSidebar: hideRightSidebar,
            }}
            children={props.children}
        />
    );
};

const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error(
            `useTheme must be used within a ThemeProvider`
        );
    }
    return context;
};

export { ThemeProvider, useTheme };
