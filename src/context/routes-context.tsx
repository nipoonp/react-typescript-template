import React, { useState } from "react";
import { allFlattenRoutes } from '../routes/index';

type ContextProps = {
    routes: any[],
};

const RoutesContext = React.createContext<ContextProps>({
    routes: [],
});

const RoutesProvider = (props: { children: React.ReactNode }) => {
    const [routes, setRoutes] = useState(allFlattenRoutes);

    return (
        <RoutesContext.Provider
            value={{
                routes: routes
            }}
            children={props.children}
        />
    );
};

const useRoutes = () => {
    const context = React.useContext(RoutesContext);
    if (context === undefined) {
        throw new Error(
            `useRoutes must be used within a RoutesProvider`
        );
    }
    return context;
};

export { RoutesProvider, useRoutes };
