import React, {Component} from "react";

import TabBar from "../components/tabbar/TabBar";
import TabBarItem from "../components/tabbar/TabBarItem";

const PATH = 'https://yalantis-react-school.herokuapp.com/api/task0/users'

class UsersBirthDays extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        fetch(PATH)
            .then(res => res.json())
            .then(users => this.setState({ users: users }))

    }

    mapByMonth(users) {
        let usersMap = {}
        if (users && users.length) {
            usersMap = users
                .reduce(
                    (map, user) => {
                        const { dob } = user
                        const month = new Date(dob).toLocaleString("ru", {month: 'long'})
                        return {...map, [month]: map[month] ? [...map[month], user] : [user]}
                    },
                    {}
                )
        }
        return usersMap
    }

    renderUsers(users = []) {
        // console.log(users)
        return <ul>
            {users.map(({ id, firstName, lastName }) => (<li key={id}>{firstName} {lastName}</li>))}
        </ul>
    }

    render() {
        const usersMap = this.mapByMonth(this.state.users)
        // console.log(usersMap)

        return <TabBar>
            {Object.keys(usersMap)
                .map((month) => (
                    <TabBarItem label={month} key={month}>
                        {this.renderUsers(usersMap[month])}
                    </TabBarItem>
                ))}
        </TabBar>
    }
}

export default UsersBirthDays;