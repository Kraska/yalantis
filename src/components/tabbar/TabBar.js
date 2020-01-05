import React, {Component} from "react";
import classNames from 'classnames'
import * as PropTypes from "prop-types";

import TabBarNav from "./TabBarNav";
import TabBarItem from "./TabBarItem";
import './TabBar.css'


class TabBar extends Component {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        changeByMouseMove: PropTypes.bool
    }

    static defaultProps = {
        className: '',
        children: null,
        changeByMouseMove: false
    }

    state = {
        activeTab: ''
    }

    componentDidMount() {
        if (this.props.children.length > 0)
            this.setState({ activeTab: this.props.children[0].props.label });
    }


    render() {
        const { children, className, changeByMouseMove, ...attrs } = this.props
        const classes = classNames(className, 'tab-bar')

        return (
            <div className={classes} {...attrs}>
                <div className="tab-bar-nav">{this.renderNav(children, changeByMouseMove)}</div>
                <div className="tab-container">
                    {React.Children.map(
                        children,
                        item => {
                            const { label } = item.props
                            const { activeTab } = this.state
                            return (
                                <TabBarItem key={label} label={label} activeTab={activeTab}>
                                    {item.props.children}
                                </TabBarItem>
                            )
                        }
                    )}
                </div>
            </div>
        );
    }


    onClick = (activeTab) => {
        if (this.state.activeTab !== activeTab) {
            this.setState({activeTab: activeTab})
        }
    }

    onMouseOver = (activeTab) => {
        this.setState({activeTab: activeTab})
    }

    onMouseOut = (activeTab) => {
        if (this.state.activeTab === activeTab) {
            this.setState({activeTab: null})
        }
    }


    renderNav = (children, changeByMouseMove = false) => {

        const { activeTab } = this.state

        return React.Children.map(
            children,
            ({ props: { label, navClassName } }) => {

                const classes = classNames(
                    activeTab === label ? 'active' : '',
                    navClassName
                )

                return (
                    <TabBarNav
                        key={label}
                        label={label}
                        className={classes}
                        onClick={ changeByMouseMove ? e => {} : e => this.onClick(label) }
                        onMouseOver={ changeByMouseMove ? e => this.onMouseOver(label) : e => {} }
                        onMouseOut={ changeByMouseMove ? e => this.onMouseOut(label) : e => {} }
                    />
                )
            }
        )
    }

}

export default TabBar;

