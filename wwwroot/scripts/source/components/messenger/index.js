import React, { Component } from "react";
import PropTypes from "prop-types";
import Screen from "./screen";
import ContactHeader from "./header";
import MessageEditor from "./editor";
import MessengerHistory from "./history";
import {
    emitGetIntoMessages
} from "../../models/messenger";
import {
    CONTACT_STATUSES_COD,
    MESSAGE_TYPE
} from "../../../../../constants";
import Contact from "../../../../../models/contact";

class Messenger extends Component {
    static propTypes = {
        options: PropTypes.object.isRequired,
        contact: PropTypes.instanceOf(Contact)
    }
    componentWillReceiveProps({ contact, options }) {
        if((contact && this.props.contact && this.props.contact.id === contact.id) 
            || (options && (!options.id || options.messagesWasLoaded))) 
        {
            return;
        }
        emitGetIntoMessages(contact.contactId);
    }
    get messages() {
        return this.props.options.messages;
    }
    get isDone() {
        return this.props.options.messagesWasLoaded;
    }
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
        let body = null;
        if(this.isDone) {
            switch(contact.settings.status) {
                case CONTACT_STATUSES_COD.CREATED:
                    body = (
                        <MessengerHistory type={MESSAGE_TYPE.INTRO} messages={this.messages} />
                    );
                    break;
            }
        } else {
            body = <span>Loading...</span>;
        }
        return (
            <div className="messenger">
                <ContactHeader contact={contact} />
                {body}
            </div>
        );
    }
}

export default Messenger;