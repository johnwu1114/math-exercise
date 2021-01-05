import React, { Component } from "react";

export default class QuizSectionSelector extends Component {
  constructor(props) {
    super(props);
    let questionBank = this.props.questionBank;
    let name = questionBank.getName();
    let menu = questionBank.getMenu();

    this.state = {
      name: name,
      menu: menu,
      ready: true
    };
  }

  onStart = () => {
    if (this.state.ready > 0)
      this.props.onStart(this.state.menu.map(x => {
        x.selections = x.selections.filter(s => s.selected);
        return x;
      }));
  }

  onSelected = (event, item) => {
    item.selections.forEach(selection => {
      if (selection.text === event.target.value) {
        selection.selected = event.target.checked;
      } else if (item.type === "single-choice") {
        selection.selected = false;
      }
    });
    item.selectedAll = item.selections.filter(x => x.selected !== true).length === 0;

    this.updateMenuItem(item);
  }

  toggleAll = (name) => {
    let item = this.state.menu.filter(x => x.name === name)[0];
    let selections = item.selections;
    item.selectedAll = !item.selectedAll;
    selections.forEach(selection => {
      selection.selected = item.selectedAll;
    })

    this.updateMenuItem(item);
  }

  updateMenuItem = (item) => {
    let ready = true;
    this.setState(state => {
      state.menu.forEach(x => {
        if (x.name === item.name) x = item;
        if (x.selections.filter(s => s.selected).length === 0)
          ready = false;
      });

      return {
        menu: state.menu,
        ready: ready
      }
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        {this.state.menu.map((item, i) =>
          <section key={i}>
            <h3>{item.title}</h3>
            <ul className="sections">
              {item.selections.map((selection, j) =>
                <li key={j}>
                  <label>
                    <input type="checkbox"
                      value={selection.text}
                      onChange={e => this.onSelected(e, item)}
                      checked={selection.selected || false} />
                    <span>{selection.text}</span>
                  </label>
                </li>
              )}
              {item.type === "multiple-choice" && <li>
                <label>
                  <input type="checkbox" onChange={() => this.toggleAll(item.name)} checked={item.selectedAll || false} />
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