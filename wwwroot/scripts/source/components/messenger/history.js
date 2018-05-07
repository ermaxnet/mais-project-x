import React from "react";
import PropTypes from "prop-types";
import Message from "../../../../../models/message";
import { connect } from "react-redux";
import MessageRegular from "../message/message-regular";
import MessageIntro from "../message/message-intro";
import { MESSAGE_TYPE } from "../../../../../constants";

const MessengerHistory = props => {
    const messages = props.messages;
    let list = null;
    if(messages.length === 0) {
        list = <span>Ваша история переписки с этим контактом пуста. Срочно напишите здесь о погоде!</span>;
    } else {
        switch(props.type) {
            case MESSAGE_TYPE.INTRO:
                list = <MessageIntro message={messages[0]} />;
                break;
            case MESSAGE_TYPE.REGULAR:
                list = messages.map(message => 
                    <MessageRegular key={message.id} message={message} />);
                break;
        }
    }
    return (
        <div className="messenger__history">
            {list}
        </div>
    );
};

MessengerHistory.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.instanceOf(Message)).isRequired,
    type: PropTypes.number.isRequired
};
const mapStateToProps = state => {
    return {
        messages: state.messenger.get("messages").toJS()
    };
};
export default connect(mapStateToProps)(MessengerHistory);