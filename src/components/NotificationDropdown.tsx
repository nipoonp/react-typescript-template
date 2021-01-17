// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import SimpleBar from 'simplebar-react';

const notificationHideContainerStyle = {
    maxHeight: '230px',
    display: 'none',
};

const notificationShowContainerStyle = {
    maxHeight: '230px',
};

type NotificationContainerStyle = {
    maxHeight: string
    display?: string
}

type NotificationItem = {
    id: number,
    text: string,
    subText: string,
    icon: string,
    bgColor: string,
};

type NotificationDropdownProps = {
    notifications: Array<NotificationItem>,
};

const NotificationDropdown = (props: NotificationDropdownProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationContainerStyle, setNotificationContainerStyle] = useState<NotificationContainerStyle>(notificationHideContainerStyle);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setNotificationContainerStyle(notificationContainerStyle === notificationContainerStyle
            ? notificationShowContainerStyle
            : notificationHideContainerStyle);
    }

    const getRedirectUrl = (item: NotificationItem) => {
        return `/notification/${item.id}`;
    };

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle
                data-toggle="dropdown"
                tag="button"
                className="nav-link dropdown-toggle arrow-none btn btn-link"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}>
                <i className="mdi mdi-bell-outline noti-icon"></i>
                <span className="noti-icon-badge"></span>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-animated dropdown-lg">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-item noti-title">
                        <h5 className="m-0">
                            <span className="float-right">
                                <Link to="/notifications" className="text-dark">
                                    <small>Clear All</small>
                                </Link>
                            </span>
                                Notification
                            </h5>
                    </div>
                    <SimpleBar style={notificationContainerStyle}>
                        {props.notifications.map((item, i) => {
                            return (
                                <Link
                                    to={getRedirectUrl(item)}
                                    className="dropdown-item notify-item"
                                    key={i + '-noti'}>
                                    <div className={`notify-icon bg-${item.bgColor}`}>
                                        <i className={item.icon}></i>
                                    </div>
                                    <p className="notify-details">
                                        {item.text}
                                        <small className="text-muted">{item.subText}</small>
                                    </p>
                                </Link>
                            );
                        })}
                    </SimpleBar>

                    <Link to="/" className="dropdown-item text-center text-primary notify-item notify-all">
                        View All
                        </Link>
                </div>
            </DropdownMenu>
        </Dropdown>
    );
}

NotificationDropdown.defaultProps = {
    notifications: [],
};

export default NotificationDropdown;
