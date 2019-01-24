import React from 'react';

interface IFormProps {
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

interface IFormState {}

export class Form extends React.PureComponent<IFormProps, IFormState> {
  public render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input type="text" name="city" placeholder="City?" />
        <input type="text" name="country" placeholder="Country ?" />
        <button type="submit">Get your weather</button>
      </form>
    );
  }
}
