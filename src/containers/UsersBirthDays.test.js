import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import usersBirthDays from "./UsersBirthDays";



describe('UsersBirthDays', () => {

    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        global.fetch.mockRestore();
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("API return 1 user => we have 1 tab", async () => {

        const fakeUsers = [{
            id: 'id1',
            firstName: "Joni",
            lastName: " Baez",
            dob: "2019-02-26T16:52:36.244Z"
        }]
        await rendComponent(fakeUsers);

        //console.log(container.querySelector(".tab-bar-item").innerHTML)

        const navItems = container.querySelectorAll(".nav-item")
        expect(navItems.length).toBe(1)
        expect(navItems[0].textContent).toBe("февраль");

        const tabItems = container.querySelectorAll(".tab-bar-item")
        expect(tabItems.length).toBe(1)
        expect(tabItems[0].innerHTML).toBe(JSON.stringify(fakeUsers));

    });


    it("API return 2 users (birth in feb. and sept.) => we have 2 tabs", async () => {

        const febUser = {
            id: "5e00928d91e7feaa9872ec08",
            firstName: "Yang",
            lastName: "Carson",
            dob: "2019-02-26T16:52:36.244Z"
        }
        const septUser = {
            id: "5e00928df892b0c84c82db9d",
            firstName: "Dorsey",
            lastName: "Meadows",
            dob: "2019-09-19T09:34:32.083Z"
        }

        await rendComponent([febUser, septUser]);

        //console.log(container.querySelector(".tab-bar-item").innerHTML)

        const navItems = container.querySelectorAll(".nav-item")
        expect(navItems.length).toBe(2)
        expect(navItems[0].textContent).toBe("февраль");
        expect(navItems[1].textContent).toBe("сентябрь");

        const tabItems = container.querySelectorAll(".tab-bar-item")
        expect(tabItems.length).toBe(2)
        expect(tabItems[0].innerHTML).toBe(JSON.stringify([febUser]));
        expect(tabItems[1].innerHTML).toBe(JSON.stringify([septUser]));

    });

    const rendComponent = async(fakeUsers = []) => {

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUsers)
            })
        );

        const UsersBirthDays = usersBirthDays(StubUsersList)
        await act(async () => {
            render(<UsersBirthDays apiUrl="http://test" />, container);
        });
    }

    const StubUsersList = ({ users }) => {
        return JSON.stringify(users)
    }
});

