import React, { Component } from "react";
import PropTypes from "prop-types";
import showdown from "showdown";
import autosize from "autosize";
import { MESSENGER_DO_TYPES } from "../../../../../constants";
import {
    sendRequestOnContact
} from "../../models/contacts";
import {
    sendMessage
} from "../../models/messenger";
import { svgIcon } from "../../functions";

class MessageEditor extends Component {
    static propTypes = {
        systemMessage: PropTypes.string,
        doType: PropTypes.number
    }
    static defaultProps = {
        doType: MESSENGER_DO_TYPES.NONE
    }
    constructor(props) {
        super(props);
        this.converter = new showdown.Converter({
            emoji: true
        });
        this.state = {
            text: this.props.systemMessage || "",
            textHTML: ""
        };
    }
    componentDidMount() {
        this.options = {
            editorHeight: this.editor.offsetHeight,
            maxEditorHeight: 454
        };
        this.options.textareaHeightLimit = Math.ceil(0.4905 * this.options.editorHeight);
        this.options.controlsHeight = this.options.editorHeight - this.options.textareaHeightLimit;
        if(this.controls) {
            this.controls.style.height = `${this.options.controlsHeight - 30}px`;
        }
        this.textareaAutosize();
    }
    textareaAutosize() {
        autosize(this.textarea);
        this.textarea.addEventListener("autosize:resized", () => {
            const textareaHeight = this.textarea.offsetHeight;
            if(textareaHeight < this.options.textareaHeightLimit) { 
                this.editor.style.flexBasis = `${this.options.editorHeight}px`;
                this.editor.style.height = `${this.options.editorHeight}px`;
                return; 
            }
            const overHeight = textareaHeight - this.options.textareaHeightLimit;
            if(overHeight >= 0) {
                let editorHeight = this.options.editorHeight + overHeight;
                if(editorHeight >= this.options.maxEditorHeight) {
                    editorHeight = this.options.maxEditorHeight;
                    this.textarea.style.maxHeight = `${editorHeight - this.options.controlsHeight}px`;
                } else {
                    this.textarea.style.maxHeight = null;
                }
                this.editor.style.flexBasis = `${editorHeight}px`;
                this.editor.style.height = `${editorHeight}px`;
            }
        });
    }
    onChange(e) {
        const value = this.escapeMd(e.target.value);
        const textHTML = this.converter.makeHtml(value);
        this.setState({
            text: value,
            textHTML
        });
    }
    onSend(e) {
        e.preventDefault();
        sendMessage(this.state.text, Date.now());
        this.setState({
            text: "",
            textHTML: ""
        });
    }
    escapeMd(value) {
        value = escape(value);
        return unescape(value.replace(/%0A/g, "  %0A"));
    }
    doSendRequestOnContact(e) {
        e.preventDefault();
        sendRequestOnContact(this.state.text);
        this.setState({
            text: "",
            textHTML: ""
        });
    }
    render() {
        let messengerDo = null;
        switch(this.props.doType) {
            case MESSENGER_DO_TYPES["SEND-CONTAT-REQUEST"]:
                messengerDo = (
                    <div className="messenger__do" ref={ref => this.controls = ref}>
                        <button className="btn btn-primary" onClick={this.doSendRequestOnContact.bind(this)}>Отправить</button>
                    </div>
                );
                break;
            case MESSENGER_DO_TYPES.NONE: {
                messengerDo = (
                    <button type="button" className="message-send" onClick={this.onSend.bind(this)}>
                        <svg className="menu-item__icon icon" dangerouslySetInnerHTML={{ __html: svgIcon("message-send") }}></svg>
                    </button>
                );
            }
        }
        return (
            <div 
                className={`
                    messenger__editor
                    ${this.props.doType === MESSENGER_DO_TYPES.NONE ? " messenger__editor_basic" : ""}
                `}
                ref={ref => this.editor = ref}
            >
                <div className="messenger__active-group">
                    <textarea 
                        className="messenger__editor-textarea"
                        name="message" 
                        id="message" 
                        value={this.state.text} 
                        onChange={this.onChange.bind(this)}
                        placeholder="Введите сообщение..."
                        ref={ref => this.textarea = ref}
                    ></textarea>
                    {messengerDo}
                </div>
            </div>
        );
    }
}

export default MessageEditor;