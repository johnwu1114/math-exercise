import React, { Component } from "react";

export default class QuizSetting extends Component {
  constructor(props) {
    super(props);
    let questionBank = this.props.questionBank;
    let title = questionBank.getTitle();
    let options = questionBank.getOptions();

    this.state = {
      title: title,
      options: options,
      ready: true
    };
  }

  onStart = () => {
    if (this.state.ready > 0)
      this.props.onStart(this.state.options.map(x => {
        if (x.selections != null)
          x.selections = x.selections.filter(s => s.selected);
        return x;
      }));
  }

  onSelected = (event, option) => {
    option.selections.forEach(selection => {
      if (selection.text === event.target.value) {
        selection.selected = event.target.checked;
      } else if (option.type === "single-choice") {
        selection.selected = false;
      }
    });
    option.selectedAll = option.selections.filter(x => x.selected !== true).length === 0;

    this.updateMenuItem(option);
  }

  onSlide = (event, option) => {
    option.value = event.target.value;
    this.updateMenuItem(option);
    this.setState(state => {
      state.options.forEach(x => {
        if (x.name === option.name) x = option;
      });
    });
  }

  toggleAll = (name) => {
    let option = this.state.options.filter(x => x.name === name)[0];
    let selections = option.selections;
    option.selectedAll = !option.selectedAll;
    selections.forEach(selection => {
      selection.selected = option.selectedAll;
    })

    this.updateMenuItem(option);
  }

  updateMenuItem = (option) => {
    let ready = true;
    this.setState(state => {
      state.options.forEach(x => {
        if (x.name === option.name) x = option;
        if (x.selections != null && x.selections.filter(s => s.selected).length === 0)
          ready = false;
      });

      return {
        options: state.options,
        ready: ready
      }
    });
  }

  renderSwitch = (option) => {
    switch (option.type) {
      case "single-choice":
      case "multiple-choice":
        return <ul className="sections">
          {option.selections.map((selection, j) =>
            <li key={j}>
              <label>
                <input type="checkbox"
                  value={selection.text}
                  onChange={e => this.onSelected(e, option)}
                  checked={selection.selected || false} />
                <span>{selection.text}</span>
              </label>
            </li>
          )}
          {option.type === "multiple-choice" && <li>
            <label>
              <input type="checkbox" onChange={() => this.toggleAll(option.name)} checked={option.selectedAll || false} />
              <span>全選</span>
            </label>
          </li>}
        </ul>;
      case "range-slider":
        return <div className="sections">
          <input className="slider" type="range" min="3" max="60"
            value={option.value} onChange={e => this.onSlide(e, option)} />
            {option.value} 秒
        </div>;
      default:
        return <div></div>;
    }
  }


  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        {this.state.options.map((option, i) =>
          <section key={i}>
            <h3>{option.title}</h3>
            {this.renderSwitch(option)}
          </section>
        )}
        <nav>
          <span className={`btn large ${this.state.ready ? "green" : "disable"}`} onClick={() => this.onStart()}>開始</span>
        </nav>
      </div>
    );
  }
}