import React, { Component } from "react";
import Timer from "../libs/utils/timer";

export default class Countdown extends Component {

  constructor(props) {
    super(props);
    this.maximum = parseFloat(props.seconds || 10);
    this.timer = new Timer(this.countdown);
    this.state = { time: this.maximum };
  }

  reset = () => {
    this.timer.restart();
  }

  pause = () => {
    this.timer.stop();
  }

  resume = () => {
    this.timer.start();
  }

  countdown = () => {
    this.setState({ time: this.maximum - this.timer.getDuration() });
    this.props.onChanged(this.state.time);
    if (this.state.time > 0) return;
    this.timeout();
  }

  timeout = () => {
    this.timer.stop();
    this.props.timeout();
  }

  getDuration = () => {
    return Math.min(this.maximum, this.timer.getDuration());
  }

  getStatus = () => {
    let rate = Math.round(this.state.time / this.maximum * 100);
    if (rate < 20) return "danger";
    else if (rate < 50) return "warning";
    return "";
  }

  render() {
    return (
      <progress className={this.getStatus()} max={this.maximum} value={this.state.time.toFixed(1)}></progress>
    );
  }
}