import React, { useState } from "react";
// import assignIds from '../redux/appMenu/utils';
import { appMenuRoutes as routes } from '../routes';
import assignIds from './appMenu/utils';


// ADD THIS BACK WHEN CHANGED TO TYPESCRIPT
// type ContextProps = {
//     login: () => void;
// };

// const AppMenuContext = React.createContext<ContextProps>({
//     login: () => { },
// });


const AppMenuContext = React.createContext({
    menuItems: [],
    activatedMenuItemIds: [],
    initMenuAndItems: () => { },
    changeActiveMenuFromLocation: () => { },
});

const AppMenuProvider = (props: { children: React.ReactNode }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [activatedMenuItemIds, setActivatedMenuItemIds] = useState([]);

    const getActivatedMenuItemIds = (menuItemsList: any[]): any => {
        var matchingItems = [];
        for (var menuItem of menuItemsList) {
            if (window.location.pathname.indexOf(menuItem.path) === 0) {
                matchingItems.push(menuItem.id);
            }

            if (typeof menuItem.children !== 'undefined') {
                matchingItems = [...matchingItems, ...getActivatedMenuItemIds(menuItem.children)];
            }
        }

        return matchingItems;
    };

    const initMenuAndItems = () => {
        const menuItems = assignIds(routes);

        setMenuItems(menuItems);
    }

    const changeActiveMenuFromLocation = () => {
        const menuItems = assignIds(routes);
        const activatedMenuItemIds = getActivatedMenuItemIds(menuItems);

        setActivatedMenuItemIds(activatedMenuItemIds);
    }

    return (
        <AppMenuContext.Provider
            value={{
                menuItems: menuItems,
                activatedMenuItemIds: activatedMenuItemIds,
                initMenuAndItems: initMenuAndItems,
                changeActiveMenuFromLocation: changeActiveMenuFromLocation,
            }}
            children={props.children}
        />
    );
};

const useAppMenu = () => {
    const context = React.useContext(AppMenuContext);
    if (context === undefined) {
        throw new Error(
            `useAppMenu must be used within a AppMenuProvider`
        );
    }
    return context;
};

export { AppMenuProvider, useAppMenu };
