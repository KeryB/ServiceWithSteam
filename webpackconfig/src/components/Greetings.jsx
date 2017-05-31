import { deleteFlashMessage } from '../actions/flashMessages'
import React, {Component} from 'react'
import {connect} from "react-redux";


class Greetings extends Component {
    render() {
        const {deleteFlashMessage} = this.props;
        console.log(this.props.messages);
        const message = this.props.messages;
        if (message[0]) {
            toastr.options.closeButton = true;
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.newestOnTop = false;
            toastr.success(message[0].text);
            deleteFlashMessage({id:message[0].id});
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
    deleteFlashMessage: React.PropTypes.func.isRequired
};
export default connect(mapStateToProps,{deleteFlashMessage})(Greetings);