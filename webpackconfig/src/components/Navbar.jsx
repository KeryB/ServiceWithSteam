import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Navbar extends Component {

    /*<nav className="navbar navbar-inverse">
     <div className="container-fluid">
     <div className="navbar-header">
     <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
     data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
     </button>
     <div className="navbar-brand">
     <Link to='/homePage'>ServiceSteam</Link>
     </div>
     </div>

     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

     <ul className="nav navbar-nav navbar-right">
     <ul className='nav nav-pills'>
     <li><Link to='/list'>Список жанров</Link></li>
     <li><Link to='/register'>Регистрация</Link></li>
     <li><Link to='/login'>Авторизация</Link></li>
     </ul>
     </ul>

     </div>
     </div>
     </nav>*/
    render() {
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

                                <li>

                                    <form className="navbar-search" role="search">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="headerSearch"
                                                   placeholder="Enter your keyword"/>
                                        </div>
                                        <button type="submit" className="btn btn-icon-toggle ink-reaction"><i
                                            className="fa fa-search"/></button>
                                    </form>
                                </li>

                                <li className="dropdown hidden-xs">
                                    <a href="javascript:void(0);" className="btn btn-icon-toggle btn-default"
                                       data-toggle="dropdown">
                                        <i className="fa fa-bell"/><sup className="badge style-danger">4</sup>
                                    </a>
                                    <ul className="dropdown-menu animation-expand">
                                        <li className="dropdown-header">Today's messages</li>
                                        <li>
                                            <a className="alert alert-callout alert-warning" href="javascript:void(0);">
                                                <img className="pull-right img-circle dropdown-avatar"
                                                     src="../../assets/img/avatar2.jpg?1404026449" alt=""/>
                                                <strong>Alex Anistor</strong><br/>
                                                <small>Testing functionality...</small>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="alert alert-callout alert-info" href="javascript:void(0);">
                                                <img className="pull-right img-circle dropdown-avatar"
                                                     src="../../assets/img/avatar3.jpg?1404026799" alt=""/>
                                                <strong>Alicia Adell</strong><br/>
                                                <small>Reviewing last changes...</small>
                                            </a>
                                        </li>
                                        <li className="dropdown-header">Options</li>
                                        <li><a href="../../html/pages/login.html">View all messages <span
                                            className="pull-right"><i className="fa fa-arrow-right"/></span></a></li>
                                        <li><a href="../../html/pages/login.html">Mark as read <span
                                            className="pull-right"><i
                                            className="fa fa-arrow-right"/></span></a></li>
                                    </ul>
                                </li>

                            </ul>


                            <ul className="header-nav header-nav-profile">
                                <li className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle ink-reaction"
                                       data-toggle="dropdown">
                                        <img src="../css/material/img/avatar1.jpg?1403934956" alt=""/>
                                        <span className="profile-info">
									Daniel Johnson
									<small>Administrator</small>
								</span>
                                    </a>
                                    <ul className="dropdown-menu animation-dock">
                                        <li className="dropdown-header">Config</li>
                                        <li><a href="../../html/pages/profile.html">My profile</a></li>
                                        <li><a href="../../html/pages/blog/post.html">My blog <span
                                            className="badge style-danger pull-right">16</span></a></li>
                                        <li><a href="../../html/pages/calendar.html">My appointments</a></li>
                                        <li className="divider"/>
                                        <li><a href="../../html/pages/locked.html"><i className="fa fa-fw fa-lock"/>
                                            Lock</a></li>
                                        <li><a href="../../html/pages/login.html"><i
                                            className="fa fa-fw fa-power-off text-danger"/> Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    </div>
                </header>
            </div>
        )
    }
};