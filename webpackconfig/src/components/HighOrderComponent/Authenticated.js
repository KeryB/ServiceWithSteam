import React from 'react';
import {connect} from "react-redux";
import {addFlashMessage} from '../../actions/flashMessages';
import {browserHistory} from 'react-router';
import * as path from '../../const/PathConstants';

export default function (ComposedComponent) {

    class Authenticated extends React.Component {

        componentWillMount(props){

        }
        componentWillReceiveProps(props) {
            console.log(props);
            if(props.auth.isAuthenticated){
                browserHistory.push(path.ROOT)
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

    Authenticated.propTypes = {
        auth: React.PropTypes.object.isRequired,
        addFlashMessage: React.PropTypes.func.isRequired
    };

    Authenticated.contextType = {
        router: React.PropTypes.object.isRequired
    };
    function mapStateToProps(state) {
        return {
            auth: state.authenticaton
        }
    }

    return connect(mapStateToProps,{addFlashMessage})(Authenticated);
}