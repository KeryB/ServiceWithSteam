export function showModal(idModal) {

    return (
        <div>
            <div className="modal fade" id={idModal} tabindex="-1" role="dialog" aria-labelledby="formModalLabel"
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
