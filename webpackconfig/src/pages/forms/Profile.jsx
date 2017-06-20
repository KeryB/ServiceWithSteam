import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";
import {toBase64} from "../../utils/Utils";
import {bindActionCreators} from "redux";
import * as authAction from '../../actions/authAction';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(e) {
        e.preventDefault();
        const file = document.getElementById("fileUpload").files;
        toBase64(file, (data) => {
            this.setState({image: data.result});
            this.props.authAction.updateUserData(this.state)
        });
//        this.props.authAction.updateUserData(this.state);
        /*        BBASe(file,(data)=>{
         console.log(data);
         });*/
    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const userPayload = this.props.auth;
        console.log(this.props.location.pathname);
        return (
            <div>
                {userPayload.isFetching ? <div></div> :
                    <div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <div className="card tabs-left style-default-light">

                                <ul className="card-head nav nav-tabs text-center" data-toggle="tabs">
                                    <li className="active"><a href="#home" data-toggle="tab"><i
                                        className="fa fa-lg fa-user"/><br/>
                                        <h4>Профиль<br/>
                                            <small>Личные данные</small>
                                        </h4>
                                    </a></li>
                                    <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
                                </ul>

                                <div className="card-body tab-content style-default-bright">

                                    <div id="home" className="tab-pane active">
                                        <div className="row col-md-0"></div>

                                        <div className="row col-md-4">
                                            <h3>Привет, {userPayload.user.nickname}</h3>
                                            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                                                {userPayload.user.image == null ?
                                                    <div className="user_card">
                                                        <img src="../css/material/img/unknown_user.png"
                                                             height='180px'
                                                             width='160px'/>
                                                    </div> :
                                                    <div>
                                                        <img src={userPayload.user.image} height='180px'
                                                             width='160px'/>
                                                    </div>
                                                }
                                                <br/>
                                                <input type="file" encType="image/*" id="fileUpload"
                                                       onChange={this.onChange} name="image"/>
                                                <button className="btn btn-primary btn-raised"
                                                        type="submit">
                                                    Сохранить
                                                </button>
                                            </form>
                                        </div>
                                        <div className="row col-md-5">
                                            <h3>Информация</h3>

                                            <form className="form-horizontal" role="form">
                                                <div className="form-group">
                                                    <label className="col-sm-2 control-label">E-mail:</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-control-static">email@example.com
                                                        </div>
                                                    </div>
                                                    <label className="col-sm-2 control-label">Nickname:</label>
                                                    <div className="col-sm-10">
                                                        <div
                                                            className="form-control-static">{userPayload.user.nickname}</div>
                                                    </div>
                                                    <label className="col-sm-2 control-label">Имя:</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-control-static">
                                                            {userPayload.user.first_name !== null ?
                                                                userPayload.user.first_name :
                                                                <div>Данное поле не заполнено</div>}
                                                        </div>
                                                    </div>
                                                    <label className="col-sm-2 control-label">Фамилия:</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-control-static">
                                                            {userPayload.user.second_name !== null ?
                                                                userPayload.user.second_name :
                                                                <div>Данное поле не заполнено</div>}
                                                        </div>
                                                    </div>
                                                    <label className="col-sm-2 control-label">Команда:</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-control-static">
                                                            {userPayload.user.second_name !== null ?
                                                                userPayload.user.second_name :
                                                                <div>У вас пока нет команды</div>}
                                                        </div>
                                                    </div>
                                                    <label className="col-sm-2 control-label">О себе:</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-control-static">
                                                            {userPayload.user.second_name !== null ?
                                                                userPayload.user.second_name :
                                                                <div>Данное поле не заполнено</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                    <div id="menu1" className="tab-pane">
                                        asdsad
                                    </div>
                                    <div className="col-md-3">
                                        <Link to="/profile/settings"
                                              className="btn btn-block btn-raised btn-primary"><i
                                            className="md md-create"/>Редактировать</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authenticaton
    }
}

export default connect(mapStateToProps)(Profile);