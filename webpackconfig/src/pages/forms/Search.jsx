import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as searchAction from '../../actions/searchAction';
import {buildUrl, getParameterByName} from '../../utils/UrlUtils';
import {selector} from '../../animation/JquryUtils';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            sortFilter:''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        // this._handleClick = this._handleClick.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.search) {
            this.props.request.searchRequest(this.state);
            let path = buildUrl("/search", {
                q: this.state.search
            });
            this.props.history.replace(path);
        }
    }

    componentWillMount() {
        const query = getParameterByName('q');
        const {isFetching} = this.props.payload;
        if (query !== null) {
            this.setState({
                search: query
            });
        }
        if (query !== null && !isFetching) {
            console.info(this.state);
        }
    }

    componentDidMount() {
        this._handleClick();
    }
    _handleClick(){
        let selectFilter = selector();
    }

    componentWillReceiveProps(props) {
        const query = getParameterByName('q');
        const {isFetching} = props.payload;
        if (query !== null) {
            this.setState({
                search: query
            });
        }
        console.log(this.props);
    }

    onClick(e) {
        e.preventDefault();
        console.log({[e.target.name]: e.target.value});
    }

    logChange(val) {
        console.log("Selected: " + JSON.stringify(val));
    }

    userList = (item, index) => {
        return <div key={index}>
            <ul className="list divider-full-bleed">
                <li className="tile">
                    <Link className="tile-content ink-reaction" to={'/profile/' + item.id} name="sad" value={item.id}
                          onClick={this.onClick}>
                        <div className="tile-icon">
                            <img src="../css/material/img/unknown_user.png" alt=""/>
                        </div>
                        <div className="tile-text">{item.nickname}</div>
                    </Link>
                    <a className="btn btn-flat ink-reaction">
                        <button type="button" className="btn ink-reaction btn-raised btn-primary">Пригласит в группу
                        </button>
                    </a>
                </li>
            </ul>
        </div>
    };

    render() {
        const payload = this.props.payload;
        const result = payload.data.result;
        console.log(payload);
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <div className="col-md-6 col-sm-offset-2">
                    <div className="card ">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-head" style={divStyle}>
                                    <header >Найдено людей:{payload.data.totalResult}</header>
                                </div>
                                <div className="card-body height-8">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name='search'
                                                   value={this.state.search}
                                                   onChange={this.onChange}/>
                                            <div className="form-control-line"/>
                                            <span className="glyphicon glyphicon-search form-control-feedback"/>
                                        </div>
                                    </form>
                                    {
                                        payload.isFetching ? <div className="preloader"/> :
                                            <div>
                                                {   result ?
                                                    result.map(this.userList)
                                                    : <div className="col-lg-offset-5"><h4>Список пуст</h4></div>
                                                }
                                            </div>
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-head col-lg-offset-1">
                            <h4>Фильтры:</h4>
                        </div>
                        <div className="card-body height-4">
                            <div>
                                <span className="choose">Choose Gender</span>
                                <div className="drop-menu">
                                    <div className="select">
                                        <span>Select Gender</span>
                                        <i className="fa fa-chevron-down"/>
                                    </div>
                                    <input type="hidden" name="gender"/>
                                    <ul className="dropeddown">
                                        <li id="male">Male</li>
                                        <li id="female">Female</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="card-body height-4">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const divStyle = {
    background: "#B0E0E6"
};

function mapStateToProps(state) {
    return {
        payload: state.search
    }
}

function mapDispatchToProps(dispatch) {
    return {
        request: bindActionCreators(searchAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);