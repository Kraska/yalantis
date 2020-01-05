import React, {Component} from "react";

import TabBar from "../components/tabbar/TabBar";
import TabBarItem from "../components/tabbar/TabBarItem";
import './UsersBirthDays.css'


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
        if (users && users.length) {
            return users
                .reduce(
                    (map, user) => {
                        const { dob } = user
                        const month = new Date(dob).toLocaleString("ru", {month: 'long'})
                        return {...map, [month]: map[month] ? [...map[month], user] : [user]}
                    },
                    {}
                )
        }
        return {}
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

        return (
            <TabBar className="vertical" changeByMouseMove>
                {Object.keys(usersMap).map((month) => (
                    <TabBarItem label={month} key={month} navClassName={this.navClassName(usersMap[month].length)}>
                        {this.renderUsers(usersMap[month])}
                    </TabBarItem>
                ))}
            </TabBar>
        )
    }

    navClassName(count) {
        if (count <= 2) return 'grey'
        else if (count > 2 && count <= 6) return 'blue'
        else if (count > 6 && count <= 10) return 'green'
        else return 'red'
    }
}

export default UsersBirthDays;