import React from "react";
import styled from "styled-components";
import { render } from "react-dom";

const Div = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 10px;
  border: 1px solid;
  background: ${props => (props.on ? props.color : "white")};
`;

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: auto;
  border: 1px solid;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRed: 10,
      timeBlue: 0,
      timeYellow: 0,
      on: true
    };
  }

  componentDidMount() {
    this.count = setInterval(() => {
      if (this.state.timeRed !== 0) {
        this.setState({
          timeRed: this.state.timeRed - 1,
          timeYellow: this.state.timeRed === 1 ? 3 : 0
        });
      }
      if (this.state.timeYellow !== 0) {
        this.setState({
          timeYellow: this.state.timeYellow - 1,
          timeBlue: this.state.timeYellow === 1 ? 8 : 0
        });
      }
      if (this.state.timeBlue !== 0) {
        this.setState({
          timeBlue: this.state.timeBlue - 1,
          timeRed: this.state.timeBlue === 1 ? 10 : 0
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.count);
  }

  render() {
    const { timeRed, timeYellow, timeBlue } = this.state;
    return (
      <div>
        <Wrapper width="100px">
          <Div on={this.state.timeRed} color="red" />
          <Div on={this.state.timeYellow > 0} color="yellow" />
          <Div on={this.state.timeBlue > 0} color="blue" />
        </Wrapper>
        <Wrapper width="50px" height="50px">
          <h1>{timeRed ? timeRed : timeYellow ? timeYellow : timeBlue}</h1>
        </Wrapper>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
