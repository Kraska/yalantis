import React from "react";
import UserInfo from "./UserInfo";
import * as PropTypes from "prop-types";

const UsersList = ({ users, ...attrs }) => {
    return <ul {...attrs}>{users.map(user => <UserInfo user={user} tag="li" key={user.id} />)}</ul>
}

UsersList.propTypes = {
    users: PropTypes.array
}

UsersList.defaultProps = {
    users: []
}

export default UsersList