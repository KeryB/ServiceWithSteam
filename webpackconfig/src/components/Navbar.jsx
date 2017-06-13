import React from 'react';
import {Link} from 'react-router';
import * as Roles from '../const/PathConstants';

class Navbar extends React.Component {

    render() {
        const auth = this.props.user;
        const user = auth.user;
        console.log(user);
        const userStaff = (
            <ul className="header-nav header-nav-profile">
                <li className="dropdown">
                    <a href="javascript:void(0);" className="dropdown-toggle ink-reaction"
                       data-toggle="dropdown">
                        <img src="../css/material/img/avatar1.jpg?1403934956" alt=""/>
                        <span className="profile-info">
                            {user.nickname}
                            <small>{user.role == Roles.ADMIN && user.role == Roles.SUPERUSER ? user.role : 'Пользователь'}</small>
								</span>
                    </a>
                    <ul className="dropdown-menu animation-dock">
                        <li className="dropdown-header">Свойства</li>
                        <li><a href="../../html/pages/profile.html">Профайл</a></li>
                        <li className="divider"/>
                        <li><a href="../../html/pages/locked.html"><i className="fa fa-fw fa-lock"/>
                            Lock</a></li>
                        <li><a href="#" onClick={this.props.logout} data-toggle="modal" data-target="#formModal"><i
                            className="fa fa-fw fa-power-off text-danger"/> Выйти</a></li>
                    </ul>
                </li>
            </ul>
        );

        const guestsStaff = (
            <ul className="header-nav header-nav-options">

                <li className="link-default">
                    <Link to='/register' href="javascript:void(0);"
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
        );

        return (
            <div className="menubar-hoverable header-fixed menubar-pin ">
                <header id="header">
                    <div className="headerbar">

                        <div className="headerbar-left">
                            <ul className="header-nav header-nav-options">
                                <li className="header-nav-brand">
                                    <div className="brand-holder">
                                        <Link to='/homePage'>
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

                        <div className="headerbar-right">
                            { auth.isAuthenticated ? userStaff : guestsStaff }
                        </div>

                    </div>
                </header>
            </div>
        )
    }
}

export default Navbar;

Navbar.propTypes = {
    user: React.PropTypes.object.isRequired,
    logout:React.PropTypes.func.isRequired
};