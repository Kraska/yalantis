import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";

import "./UserInfo.css";


const dfOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}


const UserInfo = ({ user: { firstName, lastName, dob }, tag, className, ...attrs }) => {
    const Tag = tag
    const day = new Date(dob).toLocaleString("ru", dfOptions)
    const classes = classNames('user-info', className)

    return (
        <Tag className={classes} {...attrs}>
            <span className="user-name">{firstName} {lastName}</span>
            <span className="date">{day}</span>
        </Tag>
    )
}

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    tag: PropTypes.string
}

UserInfo.defaultProps = {
    tag: 'div'
}

export default UserInfo