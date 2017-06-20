import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <div className="error_page_header">
                    <div className="uk-width-8-10 uk-container-center">
                        404!
                    </div>
                </div>
                <div>
                    <div className="uk-width-8-10 uk-container-center">
                        <p className="heading_b">Page not found</p>
                        <p className="uk-text-large">
                            The requested URL <span className="uk-text-muted">/asd</span> was not found on this server.
                            Вернуться на <Link to='/'>главную</Link>?
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}