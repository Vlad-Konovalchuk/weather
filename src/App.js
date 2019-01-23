import React, {Component} from 'react';
import './App.css';
import {Title} from "./components/Title/Title";
import {Form} from "./components/Form/Form";
import {Weather} from "./components/Weather/Weather";
import axios from "axios";

class App extends Component {
    static state = {
        weather: {}
    };


    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        try {
            const key = process.env.REACT_APP_SECRET_CODE;
            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a5e00b549adfff86f5bd7ad0da79bbae&units=metric`)
            return this.setState({weather: data.data});
        } catch (e) {
            throw new Error(e.message)
        } finally {
            console.log('Loading finished')
        }
    };


    render() {
        return (
            <div className="App">
                <Title/>
                <Form getWeather={this.getWeather}/>
                <Weather/>
            </div>
        );
    }
}

export default App;
