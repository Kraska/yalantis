import React, {Component} from "react";

import TabBar from "../components/tabbar/TabBar";
import TabBarItem from "../components/tabbar/TabBarItem";
import UsersList from "../components/user/UsersList";
import './UsersBirthDays.css'

import * as PropTypes from "prop-types";

const PATH = 'https://yalantis-react-school.herokuapp.com/api/task0/users'

class UsersBirthDays extends Component {

    static propTypes = {
        className: PropTypes.string,
        getColor: PropTypes.func
    }

    static defaultProps = {
        className: '',
        getColor: () => {}
    }

    state = {
        users: []
    }

    componentDidMount() {
        fetch(PATH)
            .then(res => res.json())
            .then(users => this.setState({ users: users }))

    }

    mapByMonth(users) {
        if (users && users.length) {

            return users.reduce(
                (map, user) => {
                    const { dob } = user
                    const month = new Date(dob).toLocaleString("ru", {month: 'long'})
                    const monthNum = new Date(dob).toLocaleString("ru", {month: 'numeric'})

                    const users = map[monthNum] ? [...map[monthNum].users, user] : [user]

                    return {...map, [monthNum]: {month: month, users: users}}
                },
                {}
            )
        }
        return {}
    }


    render() {
        const usersMap = this.mapByMonth(this.state.users)
        const { className, getColor } = this.props

        return (
            <TabBar className={className} changeByMouseMove>
                {Object.keys(usersMap).map((monthNum) => {

                    const { month } = usersMap[monthNum]
                    const navClassName = getColor(usersMap[monthNum].users.length)

                    return (
                        <TabBarItem label={month} key={monthNum} navClassName={navClassName}>
                            <UsersList users={usersMap[monthNum].users} />
                        </TabBarItem>
                    )
                })}
            </TabBar>
        )
    }
}

export default UsersBirthDays;