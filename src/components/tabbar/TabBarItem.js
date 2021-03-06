import React from "react";
import classNames from 'classnames';

import './TabBarItem.css'
import * as PropTypes from "prop-types";


const TabBarItem = ({ children, label, activeTab, ...attrs }) => {

    const classes = classNames(
        'tab-bar-item',
        {active : label === activeTab}
    )

    return <div className={classes} {...attrs}>{children}</div>
}

TabBarItem.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    activeTab: PropTypes.string
}

TabBarItem.defaultProps = {
    children: null,
    activeTab: ''
}

export default TabBarItem;