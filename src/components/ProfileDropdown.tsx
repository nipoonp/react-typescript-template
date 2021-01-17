// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

type ProfileMenuItem = {
    label: string,
    icon: string,
    redirectTo: string,
};

type ProfileDropdownProps = {
    menuItems: Array<ProfileMenuItem>,
    profilePic?: any,
    username: string,
    userTitle?: string,
};

const ProfileDropdown = (props: ProfileDropdownProps) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setDropdownOpen(dropdownOpen);
    }

    const profilePic = props.profilePic || null;
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle
                data-toggle="dropdown"
                tag="button"
                className="nav-link dropdown-toggle nav-user arrow-none mr-0"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}>
                <span className="account-user-avatar">
                    <img src={profilePic} className="rounded-circle" alt="user" />
                </span>
                <span>
                    <span className="account-user-name">{props.username}</span>
                    <span className="account-position">{props.userTitle}</span>
                </span>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    {props.menuItems.map((item, i) => {
                        return (
                            <Link
                                to={item.redirectTo}
                                className="dropdown-item notify-item"
                                key={i + '-profile-menu'}>
                                <i className={`${item.icon} mr-1`}></i>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </DropdownMenu>
        </Dropdown>
    );
}

export default ProfileDropdown;
