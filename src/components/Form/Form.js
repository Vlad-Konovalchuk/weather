import React from 'react';

/*
* interface IFormProps = {
* getWeather: (e:React.FormEvent<HTMLFORMELEMENT>)=>void}
*
* interface IWeatherState = { }
*
* */
export class Form extends React.PureComponent {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="text" name='city' placeholder='Enter your city'/>
                <input type="text" name='country' placeholder='Enter your country'/>
                <button type='submit'>Get your weather</button>
            </form>)
    }
}