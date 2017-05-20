import React, {Component} from 'react';
import {Link} from 'react-router';

export default class LoginForm extends Component {
    render() {
        return (
            <div className="login_page">
                <div className="login_page_wrapper">
                    <div className="md-card" id="login_card">
                        <div className="md-card-content large-padding" id="login_form">
                            <div className="login_heading">
                                <div className="user_avatar"></div>
                            </div>
                            <form>
                                <div className="uk-form-row">
                                    <label htmlFor="login_username">Username</label>
                                    <input className="md-input" type="text" id="login_username"
                                           name="login_username"/>
                                </div>

                                <div className="uk-form-row">
                                    <label htmlFor="login_password">Password</label>
                                    <input className="md-input" type="password" id="login_password"
                                           name="login_username"/>
                                </div>

                                <div className="uk-margin-medium-top">
                                    <a href="#" className="md-btn md-btn-primary md-btn-block md-btn-large">Sign
                                        In</a>
                                </div>
                                <div className="uk-grid uk-grid-width-1-3 uk-grid-small uk-margin-top">
                                    <div><a href="#" className="md-btn md-btn-block md-btn-facebook"
                                            data-uk-tooltip="{pos:'bottom'}" title="Sign in with Facebook"><i
                                        className="uk-icon-facebook uk-margin-remove"/></a></div>
                                    <div><a href="#" className="md-btn md-btn-block md-btn-twitter"
                                            data-uk-tooltip="{pos:'bottom'}" title="Sign in with Twitter"><i
                                        className="uk-icon-twitter uk-margin-remove"/></a></div>
                                    <div><a href="#" className="md-btn md-btn-block md-btn-gplus"
                                            data-uk-tooltip="{pos:'bottom'}" title="Sign in with Google+"><i
                                        className="uk-icon-google-plus uk-margin-remove"/></a></div>
                                </div>
                                <div className="uk-margin-top">
                                    <a href="#" id="login_help_show" className="uk-float-right">Need help?</a>
                                    <span className="icheck-inline">
                                            <input type="checkbox" name="login_page_stay_signed"
                                                   id="login_page_stay_signed"
                                                   data-md-icheck/>
                                            <label htmlFor="login_page_stay_signed" className="inline-label">Stay signed in</label>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="uk-text-center">
                        <Link to='/register'>Создать аккаунт</Link>
                    </div>
                </div>
            </div>
        )
    }
}