import React, { Component } from "react";
import Cookie from "js-cookie";
import {
    COOKIE
} from "../../../../constants";
import { connect } from "../socket";

class CabinetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
        };
    }
    componentWillMount() {
        connect(() => {
            this.setState({
                isConnected: true
            });
        });
    }
    onExit(e) {
        e.preventDefault();
        Cookie.remove(COOKIE);
        window.location.href = "/";
    }
    render() {
        let cabinet = <span>Loading...</span>;
        if(this.state.isConnected) {
            cabinet = <span>Connected!</span>
        }
        return (
            <div>
                {cabinet}<br/>
                <button className="btn" onClick={this.onExit.bind(this)}>Выйти</button>
            </div>
        );
    }
}

export default CabinetPage;