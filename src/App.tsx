import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import { Form } from './components/Form/Form';
import { Title } from './components/Title/Title';
import { Weather } from './components/Weather/Weather';

interface ILocation {
  city: string;
  country: string;
}

interface IAppState {
  location: ILocation;
  temperature: string;
  city: string;
  country: string;
  humidity: string;
  description: string;
  error: string[];
  loading: boolean;
}

class App extends Component<{}, IAppState> {
  public state = {
    location: {
      city: '',
      country: '',
    },
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: [],
    loading: false,
  };

  public handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const city = (e.currentTarget.elements.namedItem(
      'city',
    ) as HTMLInputElement).value;
    const country = (e.currentTarget.elements.namedItem(
      'country',
    ) as HTMLInputElement).value;
    if (city && country) {
      this.setState(
        {
          location: { city, country },
        },
        () => this.setWeather(),
      );
    } else {
      this.setError('Please enter the values.');
    }
  };

  public render() {
    const {
      temperature,
      humidity,
      city,
      country,
      description,
      error,
    } = this.state;
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col title-container">
                <Title />
              </div>
              <div className="col form-container">
                <Form handleSubmit={this.handleSubmit} />
                <Weather
                  temperature={temperature}
                  humidity={humidity}
                  city={city}
                  country={country}
                  description={description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private setError = (er: string): void => {
    this.setState({
      error: [...this.state.error, er],
    });
  };

  private setEnvVariables = () => {
    if (process.env.REACT_APP_SECRET_CODE !== undefined) {
      return process.env.REACT_APP_SECRET_CODE;
    }
    this.setError("You haven't API key, but it require");
  };

  private setWeather = async () => {
    const key = this.setEnvVariables();
    const location = this.state.location;
    const { error } = this.state;
    if (error.length === 0 && key !== undefined) {
      const data = await this.getWeather(location, key);
      this.setState({
        temperature: data.data.main.temp,
        city: data.data.name,
        country: data.data.sys.country,
        humidity: data.data.main.humidity,
        description: data.data.weather[0].description,
      });
    } else {
      return;
    }
  };

  private getWeather = async (location: ILocation, key: string) => {
    this.setState({
      loading: true,
    });
    try {
      return await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location.city},${
          location.country
        }&appid=${key}&units=metric`,
      );
    } catch (error) {
      throw new Error(error.message);
      /* this.setState({
         error: error.message,
       });*/
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
}

export default App;
