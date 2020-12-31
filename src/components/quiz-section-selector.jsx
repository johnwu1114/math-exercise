import React, { Component } from "react";

export default class QuizSectionSelector extends Component {
  constructor(props) {
    super(props);
    let sections = this.props.questionBank.getSections();
    this.isSingleSelection =  this.props.questionBank.getComponentName() === "SchulteTable";
    this.state = {
      isSelected: sections[0].isSelected = true,
      sections: sections,
      isSelectedAll: false
    }
  }

  onStart = () => {
    let selected = this.state.sections.filter(x => x.isSelected);
    if (selected.length > 0)
      this.props.onStart(selected);
  }

  onSelected = (event) => {
    let sections = this.state.sections;
    sections.forEach(section => {
      if (section.text === event.target.value) {
        section.isSelected = event.target.checked;
      } else if(this.isSingleSelection) {
        section.isSelected = false;
      }
    });
    this.setState({
      isSelected: sections.filter(x => x.isSelected).length > 0,
      sections: sections,
      isSelectedAll: sections.filter(x => x.isSelected !== true).length === 0
    });
  }

  toggleAll = () => {
    let sections = this.state.sections;
    let isSelectedAll = !this.state.isSelectedAll;
    sections.forEach(section => {
      section.isSelected = isSelectedAll;
    })
    this.setState({
      isSelected: sections.filter(x => x.isSelected).length > 0,
      sections: sections,
      isSelectedAll: isSelectedAll
    });
  }

  render() {
    return (
      <div>
        <h1>請選擇</h1>
        <ul className="sections">
          {this.state.sections.map((section, i) =>
            <li key={i}>
              <label>
                <input type="checkbox" onChange={this.onSelected} checked={section.isSelected || false} value={section.text} />
                <span>{section.text}</span>
              </label>
            </li>
          )}
          {this.isSingleSelection || <li>
            <label>
              <input type="checkbox" onChange={this.toggleAll} checked={this.state.isSelectedAll} />
              <span>全選</span>
            </label>
          </li>}
        </ul>
        <span className={`btn large ${this.state.isSelected ? "green" : "disable"}`} onClick={() => this.onStart()}>開始</span>
      </div>
    );
  }
}