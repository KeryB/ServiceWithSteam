import React, {Component} from 'react';
import {Link} from 'react-router';
import TextFieldGroup from './groups/TextFieldGroup';
import {browserHistory} from 'react-router';
import {api} from '../../actions/api/Api';
import {validateUserSignInPage} from '../../actions/validate';
import {putToken} from '../../utils/tokenManager';
import {setSettings} from '../../utils/Utils';
import {connect} from "react-redux";
import  {updateStatusOfState }  from '../../actions/authAction';
import  jwt  from 'jsonwebtoken';
import {login} from '../../actions/authAction';

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

    isValid(){
        const{errors,isValid} = validateUserSignInPage(this.state);
        if(!isValid){
            this.setState({errors:errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()){
            this.setState({errors:{}});
            api('/api/auth/createAuthToken', 'POST', this.state).then(response => {
                console.log(response);
                if (response.result[0].token) {
                    putToken(response.result[0].token);
                    this.props.login();
                    browserHistory.push('/homePage');
                }
            }, error => {
                if (error.status >= 400 && error.status < 500) {
                    this.setState({errors: error.data[0]});
                    console.log(this.state);
                    return;
                }
                if (error.status == 15) {
                    this.setState({
                        errors: {
                            email: error.message
                        }
                    });

                    return;
                }
                setSettings(error.message,error.status);
            })
        }
    }


    render() {
        const {errors} = this.state;
        return (
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
                                                            <a href="#" className="btn btn-block btn-raised btn-info"><i
                                                                className="fa fa-facebook pull-left"/>Авторизоваться
                                                                через фейсбук</a>
                                                        </p>
                                                    </div>

                                                    <p>
                                                        <a href="#" className="btn btn-block btn-raised btn-info"><i
                                                            className="fa fa-google pull-left"/>Авторизоваться через
                                                            Google</a>
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
        )
    }
}

LoginForm.propTypes ={
  login:React.PropTypes.func.isRequired
};

export default connect(null,{login})(LoginForm);