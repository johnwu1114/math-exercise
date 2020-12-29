import React from "react"

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    let canvas = this.canvas.current;
    canvas.height = canvas.width;
    let context = canvas.getContext("2d");
    let radius = canvas.height / 2;
    context.translate(radius, radius);
    radius = radius * 0.90;

    this.context = context;
    this.radius = radius;
    let hhmmss = (this.props.hhmmss || "00:00:00").split(":");
    let hour = hhmmss[0] || "0";
    let minute = hhmmss[1] || "0";
    let second = hhmmss[2] || "0";
    this.drawClock(hour, minute, second);
  }

  drawClock = (hour, minute, second) => {
    this.drawFace();
    this.drawNumbers();
    this.drawTime(hour, minute, second);
  }

  drawFace = () => {
    let context = this.context;
    let radius = this.radius;
    context.beginPath();

    // Base Plate
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();

    // Outside frame
    // let grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    // grad.addColorStop(0, "red");
    // grad.addColorStop(0.5, "yellow");
    // grad.addColorStop(1, "green");
    // context.strokeStyle = grad;
    // context.lineWidth = radius * 0.1;
    // context.stroke();
  }

  drawNumbers = () => {
    let context = this.context;
    let radius = this.radius;
    context.beginPath();
    context.fillStyle = "black";
    context.font = `bold ${radius * 0.2}px arial`;
    context.textBaseline = "middle";
    context.textAlign = "center";
    for (let num = 1; num < 13; num++) {
      let ang = num * Math.PI / 6;
      context.rotate(ang);
      context.translate(0, -radius * 0.85);
      context.rotate(-ang);
      context.fillText(num.toString(), 0, 0);
      context.rotate(ang);
      context.translate(0, radius * 0.85);
      context.rotate(-ang);
    }
  }

  drawTime = (hour, minute, second) => {
    let radius = this.radius;

    // Hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
      (minute * Math.PI / (6 * 60)) +
      (second * Math.PI / (360 * 60));
    this.drawHand(hour, radius * 0.4, radius * 0.05);

    // Minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(minute, radius * 0.7, radius * 0.05);

    // Second
    if (this.props.disableSecondhand === "true") return;
    second = (second * Math.PI / 30);
    this.drawHand(second, radius * 0.6, radius * 0.02, "red");
  }

  drawHand = (pos, length, width, style) => {
    let context = this.context;
    style = style || "black"

    // Center of Clock
    context.beginPath();
    context.arc(0, 0, length * width * 0.015, 0, 2 * Math.PI);
    context.fillStyle = style;
    context.fill();

    // Hand of Clock
    context.beginPath();
    context.strokeStyle = style;
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
  }

  render() {
    return (
      <canvas className="clock" ref={this.canvas} width={this.props.width || 200} />
    );
  }
}