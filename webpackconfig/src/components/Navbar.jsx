import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
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
                </nav>
            </div>
        )
    }
};