import React, { Component } from "react";
import showdown from "showdown";
import { Editor, EditorState } from "draft-js";

class MessageEditor extends Component {
    constructor(props) {
        super(props);
        this.converter = new showdown.Converter({
            emoji: true
        });
        this.state = {
            text: EditorState.createEmpty(),
            textHTML: ""
        };
        console.log(this.state.text);
    }
    onChange(state) {
        /*const textHTML = this.converter.makeHtml(e.target.value);
        this.setState({
            text: e.target.value,
            textHTML
        });*/
        console.log(state.getCurrentContent());
        this.setState({
            text: state
        });
    }
    render() {
        return (
            <div className="messenger__editor">
                <Editor editorState={this.state.text} onChange={this.onChange.bind(this)} />
            </div>
        );
    }
}

export default MessageEditor;