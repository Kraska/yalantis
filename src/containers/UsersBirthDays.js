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


    renderUsers(users = []) {
        // console.log(users)
        return <ul>
            {users.map(
                ({ id, firstName, lastName, dob }) =>
                    (<li key={id}>{firstName} {lastName} - {this.formatDate(dob)}</li>)
            )}
        </ul>
    }

    formatDate(dateStr) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return new Date(dateStr).toLocaleString("ru", options)
    }

    render() {
        const usersMap = this.mapByMonth(this.state.users)
        // console.log(usersMap)

        return (
            <TabBar className="vertical" changeByMouseMove>
                {Object.keys(usersMap).map((monthNum) => {

                    const { month } = usersMap[monthNum]
                    const navClassName = this.getColor(usersMap[monthNum].users.length)

                    return (
                        <TabBarItem label={month} key={monthNum} navClassName={navClassName}>
                            {this.renderUsers(usersMap[monthNum].users)}
                        </TabBarItem>
                    )
                })}
            </TabBar>
        )
    }

    getColor(count) {
        if (count <= 2) return 'grey'
        else if (count > 2 && count <= 6) return 'blue'
        else if (count > 6 && count <= 10) return 'green'
        else return 'red'
    }
}

export default UsersBirthDays;