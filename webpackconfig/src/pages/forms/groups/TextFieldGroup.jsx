import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({name, value, label, error, type, onChange,id,spanName}) => {

    return (
        <div className="form-group floating-label">
            <div className="input-group">
                <span className="input-group-addon"><span
                    className={spanName}/></span>
                <div
                    className={classnames("input-group-content", {'has-error': error})}>
                    <input
                        type={type}
                        className="form-control"
                        id={id}
                        value={value}
                        onChange={onChange}
                        name={name}
                    />
                    <label htmlFor={id}>{label}</label>
                </div>
            </div>
            {error &&
            <span
                className="text-danger col-md-offset-1">{error}</span>}
        </div>
    )
};

TextFieldGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    spanName: React.PropTypes.string.isRequired
};
TextFieldGroup.defaultProps = {
    type: 'text'
};
export default TextFieldGroup;