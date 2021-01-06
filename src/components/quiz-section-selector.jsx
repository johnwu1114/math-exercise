import React, { Component } from "react";

export default class QuizSectionSelector extends Component {
  constructor(props) {
    super(props);
    let questionBank = this.props.questionBank;
    let name = questionBank.getName();
    let options = questionBank.getOptions();

    this.state = {
      name: name,
      options: options,
      ready: true
    };
  }

  onStart = () => {
    if (this.state.ready > 0)
      this.props.onStart(this.state.options.map(x => {
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
        if (x.selections.filter(s => s.selected).length === 0)
          ready = false;
      });

      return {
        options: state.options,
        ready: ready
      }
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        {this.state.options.map((option, i) =>
          <section key={i}>
            <h3>{option.title}</h3>
            <ul className="sections">
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
            </ul>
          </section>
        )}
        <nav>
          <span className={`btn large ${this.state.ready ? "green" : "disable"}`} onClick={() => this.onStart()}>開始</span>
        </nav>
      </div>
    );
  }
}