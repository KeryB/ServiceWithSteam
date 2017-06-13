import { deleteFlashMessage } from '../actions/flashMessages'
import React, {Component} from 'react'
import {connect} from "react-redux";
import {successRegistration} from '../utils/Utils';


class Greetings extends Component {
    render() {
        console.log(this.props.messages);
        const message = this.props.messages;
        if (message[0]) {
            successRegistration(message[0].text);
        }
        return (<div></div>)
    }

}
function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

Greetings.PropTypes = {
    messages: React.PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(Greetings);