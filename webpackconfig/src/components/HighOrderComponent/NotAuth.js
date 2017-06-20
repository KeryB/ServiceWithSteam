import {browserHistory} from 'react-router';
import React from 'react';
import * as path from '../../const/PathConstants';
import {connect} from "react-redux";

export default function (ComposedComponent) {

    class NotAuth extends React.Component {

        componentWillMount(){
            console.log(this.props.auth);
            if(!this.props.auth.isAuthenticated&&!this.props.auth.isFetching){
                browserHistory.push(path.ROOT)
            }
        }
        componentWillReceiveProps(props) {
            if(!props.auth.isAuthenticated){
                console.log(this.props.auth);
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

    NotAuth.propTypes = {
        auth: React.PropTypes.object.isRequired
    };

    function mapStateToProps(state) {
        return {
            auth: state.authenticaton
        }
    }

    return connect(mapStateToProps)(NotAuth);
}