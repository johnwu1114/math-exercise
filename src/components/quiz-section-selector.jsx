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
            <li key={`sections_${i}`}>
              <input id={`sections_${i}`} type="checkbox" onChange={this.onSelected} checked={section.isChecked || false} value={section.value} />
              <label htmlFor={`sections_${i}`}>{section.text}</label>
            </li>
          )}
          <li >
            <input id="selectedAll" type="checkbox" onChange={this.toggleAll} checked={this.state.selectedAll} />
            <label htmlFor="selectedAll">全部</label>
          </li>
        </ul>
        <span className="btn start" onClick={() => this.onStart()}>開始</span>
      </div>
    );
  }
}