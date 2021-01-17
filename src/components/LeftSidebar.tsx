// @flow
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import SimpleBar from 'simplebar-react';

import logoSm from '../assets/images/logo_sm.png';
import logoDark from '../assets/images/logo-dark.png';
import logoDarkSm from '../assets/images/logo_sm_dark.png';
import logo from '../assets/images/logo.png';
import profileImg from '../assets/images/users/avatar-1.jpg';

import AppMenu from './AppMenu';

type SideBarContentProps = {
    // menuClickHandler?: () => void,
    isLight: boolean,
    hideUserProfile: boolean,
};

const SideBarContent = (props: SideBarContentProps) => {
    return (
        <>
            {!props.hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/">
                        <img src={profileImg} alt="" height="42" className="rounded-circle shadow-sm" />
                        <span className="leftbar-user-name">Dominic Keller</span>
                    </Link>
                </div>
            )}

            {/* <AppMenu menuClickHandler={menuClickHandler} /> */}
            <AppMenu />
        </>
    );
};

type LeftSidebarProps = {
    // menuClickHandler?: () => void,
    hideLogo?: boolean,
    hideUserProfile?: boolean,
    isLight?: boolean,
    isCondensed: boolean,
};

const LeftSidebar = (props: LeftSidebarProps) => {
    const menuNodeRef: any = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        }
    }, [])

    const handleOtherClick = (e: any) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    /**
     * Handle click
     * @param {*} e
     * @param {*} item
     */
    /*:: handleClick: () => void */
    const handleClick = (e: {}) => {
        console.log(e);
    }

    const isCondensed = props.isCondensed || false;
    const isLight = props.isLight || false;
    const hideLogo = props.hideLogo || false;
    const hideUserProfile = props.hideUserProfile || false;

    return (
        <>
            <div className="left-side-menu" ref={menuNodeRef}>
                {!hideLogo && (<>
                    <Link to="/" className="logo text-center logo-light">
                        <span className="logo-lg">
                            <img src={isLight ? logoDark : logo} alt="logo" height="16" />
                        </span>
                        <span className="logo-sm">
                            <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="16" />
                        </span>
                    </Link>

                    <Link to="/" className="logo text-center logo-dark">
                        <span className="logo-lg">
                            <img src={isLight ? logoDark : logo} alt="logo" height="16" />
                        </span>
                        <span className="logo-sm">
                            <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="16" />
                        </span>
                    </Link>
                </>
                )}

                {!isCondensed && (
                    <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                        <SideBarContent
                            // menuClickHandler={handleClick}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                        />
                    </SimpleBar>
                )}
                {isCondensed && (
                    <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />
                )}
            </div>
        </>
    );
}

export default LeftSidebar;
