// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MetisMenu from 'metismenujs/dist/metismenujs';
import {MenuItemWithChildren, MenuItem} from './AppMenu';

/**
 * Renders the application menu
 */
// type Props = {
//     initMenu: PropTypes.func,
//     changeActiveMenuFromLocation: PropTypes.func,
//     menu: PropTypes.object,
//     mode: string,
//     history: PropTypes.object,
// };
class AppMenu extends Component {
    menuRef = null;
    openedMenuItems = [];

    // static defaultProps = {
    //     mode: 'vertical',
    // };

    componentDidMount = () => {
        if (!this.props.menu.menuItems) this.props.initMenu();
        else this.initMenu();

        this.props.history.listen((location, action) => {
            console.log("I am here");
            // hide menus in mobile
            if (document.body) {
                document.body.classList.remove('sidebar-enable');
            }

            if (this.menuRef && this.openedMenuItems && this.openedMenuItems.length) {
                for (const el of this.openedMenuItems) {
                    this.menuRef.hide(el);
                }
                this.openedMenuItems = [];
            }
            this.props.changeActiveMenuFromLocation();
        });
    };

    componentDidUpdate = prevProps => {
        if (
            !prevProps.menu.menuItems ||
            (prevProps.menu.menuItems && prevProps.menu.menuItems !== this.props.menu.menuItems)
        ) {
            this.initMenu();
        }

        if (!this.props.menu.activatedMenuItemIds) {
            this.props.changeActiveMenuFromLocation();
        }
    };

    initMenu() {
        if (this.props.mode === 'horizontal') {
            const menuRef = new MetisMenu('#menu-bar').on('shown.metisMenu', event => {
                this.openedMenuItems.push(event.detail.shownElement);
                const menuClick = e => {
                    if (!event.target.contains(e.target)) {
                        menuRef.hide(event.detail.shownElement);
                        window.removeEventListener('click', menuClick);
                    }
                };
                window.addEventListener('click', menuClick);
            });
            this.menuRef = menuRef;
        } else {
            this.menuRef = new MetisMenu('#menu-bar');
        }
    }

    render() {
        const isHorizontal = this.props.mode === 'horizontal';
        var activatedKeys = isHorizontal
            ? []
            : this.props.menu
                ? this.props.menu.activatedMenuItemIds
                    ? this.props.menu.activatedMenuItemIds
                    : []
                : [] || [];

        /**
         * Horizontal layout - We are controlling how many menu items can be displayed in it
         */
        let menuItems = this.props.menu && this.props.menu.menuItems ? this.props.menu.menuItems : [];
        const defaultDisplayedItems = window.screen.width > 1366 ? 7 : 5;

        if (isHorizontal && menuItems.length > defaultDisplayedItems) {
            const displayedItems = menuItems.slice(0, defaultDisplayedItems);
            const otherItems = {
                id: menuItems.length + 1,
                path: '/',
                name: 'More',
                icon: 'uil-ellipsis-h',
                children: menuItems.slice(7, menuItems.length),
            };
            menuItems = [...displayedItems, otherItems];
        }

        return (
            <React.Fragment>
                <div className={classNames({ 'topbar-nav': isHorizontal })}>
                    {this.props.menu && menuItems && menuItems.length ? (
                        <ul className="metismenu side-nav" id="menu-bar">
                            {menuItems.map((item, i) => {
                                return (
                                    <React.Fragment key={item.id}>
                                        <React.Fragment>
                                            {item.header && !isHorizontal && (
                                                <li className="side-nav-title side-nav-item" key={i + '-el'}>
                                                    {item.header}
                                                </li>
                                            )}

                                            {item.children ? (
                                                <MenuItemWithChildren
                                                    item={item}
                                                    subMenuClassNames="side-nav-second-level"
                                                    activatedMenuItemIds={activatedKeys}
                                                    linkClassNames="side-nav-link"
                                                />
                                            ) : (
                                                    <MenuItem
                                                        item={item}
                                                        className={classNames({
                                                            'mm-active': activatedKeys.indexOf(item.id) >= 0,
                                                        })}
                                                        linkClassName="side-nav-link"
                                                    />
                                                )}
                                        </React.Fragment>
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}

export default AppMenu;