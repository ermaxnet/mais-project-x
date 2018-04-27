import React, { Component } from "react";
import Cookie from "js-cookie";
import {
    COOKIE
} from "../../../../constants";
import { connect as socketConnect } from "../socket";
import { connect } from "react-redux";
import CabinetHeader from "../components/cabinet/header";
import MenuItem from "../components/cabinet/menu-item";

class CabinetPage extends Component {
    componentWillMount() {
        socketConnect();
    }
    onExit(e) {
        e.preventDefault();
        Cookie.remove(COOKIE);
        window.location.href = "/";
    }
    listContact() {

    }
    render() {
        let cabinet = <span>Loading...</span>;
        if(this.props.isConnected) {
            cabinet = (
                <>
                    <div className="cabinet">
                        <aside className="cabinet__aside">
                            <CabinetHeader user={this.props.user} />
                            <ul className="cabinet__menu">
                                <MenuItem key="contacts" icon="contact" onClick={this.listContact.bind(this)} />
                                <MenuItem key="exit" icon="exit" onClick={this.onExit.bind(this)} className="to-end" />
                            </ul>
                        </aside>
                        <main className="cabinet__content">
                            <div>
                                <button className="btn" onClick={this.onExit.bind(this)}>Выйти</button>
                            </div>
                        </main>
                    </div>
                </>
            );
        }
        return (
            <>
                {cabinet}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.cabinet.get("user"),
        isConnected: state.cabinet.get("isConnected")
    };
};
export default connect(mapStateToProps)(CabinetPage);