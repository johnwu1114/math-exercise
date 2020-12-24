import React, { Component } from "react";

export default class QuizSectionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: this.props.strategy.getSections(),
      selectedAll: false
    }
  }

  componentDidMount() {
    this.toggleAll();
  }

  onStart = () => {
    let selected = this.state.sections.filter(x => x.isChecked);
    if (selected.length > 0)
      this.props.onStart(selected);
  }

  onSelected = (event) => {
    let sections = this.state.sections;
    sections.forEach(section => {
      if (section.value.toString() === event.target.value.toString()) {
        section.isChecked = event.target.checked;
      }
    });
    let selectedAll = sections.filter(x => x.isChecked !== true).length === 0;
    this.setState({ sections: sections, selectedAll: selectedAll });
  }

  toggleAll = () => {
    let sections = this.state.sections;
    let selectedAll = !this.state.selectedAll;
    sections.forEach(section => {
      section.isChecked = selectedAll;
    })
    this.setState({ sections: sections, selectedAll: selectedAll });
  }

  render() {
    return (
      <div>
        <ul className="sections">
          {this.state.sections.map((section, i) =>
            <li key={i}>
              <label className="section">
                <input type="checkbox" onChange={this.onSelected} checked={section.isChecked || false} value={section.value} />
                <span className="checkmark">{section.text}</span>
              </label>
            </li>
          )}
          <li >
            {this.state.selectedAll || <label className="section">
              <input type="checkbox" onChange={this.toggleAll} checked={this.state.selectedAll} />
              <span className="checkmark">全部</span>
            </label>}
          </li>
        </ul>
        <span className="btn start" onClick={() => this.onStart()}>開始</span>
      </div>
    );
  }
}