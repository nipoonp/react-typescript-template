// @flow
import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

const SearchDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle
                data-toggle="dropdown"
                tag="a"
                className="nav-link dropdown-toggle arrow-none mr-0"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}>
                <i className="mdi mdi-magnify noti-icon"></i>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-animated topbar-dropdown-menu dropdown-lg">
                <form className="p-3">
                    <input type="text" className="form-control" placeholder="Search ..." />
                </form>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SearchDropdown;
