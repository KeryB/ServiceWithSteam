import React, {Component} from 'react';
import {Link} from 'react-router';
import * as authAction from '../../actions/authAction';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {toBase64} from '../../utils/Utils';
import { Button } from 'antd';
import modal from './modal';

import SettingsFieldGroup from './groups/SettingsFieldGroup';
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: [],
            email: '',
            nickname: '',
            first_name: '',
            second_name: '',
            about: '',
            flag: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const file = document.getElementById("fileUpload").files;
        toBase64(file, (data) => {
            console.log(data);
            this.setState({image: data.result});
/*            const uintArray = decode(data.result);
            console.log(uintArray);*/
//            this.props.authAction.updateUserData(this.state);
        });
        console.log(this.state);
        this.props.authAction.updateUserData(this.state);
    }

    onClick(e) {
        console.log(this.state);
        this.setState({flag: !this.state.flag})
    }

    render() {

        const userPayload = this.props.auth.user;
        return (
            <div>
                {this.props.auth.isFetching ? <div></div> : <div>
                    <br></br>
                    <br/>
                    <br/>
                    <div className="col-md-12">
                        <div className="card card-underline">
                            <div className="card-head">
                                <header>Настройки</header>
                                <ul className="nav nav-tabs">
                                    <li className="active"><a data-toggle="tab" href="#first"><i
                                        className="fa fa-lg fa-user"/></a>
                                    </li>
                                    <li><a data-toggle="tab" href="#second">Команда</a></li>
                                    <li><a data-toggle="tab" href="#third">
                                        <i className="fa fa-lg fa-steam-square"/>
                                        Steam</a></li>
                                </ul>
                            </div>
                            <div className="card-body tab-content height-9">
                                <div className="tab-pane active" id="first">

                                    <div className="card style-default-light">
                                        <div className="col-sm-12">
                                            <h3> Настройки профиля</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <form className="form-horizontal" encType="multipart/form-data"
                                              onSubmit={this.onSubmit}>
                                            <div className="col-md-7">
                                                <div className="form-group">
                                                    <label htmlFor="image" className="col-sm-2 control-label">Изображение</label>
                                                    <div className="col-sm-10">
                                                        {userPayload.image === null ?
                                                            <div className="user_card_edit">
                                                                <img src="../css/material/img/unknown_user.png"
                                                                     height='160px'
                                                                     width='150px'/>
                                                            </div> :
                                                            <div>
                                                                <img src={userPayload.image} height='160px'
                                                                     width='140px'/>
                                                            </div>
                                                        }
                                                        <br/>
                                                        <Button type="primary">Primary</Button>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputEmail"
                                                           className="col-sm-2 control-label">E-mail</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-control"
                                                             name="email"
                                                             id="inputEmail">{userPayload.email}</div>
                                                    </div>
                                                    <div className="move_pencil">
                                                        <a className="btn btn-flat ink-reaction" name="email"
                                                           value={userPayload.email} onClick={this.onClick}>
                                                            <i className="fa fa-pencil"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="nickname"
                                                           className="col-sm-2 control-label">NickName</label>
                                                    <div className="col-sm-10">
                                                        <div type="text"
                                                             value={this.state.nickname}
                                                             className="form-control"
                                                             name="nickname"
                                                             id="nickname">{userPayload.nickname}</div>
                                                    </div>
                                                    <div className="move_pencil">
                                                        <a className="btn btn-flat ink-reaction">
                                                            <i className="fa fa-pencil"/>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="first_name"
                                                           className="col-sm-2 control-label">Имя</label>
                                                    <div className="col-sm-10">
                                                        <input className="form-control col-lg-12"
                                                               name="first_name"
                                                               onChange={this.onChange}
                                                               value={this.state.first_name}
                                                               id="first_name"/>
                                                        <label htmlFor="first_name" className="col-lg-12">
                                                            {userPayload.first_name ? userPayload.first_name : "Можно заполнить"}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="second_name"
                                                           className="col-sm-2 control-label">Фамилия</label>
                                                    <div className="col-sm-10">
                                                        <input className="form-control col-lg-12"
                                                               name="second_name"
                                                               value={this.state.second_name}
                                                               onChange={this.onChange}
                                                               id="second_name"/>
                                                        <label htmlFor="second_name" className="col-lg-12">
                                                            {userPayload.second_name ? userPayload.second_name : "Можно заполнить"}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="about"
                                                           className="col-sm-2 control-label">О себе</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-group">
                                                            <textarea name={this.state.about}
                                                                      onChange={this.onChange}
                                                                      id="textarea1"
                                                                      className="form-control"
                                                                      rows="3"
                                                                      />
                                                            <label htmlFor="textarea1">{userPayload.aboutUser ? userPayload.aboutUser : "Можно заполнить"}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="moveButton">
                                                <button className="btn btn-primary btn-raised"
                                                        type="submit">
                                                    Сохранить
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="tab-pane" id="second"><p>Ad ius duis dissentiunt, an sit harum primis
                                    persecuti, adipisci tacimates mediocrem sit et. Id illud voluptaria omittantur qui,
                                    te
                                    affert nostro mel. Cu conceptam vituperata temporibus has.</p>
                                </div>
                                <div className="tab-pane" id="third"><p>Duo semper accumsan ea, quidam convenire cum cu,
                                    oportere maiestatis incorrupte est eu. Soluta audiam timeam ius te, idque gubergren
                                    forensibus ad mel, persius urbanitas usu id. Civibus nostrum fabellas mea te, ne pri
                                    lucilius iudicabit. Ut cibo semper vituperatoribus vix, cum in error elitr. Vix
                                    molestiae intellegat omittantur an, nam cu modo ullum scriptorem.</p>
                                    <p>Quod option numquam vel in, et fuisset delicatissimi duo, qui ut animal noluisse
                                        erroribus. Ea eum veniam audire. Per at postea mediocritatem, vim numquam
                                        aliquid
                                        eu, in nam sale gubergren. Dicant vituperata consequuntur at sea, mazim
                                        commodo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        auth: state.authenticaton
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);