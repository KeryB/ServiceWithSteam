import React from 'react';

const SettingsFieldGroup = ({name, value, text, onChange, id, data}) => {

    return (
        <div className="form-group">
            <label htmlFor={id}
                   className="col-sm-2 control-label">{text}</label>
            <div className="col-sm-10">
                <input type="text"
                       value={value}
                       onChange={onChange}
                       placeholder={data}
                       className="form-control"
                       name={name}
                       id={id}/>
            </div>
        </div>
    )
};

SettingsFieldGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.string
};

export default SettingsFieldGroup;
