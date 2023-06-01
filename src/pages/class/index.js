import React from "react";

export default class ReactClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        console.log('constructor-------------1');
    }

    componentWillMount() {
        console.log('componentWillMount-------------2');
    }

    componentDidMount() {
        console.log('componentDidMount-------------3');
    }

    // componentWillReceiveProps() {
    //     console.log('componentWillReceiveProps-------------4');
    // }

    componentWillUpdate() {
        console.log('componentWillUpdate-------------5');
    }

    render() {
        return (
            <div>生命周期</div>
        )
    }
}