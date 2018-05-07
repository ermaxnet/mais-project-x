import React, { Component } from "react";
import LoginFrom from "../components/forms/login";
import RegisterForm from "../components/forms/register";
import { Redirect } from "react-router-dom";
import { 
    WELCOME_PAGE_STATE,
    MaisAPI,
    COOKIE
} from "../../../../constants";
import User from "../../../../models/user";
import Cookie from "js-cookie";

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: WELCOME_PAGE_STATE.LOGIN,
            username: "Eremin_MY",
            password: "VegasmaN17FacebooK111",
            password2: "",
            isPzk: true,
            firstName: "",
            lastName: "",
            email: ""
        };
    }
    changeView(e, viewMode) {
        if(e) { e.preventDefault(); }
        this.setState({ 
            viewMode,  
            username: "",
            password: ""
        });
    }
    onRegister(e) {
        e.preventDefault();
        fetch(MaisAPI["AUTH.CREATE"], {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            body: `id=0&username=${this.state.username}&hash=${this.state.password}&first_name=${this.state.firstName}&last_name=${this.state.lastName}&email=${this.state.email}`,
            mode: "cors"
        })
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                Cookie.set(COOKIE, response.token, { expires: 1 });
                return window.location.href = "/cabinet";
            }
            console.error(response.error);
        });
    }
    onLogin(e) {
        e.preventDefault();
        const method = this.state.isPzk
            ? MaisAPI["AUTH.TOKEN-PZK"]
            : MaisAPI["AUTH.TOKEN-MAIS"];
        fetch(method, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            body: `username=${this.state.username}&password=${this.state.password}`,
            mode: "cors"
        })
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                Cookie.set(COOKIE, response.token, { expires: 1 });
                return window.location.href = "/cabinet";
            }
            console.error(response.error);
        });
    }
    onInput(e) {
        const target = e.target;
        switch(target.type) {
            case "password":
            case "email":
            case "text":
                this.setState({ 
                    [target.name]: target.value
                });
                break;
            case "checkbox":
                this.setState({ 
                    [target.name]: target.checked
                });
                break;
        }
    }
    render() {
        if(Cookie.get(COOKIE)) {
            return <Redirect to="/cabinet" />;
        }
        let widget = null;
        switch(this.state.viewMode) {
            case WELCOME_PAGE_STATE.LOGIN:
                widget = 
                    <LoginFrom 
                        changeView={this.changeView.bind(this)} 
                        onInput={this.onInput.bind(this)}
                        username={this.state.username}
                        password={this.state.password}
                        isPzk={this.state.isPzk}
                        onLogin={this.onLogin.bind(this)}
                    />;
                break;
            case WELCOME_PAGE_STATE.REGISTER:
                widget = 
                    <RegisterForm 
                        changeView={this.changeView.bind(this)} 
                        onInput={this.onInput.bind(this)}
                        username={this.state.username}
                        password={this.state.password}
                        password2={this.state.password2}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        onRegister={this.onRegister.bind(this)}
                    />
                break;
        }
        return (
            <>
                <header className="header">
                    <div className="header__logo">
                        <span className="header__logo-image"></span>
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