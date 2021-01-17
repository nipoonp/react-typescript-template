// @flow
import React, { useEffect, useRef } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import classNames from 'classnames';
// TODO: Added this line to ignore the error for now
// @ts-ignore
import MetisMenu from 'metismenujs/dist/metismenujs';

// import { initMenu, changeActiveMenuFromLocation } from '../redux/actions';
import { useAppMenu } from '../context/appMenu-context';

type MenuItemWithChildrenProps = {
    item: any,
    linkClassNames: string,
    activatedMenuItemIds: string[],
    subMenuClassNames: string,
}

const MenuItemWithChildren = (props: MenuItemWithChildrenProps) => {
    const { item, linkClassNames, subMenuClassNames } = props;

    return (
        <li
            className={classNames('side-nav-item', {
                'mm-active': props.activatedMenuItemIds.indexOf(item.id) >= 0,
                active: props.activatedMenuItemIds.indexOf(item.id) >= 0,
            })}>
            <Link
                to="#"
                className={classNames('has-arrow', 'side-sub-nav-link', linkClassNames)}
                aria-expanded={props.activatedMenuItemIds.indexOf(item.id) >= 0}>
                {item.icon && <i className={item.icon}></i>}
                {item.badge && (
                    <span className={`badge badge-${item.badge.variant} float-right`}>{item.badge.text}</span>
                )}
                <span> {item.name} </span>
            </Link>

            <ul
                className={classNames(subMenuClassNames, 'mm-collapse', {
                    'mm-collapsed mm-show': props.activatedMenuItemIds.indexOf(item.id) >= 0,
                })}
                aria-expanded={props.activatedMenuItemIds.indexOf(item.id) >= 0}>
                {item.children.map((child: any, i: any) => {
                    return (
                        <div key={i} >
                            {
                                child.children ? (
                                    <MenuItemWithChildren
                                        item={child}
                                        linkClassNames=""
                                        activatedMenuItemIds={props.activatedMenuItemIds}
                                        subMenuClassNames="side-nav-third-level"
                                    />
                                ) : (
                                        <MenuItem
                                            item={child}
                                            className={classNames({ 'mm-active': props.activatedMenuItemIds.indexOf(child.id) >= 0 })}
                                            linkClassName=""
                                        />
                                    )
                            }
                        </div>
                    );
                })}
            </ul>
        </li >
    );
};

type MenuItemProps = {
    item: any,
    className: string,
    linkClassName: string
}

const MenuItem = (props: MenuItemProps) => {
    const { item, className, linkClassName } = props;

    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink item={item} className={linkClassName} />
        </li>
    );
};

type MenuItemLinkProps = {
    item: any,
    className: string
}

const MenuItemLink = (props: MenuItemLinkProps) => {
    const { item, className } = props;

    return (
        <Link to={item.path} className={classNames('side-nav-link-ref', 'side-sub-nav-link', className)}>
            {item.icon && <i className={item.icon}></i>}
            {item.badge && <span className={`badge badge-${item.badge.variant} float-right`}>{item.badge.text}</span>}
            <span> {item.name} </span>
        </Link>
    );
};

/**
 * Renders the application menu
 */
type AppMenuProps = {
    // initMenu: PropTypes.func,
    // changeActiveMenuFromLocation: PropTypes.func,
    // menu: PropTypes.object,
    mode: string,
    // history: PropTypes.object,
};

const AppMenu = (props: AppMenuProps) => {
    const {
        menuItems: propsMenuItems,
        activatedMenuItemIds,
        initMenuAndItems,
        changeActiveMenuFromLocation,
    } = useAppMenu();
    const history = useHistory();

    const menuRef: any = useRef(null);
    let openedMenuItems: any = [];

    useEffect(() => {
        if (propsMenuItems.length == 0) {
            initMenuAndItems();
        } else {
            initMenu();
        }

        history.listen((location, action) => {
            // hide menus in mobile
            if (document.body) {
                document.body.classList.remove('sidebar-enable');
            }

            if (menuRef && menuRef.current && openedMenuItems && openedMenuItems.length) {
                for (const el of openedMenuItems) {
                    menuRef.current.hide(el);
                }
                openedMenuItems = [];
            }
            changeActiveMenuFromLocation();
        });
    }, []);


    // useEffect(() => {
    //     // initMenu();
    // }, [propsMenuItems]);

    useEffect(() => {
        if (!activatedMenuItemIds) {
            changeActiveMenuFromLocation();
        }
    }, [activatedMenuItemIds]);

    const initMenu = () => {
        if (props.mode === 'horizontal') {
            menuRef.current = new MetisMenu('#menu-bar').on('shown.metisMenu', (event: any) => {
                openedMenuItems.push(event.detail.shownElement);
                const menuClick = (e: any) => {
                    if (!event.target.contains(e.target)) {
                        menuRef.current.hide(event.detail.shownElement);
                        window.removeEventListener('click', menuClick);
                    }
                };
                window.addEventListener('click', menuClick);
            });
        } else {
            menuRef.current = new MetisMenu('#menu-bar');
        }
    }

    const isHorizontal = props.mode === 'horizontal';
    var activatedKeys: any = isHorizontal
        ? []
        : propsMenuItems
            ? activatedMenuItemIds
                ? activatedMenuItemIds
                : []
            : [] || [];

    /**
     * Horizontal layout - We are controlling how many menu items can be displayed in it
     */
    let menuItems: any = propsMenuItems ? propsMenuItems : [];
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
        <>
            <div className={classNames({ 'topbar-nav': isHorizontal })}>
                {propsMenuItems && menuItems && menuItems.length ? (
                    <ul className="metismenu side-nav" id="menu-bar">
                        {menuItems.map((item: any, i: any) => {
                            return (
                                <div key={item.id}>
                                    <>
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
                                    </>
                                </div>
                            );
                        })}
                    </ul>
                ) : null}
            </div>
        </>
    );
}

AppMenu.defaultProps = {
    mode: 'vertical',
};

export default AppMenu;