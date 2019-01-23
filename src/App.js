import React, {Component} from 'react';
import './App.css';
import {Title} from "./components/Title/Title";
import {Form} from "./components/Form/Form";
import {Weather} from "./components/Weather/Weather";
import axios from "axios";

class App extends Component {
    state = {
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        error: "Please enter the values."
    };


    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        try {
            const key = process.env.REACT_APP_SECRET_CODE;
            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}&units=metric`);
            if (city && country) {
                this.setState({
                    temperature: data.data.main.temp,
                    city: data.data.name,
                    country: data.data.sys.country,
                    humidity: data.data.main.humidity,
                    description: data.data.weather[0].description,
                    error: ""
                });
            } else {
                this.setState({
                    error: "Please enter the values."
                });
            }
        } catch (e) {
            throw new Error(e.message)
        } finally {
            console.log('Loading finished')
        }
    };


    render() {
        const {temperature, humidity, city, country, description, error} = this.state;
        return (
            <div>
                <div className="wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col title-container">
                                <Title/>
                            </div>
                            <div className="col form-container">
                                <Form getWeather={this.getWeather}/>
                                <Weather
                                    temperature={temperature}
                                    humidity={humidity}
                                    city={city}
                                    country={country}
                                    description={description}
                                    error={error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
