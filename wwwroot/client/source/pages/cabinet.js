import React, { Component } from "react";
import Cookie from "js-cookie";
import {
    COOKIE,
    MaisAPI
} from "../../../../constants";

class CabinetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    componentWillMount() {
        fetch(MaisAPI["USER"], {
            method: "GET",
            credentials: "include",
            mode: "cors"
        })
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                this.setState({
                    user: response.user
                });
            }
        });
    }
    onExit(e) {
        e.preventDefault();
        Cookie.remove(COOKIE);
        window.location.href = "/";
    }
    render() {
        let user = null;
        if(this.state.user) {
            console.log(this.state.user);
            user = <div>{this.state.user.nick}</div>
        }
        return (
            <div>
                {user}
                <button className="btn" onClick={this.onExit.bind(this)}>Выйти</button>
            </div>
        );
    }
}

export default CabinetPage;