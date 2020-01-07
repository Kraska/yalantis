import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import usersBirthDays from "./UsersBirthDays";
import UsersList from "../components/user/UsersList";



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

        await rendComponent([{
            id: 'id1',
            firstName: "Joni",
            lastName: " Baez",
            dob: "2019-02-26T16:52:36.244Z"
        }]);

        const navItems = container.querySelectorAll(".nav-item")
        expect(navItems.length).toBe(1)
        expect(navItems[0].textContent).toBe("февраль");

        const tabItems = container.querySelectorAll(".tab-bar-item")
        expect(tabItems.length).toBe(1)
        expect(tabItems[0].innerHTML).toBe("<ul><li>Joni  Baez - 26 февраля 2019 г.</li></ul>");

    });


    const rendComponent = async(fakeUsers = []) => {

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUsers)
            })
        );

        const UsersBirthDays = usersBirthDays(UsersList)
        await act(async () => {
            render(<UsersBirthDays apiUrl="http://test" />, container);
        });

        // global.fetch.mockRestore();
    }
});

