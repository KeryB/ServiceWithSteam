import React, {Component} from 'react';
import {YMaps, Map, Placemark, GeoObject} from 'react-yandex-maps';


class YandexMaps extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            longitude: '',
            latitude: '',
            submitted: false
        });
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.longitude && this.state.latitude){
            this.setState({
                submitted:true
            })
        }else{
            this.setState({
                submitted:false
            })
        }

        console.log(this.state);
    }



    render() {

        const mapState = {center: [55.76, 37.64], zoom: 10};

        return (
            <div>
                <br/>
                <br/>
                <br/>
                <YMaps>
                    <Map state={mapState}>
                        <GeoObject
                            geometry={{
                                type: 'Point',
                                coordinates: [55.8, 37.8],
                            }}
                            properties={{
                                iconContent: 'Я тащусь',
                                hintContent: 'Ну давай уже тащи',
                            }}
                            />
                        <Placemark/>

                    </Map>
                </YMaps>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="longitude"
                               className="col-md-5 control-label">Долгота</label>
                        <div className="col-sm-10">
                            <input id = 'longitude' name = 'longitude' onChange={this.onChange}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="latitude"
                               className="col-md-5 control-label">Широта</label>
                        <div className="col-sm-10">
                            <input id = 'latitude' name = 'latitude' onChange={this.onChange}/>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-raised"
                            type="submit">
                        Сохранить
                    </button>
                </form>



            </div>


        )
    }
}

export default YandexMaps;