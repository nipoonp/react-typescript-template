// @flow
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import SimpleBar from 'simplebar-react';
import { useTheme } from '../context/theme-context';

type RightSideBarProps = {
    title?: string,
    children?: React.ReactNode,
};

const RightSideBar = (props: RightSideBarProps) => {
    const rightBarNodeRef: any = useRef();
    const { hideRightSidebar } = useTheme();

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        }
    }, [])

    const handleClose = (e: any) => {
        e.preventDefault();
        hideRightSidebar();
    };

    const handleOtherClick = (e: any) => {
        if (rightBarNodeRef.current.contains(e.target)) return;
        // else hide the right sidebar
        hideRightSidebar();
    };

    const title = props.title;
    const component = props.children || null;

    return (
        <>
            <SimpleBar style={{ maxHeight: '100%', zIndex: 10000 }}>
                <div className="right-bar" ref={rightBarNodeRef}>
                    <div className="rightbar-title">
                        <Link to="#" className="right-bar-toggle float-right" onClick={handleClose}>
                            <i className="dripicons-cross noti-icon"></i>
                        </Link>
                        <h5 className="m-0">{title}</h5>
                    </div>

                    <div className="rightbar-content">{component}</div>
                </div>
            </SimpleBar>

            <div className="rightbar-overlay"></div>
        </>
    );
}


RightSideBar.defaultProps = {
    title: 'Right Sidebar'
};

export default RightSideBar;
