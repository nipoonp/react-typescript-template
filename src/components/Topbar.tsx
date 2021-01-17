// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LanguageDropdown from './LanguageDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import SearchDropdown from './SearchDropdown';
import TopbarSearch from './TopbarSearch';

import profilePic from '../assets/images/users/avatar-1.jpg';
import logoSm from '../assets/images/logo_sm.png';
import logo from '../assets/images/logo-light.png';
import { useTheme } from '../context/theme-context';

const Notifications = [
    {
        id: 1,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 2,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 3,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 4,
        text: 'Caleb Flakelar commented on Admin',
        subText: '2 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger',
    },
    {
        id: 5,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 6,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 7,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 8,
        text: 'Caleb Flakelar commented on Admin',
        subText: '2 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger',
    },
];

const ProfileMenus = [
    {
        label: 'My Account',
        icon: 'uil uil-user',
        redirectTo: '/',
    },
    {
        label: 'Settings',
        icon: 'uil uil-cog',
        redirectTo: '/',
    },
    {
        label: 'Support',
        icon: 'uil uil-life-ring',
        redirectTo: '/',
    },
    {
        label: 'Lock Screen',
        icon: 'uil uil-lock-alt',
        redirectTo: '/',
    },
    {
        label: 'Logout',
        icon: 'uil uil-exit',
        redirectTo: '/account/logout',
    },
];

// dummy search results
const SearchResults = [
    {
        id: 1,
        title: 'Analytics Report',
        icon: 'uil-notes',
        redirectTo: '/'
    },
    {
        id: 2,
        title: 'How can I help you?',
        icon: 'uil-life-ring',
        redirectTo: '/'
    },
    {
        id: 3,
        icon: 'uil-cog',
        title: 'User profile settings',
        redirectTo: '/'
    }, {
        id: 4,
        icon: 'uil-user',
        title: 'Erwin Brown (UI)',
        redirectTo: '/'
    },
    {
        id: 5,
        icon: 'uil-user',
        title: 'Jacob Deo (Dev)',
        redirectTo: '/'
    }
];

type TopbarProps = {
    hideLogo?: boolean,
    navCssClasses?: string,
    openLeftMenuCallBack?: () => void,
};

const Topbar = (props: TopbarProps) => {
    const { showRightSidebar } = useTheme();

    const handleRightSideBar = () => {
        showRightSidebar();
    };

    const hideLogo = props.hideLogo || false;
    const navCssClasses = props.navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

    return (
        <>
            <div className={`navbar-custom ${navCssClasses}`}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <Link to="/" className="topnav-logo">
                            <span className="topnav-logo-lg">
                                <img src={logo} alt="logo" height="16" />
                            </span>
                            <span className="topnav-logo-sm">
                                <img src={logoSm} alt="logo" height="16" />
                            </span>
                        </Link>
                    )}

                    <ul className="list-unstyled topbar-right-menu float-right mb-0">
                        <li className="notification-list topbar-dropdown d-lg-none">
                            <SearchDropdown />
                        </li>
                        <li className="notification-list topbar-dropdown">
                            <button
                                className="nav-link dropdown-toggle arrow-none btn btn-link"
                                onClick={handleRightSideBar}>
                                <i className="mdi mdi-settings-outline noti-icon"></i>
                            </button>
                        </li>
                        <li className="notification-list topbar-dropdown d-none d-lg-block">
                            <LanguageDropdown />
                        </li>
                        <li className="notification-list">
                            <NotificationDropdown notifications={Notifications} />
                        </li>
                        <li className="notification-list">
                            <ProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={'Dominic Keller'}
                                userTitle={'Founder'}
                            />
                        </li>
                    </ul>

                    <button
                        className="button-menu-mobile open-left disable-btn"
                        onClick={props.openLeftMenuCallBack}>
                        <i className="mdi mdi-menu"></i>
                    </button>

                    <TopbarSearch items={SearchResults} />
                </div>
            </div>
        </>
    );
}

export default Topbar;
