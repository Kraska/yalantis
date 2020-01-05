import React, {Component} from "react";
import classNames from 'classnames'
import * as PropTypes from "prop-types";

import TabBarNav from "./TabBarNav";
import TabBarItem from "./TabBarItem";
import './TabBar.css'


class TabBar extends Component {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    }

    static defaultProps = {
        className: '',
        children: null
    }

    state = {
        activeTab: ''
    }

    componentDidMount() {
        if (this.props.children.length > 0)
            this.setState({ activeTab: this.props.children[0].props.label });
    }


    render() {
        const { children, className, ...attrs } = this.props
        const classes = classNames(className, 'tab-bar')

        return (
            <div className={classes} {...attrs}>
                <div className="tab-bar-nav">{this.renderNav(children)}</div>
                <div className="tab-container">
                    {React.Children.map(
                        children,
                        item => (
                            <TabBarItem
                                key={item.props.label}
                                label={item.props.label}
                                activeTab={this.state.activeTab}
                            >
                                {item.props.children}
                            </TabBarItem>
                        )
                    )}
                </div>
            </div>
        );
    }


    onChangeActiveTab = (activeTab) => {
        const { activeTab: currentTab } = this.state

        if (currentTab !== activeTab) {
            this.setState({activeTab: activeTab})
        }
    }


    renderNav = (children = []) => {

        const { activeTab } = this.state

        return React.Children.map(
            children,
            ({props: {label}}) => (
                <TabBarNav
                    key={label}
                    label={label}
                    className={activeTab === label ? 'active' : ''}
                    onChangeActiveTab={e => this.onChangeActiveTab(label)} />
            )
        )
    }

}

export default TabBar;

