import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import Button from './components/Button';

import './style.scss';

class App extends Component {
  state = {
    counter: 0,
  };

  handleClick = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
  };

  render() {
    const { counter } = this.state;
    return (
      <Fragment>
        <h1 className="title">Hello RocketSeat</h1>
        <h2 style={{ color: '#f00' }}>
          o valor da soma é:
          {counter}
        </h2>
        <Button onClick={this.handleClick}>Somar</Button>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById('app'));
