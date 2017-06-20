import React, {Component} from 'react';
import {Link} from 'react-router';
import * as authAction from '../../actions/authAction';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


class Settings extends Component {

    constructor(props){
        super(props);
        this.state({
            error:{},
            email:'',
            nickname:'',
            image:'',
            first_name:'',
            second_name:'',
            about_me:''
        })
    }

    render() {

        const userPayload = this.props.auth;
        this.setState({
           email:userPayload.user.email,

        });
        return (
            <div>
                <br></br>
                <br></br>
                <br/>

                <div className="col-md-12">
                    <div className="card card-underline">
                        <div className="card-head">
                            <header>Настройки</header>
                            <ul className="nav nav-tabs" data-toggle="tabs">
                                <li className="active"><a href="#first2" data-toggle="tab"><i
                                    className="fa fa-lg fa-user"/></a>
                                </li>
                                <li><a href="#second2">Команда</a></li>
                                <li><a href="#third2">
                                    <li className="fa fa-lg fa-steam-square"/>
                                    Steam</a></li>
                            </ul>
                        </div>
                        <div className="card-body tab-content height-9">
                            <div className="tab-pane active" id="first2">
                                <p>
                                    <div className="card style-default-light">
                                        <div className="col-sm-12">
                                            <p><h3> Настройки профиля</h3></p>
                                        </div>
                                    </div>
                                    <div>
                                        <form className="form-horizontal" role="form" encType="multipart/form-data">
                                            <div className="col-md-9">
                                                <div className="form-group">
                                                    <label htmlFor="image" className="col-sm-2 control-label">Изображение</label>
                                                    <div className="col-sm-10">
                                                        {userPayload.user.image == null ?
                                                            <div className="user_card_edit">
                                                                <img src="../css/material/img/unknown_user.png"
                                                                     height='140px'
                                                                     width='120px'/>
                                                            </div> :
                                                            <div>
                                                                <img src={userPayload.user.image} height='140px'
                                                                     width='120px'/>
                                                            </div>
                                                        }
                                                        <br/>
                                                        <input type="file" encType="image/*" id="fileUpload"
                                                               onChange={this.onChange} name="image"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email"
                                                           className="col-sm-2 control-label">E-mail</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" value={userPayload.user.email}
                                                               className="form-control" id="email"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="nickname" className="col-sm-2 control-label">Nickname</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control"
                                                               value={userPayload.user.nickname} id="nickname"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="first_name"
                                                           className="col-sm-2 control-label">Имя</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" value={userPayload.user.first_name}
                                                               placeholder={userPayload.user.first_name ?
                                                                   <div></div> : "Можно заполнить"}
                                                               className="form-control" id="first_name"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="second_name" className="col-sm-2 control-label">Фамилия</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" value={userPayload.user.second_name}
                                                               placeholder={userPayload.user.second_name ?
                                                                   <div></div> : "Можно заполнить"}
                                                               className="form-control" id="second_name"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="textarea13" className="col-sm-2 control-label">Обо мне</label>
                                                    <div className="col-sm-10">
                                                        <textarea name="textarea13" id="textarea13"
                                                                  className="form-control" rows="3"
                                                                  placeholder="Можно заполнить"/>
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
                                </p>
                            </div>
                            <div className="tab-pane" id="second2"><p>Ad ius duis dissentiunt, an sit harum primis
                                persecuti, adipisci tacimates mediocrem sit et. Id illud voluptaria omittantur qui, te
                                affert nostro mel. Cu conceptam vituperata temporibus has.</p>
                            </div>
                            <div className="tab-pane" id="third2"><p>Duo semper accumsan ea, quidam convenire cum cu,
                                oportere maiestatis incorrupte est eu. Soluta audiam timeam ius te, idque gubergren
                                forensibus ad mel, persius urbanitas usu id. Civibus nostrum fabellas mea te, ne pri
                                lucilius iudicabit. Ut cibo semper vituperatoribus vix, cum in error elitr. Vix
                                molestiae intellegat omittantur an, nam cu modo ullum scriptorem.</p>
                                <p>Quod option numquam vel in, et fuisset delicatissimi duo, qui ut animal noluisse
                                    erroribus. Ea eum veniam audire. Per at postea mediocritatem, vim numquam aliquid
                                    eu, in nam sale gubergren. Dicant vituperata consequuntur at sea, mazim commodo</p>
                            </div>
                        </div>
                    </div>
                </div>
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