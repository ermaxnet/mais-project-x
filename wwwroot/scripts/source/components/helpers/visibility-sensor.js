import React, { Component } from "react";

class VisibilitySensor extends Component {
    get style() {
        return {
            position: "absolute", 
            width: "100%", 
            height: "100%",
            top: 0,
            left: 0,
            visibility: "hidden"
        };
    }
    get container() {
        let container = document.getElementsByClassName(this.props.className)[0];
        if(container) {
            container = container.firstChild;
        } else {
            container = window;
        }
        return container;
    }
    constructor(props) {
        super(props);
        this.events = { };
        this.state = {
            isVisible: false
        };
    }
    componentDidMount() {
        this.onCheck(true);
        this.componentAttach();
    }
    componentWillUnmount() {
        this.componentDetach();
    }
    componentAttach() {
        let timer;
        const done = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                this.onCheck();
            }, 50);
        };
        const event = {
            handler: done
        };
        this.container.addEventListener("scroll", event.handler);
        this.events["scroll"] = event;
    }
    componentDetach() {
        this.container.removeEventListener("scroll", this.events["scroll"].handler);
    }
    onCheck(setup = false) {
        const containerRect = this.container.getBoundingClientRect();
        const elementRect = this.sensor.getBoundingClientRect();
        const isVisible = (elementRect.top >= containerRect.top) 
            && (elementRect.left >= containerRect.left) 
            && (elementRect.bottom <= containerRect.bottom) 
            && (elementRect.right <= containerRect.right);
        const onChange = this.props.onChange;
        if(typeof onChange !== "function") { return; }
        if(this.state.isVisible !== isVisible) {
            this.setState({ isVisible });
            onChange(isVisible, this.props.name);
        } else if(setup) {
            onChange(this.state.isVisible, this.props.name);
        }
    }
    render() {
        return (
            <div style={this.style} ref={ref => this.sensor = ref}></div>
        );
    }
};

export default VisibilitySensor;