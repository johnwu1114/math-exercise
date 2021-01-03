import React, { Component } from "react";

export default class QuizSectionSelector extends Component {
  constructor(props) {
    super(props);
    let questionBank = this.props.questionBank;
    let sections = questionBank.getSections();
    let name = questionBank.getName();
    this.isSingleSelection = questionBank.getComponentName() === "SchulteTable";
    let methods = questionBank.getAnswerMethods();
    this.state = {
      name: name,
      isSelected: sections[0].isSelected = true,
      sections: sections,
      isSelectedAll: false,
      methods: methods,
      answerMethod: methods.length > 1 ? methods[0].value : ""
    }
  }

  onStart = () => {
    let selected = this.state.sections.filter(x => x.isSelected);
    if (selected.length > 0)
      this.props.onStart({
        sections: selected,
        answerMethod: this.state.answerMethod
      });
  }

  onSelected = (event) => {
    let sections = this.state.sections;
    sections.forEach(section => {
      if (section.text === event.target.value) {
        section.isSelected = event.target.checked;
      } else if (this.isSingleSelection) {
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

  onChangeAnswerMethod = (event) => {
    this.setState({
      answerMethod: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <section>
          <h3>請選擇</h3>
          <ul className="sections">
            {this.state.sections.map((section, i) =>
              <li key={i}>
                <label>
                  <input type="checkbox"
                    value={section.text}
                    onChange={this.onSelected}
                    checked={section.isSelected || false} />
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
        </section>
        <section>
          {this.state.methods.length > 1 &&
            <div>
              <h3>答題方式</h3>
              <ul className="sections">
                {this.state.methods.map((method, i) =>
                  <li key={i}>
                    <label>
                      <input type="checkbox"
                        value={method.value}
                        onChange={this.onChangeAnswerMethod}
                        checked={this.state.answerMethod === method.value} />
                      <span>{method.text}</span>
                    </label>
                  </li>)}
              </ul>
            </div>}
        </section>
        <nav>
          <span className={`btn large ${this.state.isSelected ? "green" : "disable"}`} onClick={() => this.onStart()}>開始</span>
        </nav>
      </div>
    );
  }
}