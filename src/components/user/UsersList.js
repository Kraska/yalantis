import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";

import UserInfo from "./UserInfo";
import "./UsersList.css";


const UsersList = ({ users, className, ...attrs }) => {
    const classes = classNames('users-list', className)
    return <ul className={classes} {...attrs}>{users.map(user => <UserInfo user={user} tag="li" key={user.id} />)}</ul>
}

UsersList.propTypes = {
    users: PropTypes.array
}

UsersList.defaultProps = {
    users: []
}

export default UsersList