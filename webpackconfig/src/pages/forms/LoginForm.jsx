import React, {Component} from 'react';
import {Link} from 'react-router';
import TextFieldGroup from './groups/TextFieldGroup';
import {browserHistory} from 'react-router';
import {api} from '../../actions/api/Api';
import {validateUserSignInPage} from '../../actions/validate';
import {putToken} from '../../utils/tokenManager';
import {setSettings} from '../../utils/Utils';
import {connect} from "react-redux";
import  {updateStatusOfState}  from '../../actions/authAction';
import {login} from '../../actions/authAction';
import {bindActionCreators} from 'redux'
import * as authAction from '../../actions/authAction';
import GoogleLogin from 'react-google-login';

const GOOGLE_CLIENT_ID = '144148076914-ggd8h7aikicheumbfmsqtbv3klpni6cn.apps.googleusercontent.com';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            checkBox: false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    isValid() {
        const {errors, isValid} = validateUserSignInPage(this.state);
        if (!isValid) {
            this.setState({errors: errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}});
            this.props.authAction.makeAuth(this.state);
        }
    }

    componentWillReceiveProps(props) {
        const auth = props.auth;
        if (auth.errors && !auth.isFetching) {
            if (auth.user.status >= 400 && auth.user.status < 500) {
                this.setState({errors: auth.user.data[0]});
                return;
            }
            if (auth.user.status == 15) {
                this.setState({
                    errors: {
                        email: auth.user.message
                    }
                });
                return;
            }
            setSettings(auth.user.message, auth.user.status);
        }
    }
    googleSignIn = (response)=>{
        const token = response.tokenId;
        api('api/auth/google_auth','GET',null).then(responseApi =>{
            console.log(responseApi);
        })
    };

    render() {

        const {errors} = this.state;


        return (
            <div>
                {this.props.auth.isFetching ? <div></div> :
                    <div>
                        <section className="section-account">
                            <div className="container-alt">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="wrapper-page">
                                                <div className="m-t-40 account-pages">

                                                    <div className="text-center">
                                                        <div className="user_avatar">
                                                        </div>
                                                    </div>

                                                    <div className="account-content">
                                                        <form className="form" onSubmit={this.onSubmit}>

                                                            <TextFieldGroup
                                                                name="email"
                                                                value={this.state.email}
                                                                label="email"
                                                                error={errors.email}
                                                                type="text"
                                                                onChange={this.onChange}
                                                                id="inputEmail"
                                                                spanName="md md-email"
                                                            />

                                                            <TextFieldGroup
                                                                name="password"
                                                                value={this.state.password}
                                                                label="password"
                                                                error={errors.password}
                                                                type="password"
                                                                onChange={this.onChange}
                                                                id="inputPassword"
                                                                spanName="glyphicon glyphicon-lock"
                                                            />

                                                            <div className="account-btn">
                                                                <div className="col-lg-5">
                                                                    <button className="btn btn-primary btn-raised"
                                                                            type="submit">
                                                                        Войти
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <br></br>
                                                        </form>
                                                        <div className="form-group m-t-50"></div>
                                                        <div className="m-t-50">
                                                            <div className=" m-t-50">
                                                                <p>
                                                                    <a href="#"
                                                                       className="btn btn-block btn-raised btn-info"><i
                                                                        className="fa fa-facebook pull-left"/>Авторизоваться
                                                                        через фейсбук</a>
                                                                </p>
                                                            </div>

                                                            <p>

                                                                <GoogleLogin clientId={GOOGLE_CLIENT_ID}
                                                                             className="btn btn-block btn-raised btn-info"
                                                                             buttonText=""
                                                                             onSuccess={this.googleSignIn}
                                                                             onFailure={() => {
                                                                             }}
                                                                >
                                                                    <i className="fa fa-google pull-left"/>Авторизоваться
                                                                    через
                                                                    Google
                                                                </GoogleLogin>

                                                            </p>
                                                        </div>
                                                        <div className="form-group m-t-50">
                                                            <div className="col-md-7 col-md-offset-7 ">
                                                                <a href="page-recoverpw.html" className="text-muted"><i
                                                                    className="fa fa-lock m-r-5"/> Забыли пароль?</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row m-t-10">
                                                <div className="col-sm-12 text-center">
                                                    <p className="text-muted">Еще нет аккаунта? <Link
                                                        to='/register'><b className="text-custom">Регистрация</b></Link>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authenticaton
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);