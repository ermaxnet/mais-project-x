import React, { Component } from "react";
import { connect } from "react-redux";
import Screen from "./screen";
import ContactHeader from "./header";

class Messenger extends Component {
    render() {
        const contact = this.props.contact;
        if(!contact) {
            return (
                <Screen className="screen_welcome">
                    <span>Добро пожаловать в Mais Messenger</span>
                    <span>
                        Маленький но гордый чат, который скроет вас от мирских забот, укроет клетчатым пледиком 
                        и, пока будет заваривать вам горячий шоколад, расскажет что же нового произошло у 
                        ваших друзей и коллег.
                    </span>
                </Screen>
            );
        }
        return (
            <div className="messenger">
                <ContactHeader contact={contact} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contact: state.messenger.get("contact")
    };
};
export default connect(mapStateToProps)(Messenger);