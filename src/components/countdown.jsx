import React from "react"

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.max = parseFloat(props.max || 10);
    this.state = { second: this.max };
  }

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  reset = () => {
    this.pause();
    this.setState({ second: this.max });
    this.resume();
  }

  pause = () => {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  resume = () => {
    this.intervalId = setInterval(this.countdown, 100);
  }

  countdown = () => {
    this.setState(state => ({
      second: state.second - 0.1
    }));
    if (this.state.second > 0) return;
    this.timeout();
  }

  timeout = () => {
    this.props.timeout();
  }

  getDuration = () => {
    return Math.min(this.max, this.max - this.state.second);
  }

  render() {
    return (
      <progress max={this.max} value={this.state.second.toFixed(1)}></progress>
    );
  }
}