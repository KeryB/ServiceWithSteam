"use strict";
import * as React from "react";

export default class Modal extends React.Component {
    static MODAL_CONFIRM_SHOW_EVENT = 'MODAL_CONFIRM:SHOW';
    constructor() {
        super();
        this.height = '30%';
        this.width = '100%';
        $(document).on(Modal.MODAL_CONFIRM_SHOW_EVENT, $.proxy(this.show, this));
        this.state = {
            header: null, text: null, height: this.height, width: this.width, callback: () => {
            }
        };
    }
    componentWillUnmount() {
        $(document).off(Modal.MODAL_CONFIRM_SHOW_EVENT);
    }

    show(event, data) {
        $('#Modal').modal();
        this.setState({
            header: typeof data.header === 'undefined' ? '' : data.header,
            callback: typeof data.callback === 'function' ? data.callback : () => {
                },
            text: typeof data.text === 'undefined' ? '' : data.text,
            height: typeof data.height === 'undefined' ? this.height : data.height,
            width: typeof data.width === 'undefined' ? this.width : data.width
        });
    }

    render() {
        console.log(this.props);
        let header = this.state.header,
            text = this.state.text;
        return <div className="modal fade"
                    id="modal_confirm"
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                    style={{display: 'none', paddingRight: '15px', zIndex: '1062'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{backgroundColor: '#ff5722'}}>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 className="modal-title">{header}</h4>
                    </div>
                    <div className="modal-body">
                        {text}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn ripple btn-flat btn-default"
                                data-dismiss="modal">
                            Отмена
                        </button>
                        <button
                            onClick={this.state.callback}
                            data-dismiss="modal"
                            type="button" className="btn ripple btn-flat btn-danger">
                            Подтвердить
                        </button>
                    </div>
                </div>
            </div>
        </div>;
    }
}