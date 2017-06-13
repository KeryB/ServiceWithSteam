import React, {Component} from 'react'
import {Link} from 'react-router'

export default class List extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="text-primary">Modals</h2>
                    </div>
                    <div className="col-lg-12">
                        <h4>Examples</h4>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <article className="margin-bottom-xxl">
                            <p>
                                Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults
                            </p>
                        </article>
                    </div>
                    <div className="col-lg-offset-1 col-md-8">
                        <div className="card">
                            <div className="card-body text-center">
                                <button className="btn btn-default-bright btn-raised" data-toggle="modal" data-target="#simpleModal">Simple modal</button>
                                <button className="btn btn-default-bright btn-raised" data-toggle="modal" data-target="#formModal">Form modal</button>
                                <button className="btn btn-default-bright btn-raised" data-toggle="modal" data-target="#textModal">Text modal</button>
                            </div>
                        </div>
                        <em className="text-caption">Click to see the modals</em>
                    </div>
                </div>

                <div className="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="formModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h4 className="modal-title" id="formModalLabel">Login to continue</h4>
                            </div>
                            <form className="form-horizontal" role="form">
                                <div className="modal-body">
                                    <div className="form-group">
                                        <div className="col-sm-3">
                                            <label htmlFor="email1" className="control-label">Email</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="email" name="email1" id="email1" className="form-control"
                                                   placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-3">
                                            <label htmlFor="password1" className="control-label">Password</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="password" name="password1" id="password1"
                                                   className="form-control" placeholder="Password"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-3">
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" id="cb1"/> Remember me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}