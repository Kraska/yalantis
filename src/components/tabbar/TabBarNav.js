import React from "react";
import './TabBarNav.css';
import classNames from 'classnames';
import * as PropTypes from "prop-types";


const TabBarNav = ({ label, className, onChangeActiveTab }) => {

    const classes = classNames(className, 'nav-item')

    return <button
                type="button"
                className={classes}
                onClick={e => onChangeActiveTab(label)}
            >
                {label}
            </button>
}

TabBarNav.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChangeActiveTab: PropTypes.func
}

TabBarNav.defaultProps = {
    classNames: '',
    onChangeActiveTab: () => {}
}

export default TabBarNav;