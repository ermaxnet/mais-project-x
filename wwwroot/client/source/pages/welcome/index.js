import React, { Component } from "react";
import LoginFrom from "../../components/forms/login";
import RegisterForm from "../../components/forms/register";
import { 
    WELCOME_PAGE_STATE
} from "../../../../../constants";
import User from "../../../../../models/user";

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: WELCOME_PAGE_STATE.LOGIN,
            user: new User({ id: 0 })
        };
    }
    changeView(e, viewMode) {
        if(e) { e.preventDefault(); }
        this.setState({ viewMode });
    }
    render() {
        let widget = null;
        switch(this.state.viewMode) {
            case WELCOME_PAGE_STATE.LOGIN:
                widget = <LoginFrom changeView={this.changeView.bind(this)} />;
                break;
            case WELCOME_PAGE_STATE.REGISTER:
                widget = <RegisterForm changeView={this.changeView.bind(this)} />
                break;
        }
        return (
            <>
                <header className="header">
                    <div className="header__logo">
                        <span>mais messenger</span>
                    </div>
                </header>
                <main className="content">
                    <div className="widget">
                        {widget}
                    </div>
                </main>
            </>
        );
    }
}

export default WelcomePage;