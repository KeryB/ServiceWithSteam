import React, {Component} from 'react'
import classnames from 'classnames';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            errors: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        this.setState({errors: {}});
        e.preventDefault();
        /*        this.props.userRegistrationRequest(this.state).then(
         ()=>{},
         ({data})=> this.setState({errors:data})
         );*/
        this.setState(this.props.userRegistrationRequest(this.state));
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Регистрация</h1>
                    <div className={classnames("form-group",{'has-error':errors.email})}>
                        <label htmlFor="inputEmail" className="control-label">Email</label>
                        <div>
                            <input type="email" className="form-control" id="inputEmail"
                                   value={this.state.email}
                                   onChange={this.onChange}
                                   name="email"
                                   placeholder="Email"/>
                        </div>
                        {errors.email && <span className="help-block">{errors.email}</span>}
                    </div>
                    <div className={classnames("form-group",{'has-error':errors.password})}>
                        <label htmlFor="inputPassword" className="control-label">Пароль</label>
                        <div >
                            <input type="password" className="form-control" id="inputPassword"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.onChange}
                                   placeholder="Password"/>
                        </div>
                        {errors.password && <span className="help-block">{errors.password}</span>}
                    </div>
                    <div className={classnames("form-group",{'has-error':errors.confirmPassword})}>
                        <label htmlFor="confirmPassword" className="control-label">Подтверждение пароля</label>
                        <div>
                            <input type="password" className="form-control" id="confirmPassword"
                                   name="confirmPassword"
                                   value={this.state.confirmPassword}
                                   onChange={this.onChange}
                                   placeholder="Password Confirm"
                            />
                        </div>
                        {errors.confirmPassword && <span className="help-block">{errors.confirmPassword}</span>}
                    </div>
                    <div className={classnames("form-group",{'has-error':errors.nickname})}>
                        <label htmlFor="nick" className="control-label">Nickname</label>
                        <div>
                            <input type="text" className="form-control" id="nick"
                                   name="nickname"
                                   value={this.state.nickname}
                                   onChange={this.onChange}
                                   placeholder="Nickname"/>
                        </div>
                        {errors.nickname && <span className="help-block">{errors.nickname}</span>}
                    </div>
                    <div className="form-group row">
                        <div>
                            <button type="submit" className="btn btn-primary">Регистрация</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

RegisterForm.propTypes = {
    userRegistrationRequest: React.PropTypes.func.isRequired
};

export default RegisterForm;
