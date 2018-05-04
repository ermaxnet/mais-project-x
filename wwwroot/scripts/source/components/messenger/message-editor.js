import React, { Component } from "react";
import showdown from "showdown";
import autosize from "autosize";

class MessageEditor extends Component {
    constructor(props) {
        super(props);
        this.converter = new showdown.Converter({
            emoji: true
        });
        this.state = {
            text: "",
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
    escapeMd(value) {
        value = escape(value);
        return unescape(value.replace(/%0A/g, "  %0A"));
    }
    render() {
        return (
            <div 
                className="messenger__editor"
                ref={ref => this.editor = ref}
            >
                <div className="phantom-preview" dangerouslySetInnerHTML={{ __html: this.state.textHTML }}></div>
                <textarea 
                        className="messenger__editor-textarea"
                        name="message" 
                        id="message" 
                        value={this.state.text} 
                        onChange={this.onChange.bind(this)}
                        placeholder="Введите сообщение..."
                        ref={ref => this.textarea = ref}
                    >
                </textarea>
            </div>
        );
    }
}

export default MessageEditor;