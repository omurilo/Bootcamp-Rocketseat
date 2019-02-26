import React, { Component, Fragment } from "react";
import { render } from "react-dom";

import Button from "./components/Button";

import "./style.scss";
import { red } from "ansi-colors";

class App extends Component {
  state = {
    counter: 0
  };

  componentDidMount() {
    /* Perfeiro para chamadas a api, cadastro de eventlisteners...*/
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* Alteração em uma propriedade ou estado esta função é chamada */
    /* Utilizado para vetar a renderização caso as alterações não forem significativas*/
    /* Muito utilizado para melhora de performance do componente */
    return nextState.counter <= 10;
  }

  componentDidUpdate(prevProps, prevState) {
    /* Manipulação de dados após o update do componente */
  }

  componentWillUnmount() {
    /* Utilizado para limpar os eventlisteners */
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    return (
      <Fragment>
        <h1 className="title">Hello RocketSeat</h1>
        <h2 style={{ color: "#f00" }}>
          o valor da soma é: {this.state.counter}
        </h2>
        <Button onClick={this.handleClick}>Somar</Button>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById("app"));
