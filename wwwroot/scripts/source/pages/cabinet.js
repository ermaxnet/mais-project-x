import React, { Component } from "react";
import Cookie from "js-cookie";
import {
    COOKIE
} from "../../../../constants";
import { connect as socketConnect } from "../socket";
import { connect } from "react-redux";
import {
    updateUser
} from "../models/cabinet";

class CabinetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
        };
    }
    componentWillMount() {
        socketConnect(() => {
            this.setState({
                isConnected: true
            });
            updateUser({ id: 2 });
        });
    }
    onExit(e) {
        e.preventDefault();
        Cookie.remove(COOKIE);
        window.location.href = "/";
    }
    render() {
        console.log(this.props.user);
        let cabinet = <span>Loading...</span>;
        if(this.state.isConnected) {
            cabinet = <span>Connected!</span>;
        }
        return (
            <div>
                {cabinet}<br/>
                <button className="btn" onClick={this.onExit.bind(this)}>Выйти</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.cabinet.get("user")
    }
};
export default connect(mapStateToProps)(CabinetPage);