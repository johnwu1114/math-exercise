export default class Timer {
  constructor(callback) {
    this.intervalSeconds = 0.1;
    this.durationSeconds = 0;
    this.callback = callback;
  }

  start = () => {
    this.intervalId = setInterval(() => {
      this.durationSeconds += this.intervalSeconds;
      if (this.callback) this.callback(this.durationSeconds);
    }, this.intervalSeconds * 1000);
  }

  stop = () => {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  restart = () => {
    this.stop();
    this.durationSeconds = 0;
    this.start();
  }

  getDuration = () => {
    return this.durationSeconds;
  }
}