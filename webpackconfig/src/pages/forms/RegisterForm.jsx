import React, {Component} from 'react'
import {Link} from 'react-router';
import {validateUserSignUpPage} from '../../actions/validate';
import TextFieldGroup from './groups/TextFieldGroup'
import {api} from '../../actions/api/Api';
import {putToken} from '../../utils/tokenManager'
import {browserHistory} from 'react-router';
import {setSettings} from '../../utils/Utils';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as authAction from '../../actions/authAction';
import { addFlashMessage} from '../../actions/flashMessages';
import * as flashMessagesType from '../../utils/UtilsFlashMessages';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            checkBox: false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onchangeCheckBox = this.onchangeCheckBox.bind(this);
    }

    isValid() {
        const {errors, isValid} = validateUserSignUpPage(this.state);
        if (!isValid) {
            console.log('ВАЛИДАЦИЯ В REGISTERFORM');
            this.setState({errors: errors});
        }
        return isValid;
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}});
            api('/api/auth/registration', 'POST', this.state).then(response => {
                if (response.result[0].token) {
                    putToken(response.result[0].token);
                    this.props.addFlashMessage({
                        type: flashMessagesType.SUCCESS,
                        text: 'Вы успешно зарегистрировались в системе'
                    });
                    browserHistory.push('/homePage');
                }
            }, error => {
                if (error.status >= 400 && error.status < 500) {
                    this.setState({errors: error.data[0]});
                    console.log(this.state);
                    return;
                }
                if (error.status == 38) {
                    this.setState({
                        errors: {
                            email: error.message
                        }
                    });
                    return;
                }
                setSettings(error.message,error.status)
            })
        }
    }

    onchangeCheckBox(e) {
        if (this.state.checkBox) {
            this.setState({checkBox: false});
        } else {
            this.setState({checkBox: true});
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
                                                        name='email'
                                                        value={this.state.email}
                                                        label='email'
                                                        error={errors.email}
                                                        onChange={this.onChange}
                                                        id='inputEmail'
                                                        spanName='md md-email fa-lg'
                                                    />


                                                    <TextFieldGroup
                                                        name="password"
                                                        value={this.state.password}
                                                        label="Пароль"
                                                        error={errors.password}
                                                        type="password"
                                                        onChange={this.onChange}
                                                        id="inputPassword"
                                                        spanName="glyphicon glyphicon-lock"/>

                                                    <TextFieldGroup
                                                        name="confirmPassword"
                                                        value={this.state.confirmPassword}
                                                        label="Подтверждение пароля"
                                                        error={errors.confirmPassword}
                                                        type="password"
                                                        onChange={this.onChange}
                                                        id="confirmPassword"
                                                        spanName="fa fa-unlock fa-lg"/>

                                                    <TextFieldGroup
                                                        name="nickname"
                                                        value={this.state.nickname}
                                                        label="NickName"
                                                        error={errors.nickname}
                                                        type="text"
                                                        onChange={this.onChange}
                                                        id="nick"
                                                        spanName="mdi md-account-box md-lg"/>

                                                    <div className="row col-md-offset-1">
                                                        <div className="checkbox checkbox-styled">
                                                            <label >
                                                                <input type="checkbox"
                                                                       name="checkBox"
                                                                       value={this.state.checkBox}
                                                                       onChange={this.onchangeCheckBox}
                                                                />
                                                                <span>Согласен с <a href="#" className="text-primary"> правилами сайта</a></span>
                                                            </label>
                                                        </div>
                                                        {errors.checkBox &&
                                                        <span
                                                            className="text-danger col-md-offset-1">{errors.checkBox}</span>}
                                                    </div>
                                                    <div className="">
                                                        <div className="row ">
                                                            <div className="account-btn col-md-12">
                                                                <button
                                                                    className="btn btn-raised btn-primary ink-reaction"
                                                                    type="submit">
                                                                    Регистрация
                                                                </button>
                                                            </div>
                                                            <div className="m-t-20"></div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <br/>
                                            </div>
                                        </div>
                                        <div className="row m-t-20">
                                            <div className="col-sm-12 text-center">
                                                <p className="text-muted">Уже есть аккаунт?<Link to='/login'
                                                   className="text-primary m-l-5"><b>Авторизоваться</b></Link>
                                                </p>
                                            </div>
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
RegisterForm.propTypes = {
    addFlashMessage: React.PropTypes.func.isRequired
};

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

export default connect(mapStateToProps,{mapDispatchToProps,addFlashMessage})(RegisterForm);
