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
    this.setState({
      isSelected: sections.filter(x => x.isChecked).length > 0,
      sections: sections,
      selectedAll: sections.filter(x => x.isChecked !== true).length === 0
    });
  }

  toggleAll = () => {
    let sections = this.state.sections;
    let selectedAll = !this.state.selectedAll;
    sections.forEach(section => {
      section.isChecked = selectedAll;
    })
    this.setState({
      isSelected: sections.filter(x => x.isChecked).length > 0,
      sections: sections,
      selectedAll: selectedAll
    });
  }

  render() {
    return (
      <div>
        <ul className="sections">
          {this.state.sections.map((section, i) =>
            <li key={i}>
              <label>
                <input type="checkbox" onChange={this.onSelected} checked={section.isChecked || false} value={section.value} />
                <span>{section.text}</span>
              </label>
            </li>
          )}
          {/* <li >
            <label>
              <input type="checkbox" onChange={this.toggleAll} checked={this.state.selectedAll} />
              <span>全部</span>
            </label>
          </li> */}
        </ul>
        <span className={`btn ${this.state.isSelected ? "green" : "disable"}`} onClick={() => this.onStart()}>開始</span>
      </div>
    );
  }
}