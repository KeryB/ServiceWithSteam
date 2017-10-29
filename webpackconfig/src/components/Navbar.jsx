import React from 'react';
import {Link} from 'react-router';
import * as Roles from '../const/PathConstants';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as searchAction from '../actions/searchAction';
import {createGetUrl, getQueryString, buildUrl} from '../utils/UrlUtils';
import {browserHistory} from 'react-router';
import * as Path from '../const/PathConstants'

let initialState = {
    search: ''
};

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        let path;
        if (this.state.search) {
            this.props.request.searchRequest(this.state);
            path = buildUrl('/search', {
                q: this.state.search
            });
            this.setState(initialState);
            console.log(this.state);
            this.props.appProps.history.replace(path);
        }
    }

    render() {
        const auth = this.props.user;
        const user = auth.user;
        const userStaff = (
            <div>
                <div className="headerbar-right">
                    <ul className="header-nav header-nav-profile">
                        <li className="dropdown">
                            <a href="javascript:void(0);" className="dropdown-toggle ink-reaction"
                               data-toggle="dropdown">
                                <img src="../css/material/img/unknown_user.png" alt=""/>
                                <span className="profile-info">
                            {user.nickname}
                                    <small>{user.role === Roles.ADMIN && user.role === Roles.SUPERUSER ? user.role : 'Пользователь'}</small>
                        </span>
                            </a>
                            <ul className="dropdown-menu animation-dock">
                                <li className="dropdown-header">Свойства</li>
                                <li>
                                    <Link to={`/profile/${user.id}`}>Профайл</Link>
                                </li>
                                <li>
                                    <Link to="/profile/settings">Настройки</Link>
                                </li>
                                <li><a>Создать команду</a></li>
                                <li className="divider"/>
                                <li><a href="../../html/pages/locked.html"><i className="fa fa-fw fa-lock"/>
                                    Lock</a></li>
                                <li><a href="#" onClick={this.props.logout} data-toggle="modal"
                                       data-target="#formModal"><i
                                    className="fa fa-fw fa-power-off text-danger"/> Выйти</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="headerbar-left col-lg-offset-1">
                    <ul className="header-nav header-nav-options">
                        <li>
                            <form onSubmit={this.onSubmit} className="form-horizontal">
                                <input type="text" className="form-control" name="search" onChange={this.onChange}
                                       placeholder="Поиск"/>
                                <button type="submit"
                                        className="btn ink-reaction btn-flat btn-xs btn-primary">
                                    Найти
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        );
        const guestsStaff = (
            <div className="headerbar-right">
                <ul className="header-nav header-nav-options">

                    <li className="line-height-xl">
                        <Link to='/register'
                              className="dropdown-toggle ink-reaction">
                            Регистрация
                        </Link>
                    </li>

                    <li className="link-default">
                        <Link to='/login'>
                            Авторизация
                        </Link>
                    </li>

                </ul>
            </div>
        );
//        console.log('Navbar',user);
        return (
            <div className="menubar-hoverable header-fixed menubar-pin ">
                <header id="header">
                    <div className="headerbar">

                        <div className="headerbar-left">
                            <ul className="header-nav header-nav-options">
                                <li className="header-nav-brand">
                                    <div className="brand-holder">
                                        <Link to='/'>
                                            <span className="text-lg text-bold text-primary">BRAND</span>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <a className="btn btn-icon-toggle menubar-toggle" data-toggle="menubar"
                                       href="javascript:void(0);">
                                        <i className="fa fa-bars"/>
                                    </a>
                                </li>

                            </ul>
                        </div>

                        <div >
                            { auth.isAuthenticated ? userStaff : guestsStaff }
                        </div>

                    </div>
                </header>

            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        request: bindActionCreators(searchAction, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Navbar);

Navbar.propTypes = {
    user: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired,
    appProps: React.PropTypes.object.isRequired
};