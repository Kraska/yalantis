import React from "react";
import './TabBarNav.css';
import classNames from 'classnames';
import * as PropTypes from "prop-types";


const TabBarNav = ({ label, className, onClick, onMouseOver, onMouseOut }) => {

    const classes = classNames(className, 'nav-item')

    return <button
                type="button"
                className={classes}
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                {label}
            </button>
}

TabBarNav.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func
}

TabBarNav.defaultProps = {
    classNames: '',
    onClick: () => {},
    onMouseOver: () => {},
    onMouseOut: () => {}
}

export default TabBarNav;