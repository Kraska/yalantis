import React from "react";
import * as PropTypes from "prop-types";

const dfOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}


const UserInfo = ({ user: { firstName, lastName, dob }, tag, ...attrs }) => {
    const Tag = tag
    const day = new Date(dob).toLocaleString("ru", dfOptions)
    return (<Tag {...attrs}>{firstName} {lastName} - {day}</Tag>)
}

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    tag: PropTypes.string
}

UserInfo.defaultProps = {
    tag: 'div'
}

export default UserInfo