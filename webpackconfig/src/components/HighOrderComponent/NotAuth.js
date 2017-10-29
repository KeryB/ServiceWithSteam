import {browserHistory} from 'react-router';
import React from 'react';
import * as path from '../../const/PathConstants';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as flashMessages from "../../actions/flashMessages";

export default function (ComposedComponent) {

    class NotAuth extends React.Component {

        componentWillMount(){
            console.log(this.props.auth);
            if(!this.props.auth.isAuthenticated&&!this.props.auth.isFetching){
                this.props.flashMessage.addFlashMessage({
                    type: "warning",
                    text: "Чтобы зайти на данный ресурс, вам нужно авторизоваться"
                });
                browserHistory.push(path.LOGIN)
            }
        }
        componentWillReceiveProps(props) {
            if(!props.auth.isAuthenticated){
                console.log(this.props.auth);
                this.props.flashMessage.addFlashMessage({
                    type: "warning",
                    text: "Чтобы зайти на данный ресурс, вам нужно авторизоваться"
                });
                browserHistory.push(path.LOGIN)
            }
        }

        render() {

            return (
                <div>
                    <ComposedComponent {...this.props}/>
                </div>
            )
        }
    }

    NotAuth.propTypes = {
        auth: React.PropTypes.object.isRequired
    };

    function mapStateToProps(state) {
        return {
            auth: state.authenticaton
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            flashMessage: bindActionCreators(flashMessages,dispatch)
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(NotAuth);
}