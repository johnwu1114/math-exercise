import React, { Component } from "react";

export default class Countdown extends Component {
  intervalSeconds = 0.1;

  constructor(props) {
    super(props);
    this.maximum = parseFloat(props.seconds || 10);
    this.state = { timer: this.maximum };
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  reset = () => {
    this.pause();
    this.setState({ timer: this.maximum });
    this.resume();
  }

  pause = () => {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  resume = () => {
    this.intervalId = setInterval(this.countdown, this.intervalSeconds * 1000);
  }

  countdown = () => {
    this.setState(state => ({
      timer: state.timer - this.intervalSeconds
    }));
    this.props.onChanged(this.state.timer);
    if (this.state.timer > 0) return;
    this.timeout();
  }

  timeout = () => {
    this.props.timeout();
  }

  getDuration = () => {
    return Math.min(this.maximum, this.maximum - this.state.timer);
  }

  getStatus = () => {
    let rate = Math.round(this.state.timer / this.maximum * 100);
    if(rate < 20) return "danger";
    else if(rate < 50) return "warning";
    return "";
  }

  render() {
    return (
      <progress className={this.getStatus()} max={this.maximum} value={this.state.timer.toFixed(1)}></progress>
    );
  }
}