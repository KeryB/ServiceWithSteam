import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";
import {toBase64, convertId} from "../../utils/Utils";
import {bindActionCreators} from "redux";
import * as userDataAction from '../../actions/userDataAction';
import isEmpty from 'lodash/isEmpty';
import NotFound from '../NotFound';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: [],
            flag: false,
            unknownUser: false
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
    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillMount() {
    }

    componentWillReceiveProps(props) {
        if (!this.props.data.isFetched && this.props.auth.isFetching) {
            const id = props.routers.params.id;
            if (isNaN(Number(id))) {
                this.props.userData.errorUserData("Данная страница не найдена");
                return;
            }
            console.log(props.routers);
            if (props.auth.user.id !== Number(id)) {
                this.props.userData.fetchUserDataById(id);
                this.setState({
                    unknownUser: true
                })
            }
        }
    }

    render() {
        let userPayload = this.props.auth;
        if (!isEmpty(this.props.data.user) && convertId(userPayload.user.id) !== this.props.location.pathname) {
            userPayload = this.props.data;
        } else {
            userPayload = this.props.auth;
        }
        if (!isEmpty(this.props.data.error)) {
            return (<div>
                <NotFound/>
            </div>)
        }
        return (
            <div>
                {userPayload.isFetching && !this.props.data.isFetched ? <div></div> :
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
                                            <h3>{userPayload.user.nickname}</h3>

                                            {userPayload.user.image === null ?
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
                                            <div>
                                                <Link to="/profile/settings" className="btn btn-primary btn-raised"
                                                      type="submit">
                                                    Редактировать
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="row col-md-5">
                                            <h3>Информация</h3>

                                            <form className="form-horizontal" role="form">
                                                <div className="form-group">
                                                    <label className="col-sm-2 control-label">E-mail:</label>
                                                    <div className="col-sm-10">
                                                        <div
                                                            className="form-control-static">{userPayload.user.email}
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
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.authenticaton,
        data: state.otherUserData,
        routers: ownProps
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userData: bindActionCreators(userDataAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);