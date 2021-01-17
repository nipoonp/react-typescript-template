import React, { useState } from "react";
// import assignIds from '../redux/appMenu/utils';
import { appMenuRoutes as routes } from '../routes';
import MenuItem from "./appMenu/models";
import assignIds from './appMenu/utils';


type ContextProps = {
    menuItems: MenuItem[],
    activatedMenuItemIds: number[],
    initMenuAndItems: () => void,
    changeActiveMenuFromLocation: () => void,
};

const AppMenuContext = React.createContext<ContextProps>({
    menuItems: [],
    activatedMenuItemIds: [],
    initMenuAndItems: () => { },
    changeActiveMenuFromLocation: () => { },
});

const AppMenuProvider = (props: { children: React.ReactNode }) => {
    const getActivatedMenuItemIds = (menuItemsList: MenuItem[]): number[] => {
        var matchingItems: number[] = [];
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

    const [menuItems, setMenuItems] = useState<MenuItem[]>(assignIds(routes));
    const [activatedMenuItemIds, setActivatedMenuItemIds] = useState<number[]>(getActivatedMenuItemIds(menuItems));

    const initMenuAndItems = () => {
        const menuItems: MenuItem[] = assignIds(routes);

        setMenuItems(menuItems);
    }

    const changeActiveMenuFromLocation = () => {
        const menuItems: MenuItem[] = assignIds(routes);
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
