import React, { useState } from "react";
import { useMutation } from "react-query";
import { BASE_URL } from "../constants/constants";

import axios from "axios";

type ContextProps = {
    loginUser: (username: string, password: string) => Promise<any>,
    refreshToken: () => Promise<any>,
    getTenants: () => Promise<any>,
    testAuth: (xTenantGuid: string) => Promise<any>,
    getMenuItems: (xTenantGuid: string) => Promise<any>,
    getTenant: (xTenantGuid: string) => Promise<any>,
    getCaptionSettings: (xTenantGuid: string) => Promise<any>,
    getDropdownSettings: (xTenantGuid: string) => Promise<any>,
};

const APIContext = React.createContext<ContextProps>({
    loginUser: (username: string, password: string) => {
        return new Promise(() => { });
    },
    refreshToken: () => {
        return new Promise(() => { });
    },
    getTenants: () => {
        return new Promise(() => { });
    },
    testAuth: (xTenantGuid: string) => {
        return new Promise(() => { });
    },
    getMenuItems: (xTenantGuid: string) => {
        return new Promise(() => { });
    },
    getTenant: (xTenantGuid: string) => {
        return new Promise(() => { });
    },
    getCaptionSettings: (xTenantGuid: string) => {
        return new Promise(() => { });
    },
    getDropdownSettings: (xTenantGuid: string) => {
        return new Promise(() => { });
    },
});

const APIProvider = (props: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState("");

    // User
    const loginUserMutation = useMutation((payload: { userName: string, password: string }) => axios.post(`${BASE_URL}/User/Login`, payload, {
        withCredentials: true,
        // credentials: 'include',
    }));
    const refreshTokenMutation = useMutation(() => axios.post(`${BASE_URL}/User/RefreshAccessToken`, null, {
        withCredentials: true,
        // credentials: 'include',
    }));
    const getTenantsMutation = useMutation(() => axios.get(`${BASE_URL}/User/GetTenants`, { headers: { Authorization: `Bearer ${accessToken}` } }));
    const testAuthMutation = useMutation((payload: { X_TENANT_GUID: string; }) => axios.get(`${BASE_URL}/User/TestAuth`, { params: payload }));

    //Tenant
    const getMenuItemsMutation = useMutation((payload: { X_TENANT_GUID: string; }) => axios.get(`${BASE_URL}/Tenant/GetMenuItems`));
    const getTenantMutation = useMutation((payload: { X_TENANT_GUID: string; }) => axios.get(`${BASE_URL}/Tenant/GetTenant`, { params: payload }));
    const getCaptionSettingsMutation = useMutation((payload: { X_TENANT_GUID: string; }) => axios.get(`${BASE_URL}/Tenant/GetCaptionSettings`, { params: payload }));
    const getDropdownSettingsMutation = useMutation((payload: { X_TENANT_GUID: string; }) => axios.get(`${BASE_URL}/Tenant/GetDropdownSettings`, { params: payload }));

    const loginUser = (username: string, password: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await loginUserMutation.mutateAsync({ userName: username, password: password });

                setAccessToken(response.data.accessToken);
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    };

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await refreshTokenMutation.mutateAsync();

                setAccessToken(response.data.accessToken);
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    }

    const getTenants = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await getTenantsMutation.mutateAsync();

                resolve(response);
            } catch (e) {
                if (parseInt(e.response.status) == 401) {
                    try {
                        await refreshTokenMutation.mutateAsync();

                        let response = await getTenantsMutation.mutateAsync();

                        resolve(response);
                    } catch (e2) {
                        reject(e2);
                    }
                } else {
                    reject(e);
                }
            }
        });
    };

    const testAuth = (xTenantGuid: string) => {
        return testAuthMutation.mutateAsync({ X_TENANT_GUID: xTenantGuid });
    };

    const getMenuItems = (xTenantGuid: string) => {
        return getMenuItemsMutation.mutateAsync({ X_TENANT_GUID: xTenantGuid });
    };

    const getTenant = (xTenantGuid: string) => {
        return getTenantMutation.mutateAsync({ X_TENANT_GUID: xTenantGuid });
    };

    const getCaptionSettings = (xTenantGuid: string) => {
        return getCaptionSettingsMutation.mutateAsync({ X_TENANT_GUID: xTenantGuid });
    };

    const getDropdownSettings = (xTenantGuid: string) => {
        return getDropdownSettingsMutation.mutateAsync({ X_TENANT_GUID: xTenantGuid });
    };

    return (
        <APIContext.Provider
            value={{
                loginUser: loginUser,
                refreshToken: refreshToken,
                getTenants: getTenants,
                testAuth: testAuth,
                getMenuItems: getMenuItems,
                getTenant: getTenant,
                getCaptionSettings: getCaptionSettings,
                getDropdownSettings: getDropdownSettings
            }}
            children={props.children}
        />
    );
};

const useAPI = () => {
    const context = React.useContext(APIContext);
    if (context === undefined) {
        throw new Error(
            `useAPI must be used within a APIProvider`
        );
    }
    return context;
};

export { APIProvider, useAPI };
