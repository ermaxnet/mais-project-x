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
    MESSAGE_TYPE,
    MESSENGER_DO_TYPES
} from "../../../../../constants";
import Contact from "../../../../../models/contact";
import Message from "../../../../../models/message";

class Messenger extends Component {
    static propTypes = {
        options: PropTypes.object.isRequired,
        contact: PropTypes.instanceOf(Contact)
    }
    componentWillReceiveProps({ contact, options }) {
        if(!contact) { return; }
        switch(contact.settings.status) {
            case CONTACT_STATUSES_COD.CREATED: {
                if((this.props.contact && this.props.contact.id === contact.id) 
                    || (options && (!options.id || options.messagesWasLoaded))) 
                {
                    return;
                }
                emitGetIntoMessages(contact.contactId);
                break;
            }
        }
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
                case CONTACT_STATUSES_COD.FINDED:
                    const message = new Message({
                        id: Date.now().toString(),
                        updatedAt: Date.now(),
                        text: "Вы можете отправить этому страннику нашей сети призыв добавить вас в свой список контактов.  \nНапишите ему пару строк от себя, ему будет приятно.",
                        isRead: true,
                        type: MESSAGE_TYPE.SYSTEM,
                        isInbox: true,
                        senderId: -1
                    });
                    body = (
                        <>
                            <MessengerHistory type={MESSAGE_TYPE.SYSTEM} messages={[ message ]} />
                            <MessageEditor 
                                doType={MESSENGER_DO_TYPES["SEND-CONTAT-REQUEST"]}
                                systemMessage={`### Здравствуйте, ${contact.item.first_name}.  \n Я хотел бы добавить вас в свой список контактов.  \n`} 
                            />
                        </>
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