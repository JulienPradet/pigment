import React, { Component } from "react";
import { css } from "react-emotion";
import Switch from "../Switch";
import Input from "./Input";

const sizeInputClass = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > div {
    margin: 0 0.5em;
  }
`;

class SizeInput extends Component {
  constructor(props) {
    super();
    this.state = {
      auto: props.value === "auto",
      lastValue: props.value === "auto" ? 0 : props.value
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (
      (this.state.auto && props.value === "auto") ||
      (!this.state.auto && props.value !== "auto")
    ) {
      return;
    }

    this.setState({
      auto: props.value === "auto"
    });
    if (props.value !== "auto") {
      this.setState({ lastValue: props.value });
    }
  }

  toggle(active) {
    const { value, onChange } = this.props;

    if (!active) {
      this.setState({
        auto: true,
        lastValue: value
      });
      onChange("auto");
    } else {
      this.setState({
        auto: false
      });
      onChange(this.state.lastValue);
    }
  }

  onChange(e) {
    const { onChange } = this.props;
    if (!this.state.auto) {
      this.setState({
        lastValue: parseInt(e.target.value, 10)
      });
      onChange(parseInt(e.target.value, 10));
    }
  }
  render() {
    const { label, name, value } = this.props;

    return (
      <div className={sizeInputClass}>
        <div>
          <Switch checked={!this.state.auto} onChange={this.toggle} />
        </div>
        <div>{label}</div>
        <div>
          <Input
            name={name}
            type="number"
            value={value === "auto" ? this.state.lastValue : value}
            onChange={this.onChange}
            disabled={this.state.auto}
          />
          px
        </div>
      </div>
    );
  }
}

class Size extends Component {
  onChange(name) {
    return value => {
      this.props.onChange({
        ...this.props.size,
        [name]: value
      });
    };
  }

  render() {
    return (
      <div>
        <SizeInput
          label="Width"
          name="width"
          value={this.props.size.width}
          onChange={this.onChange("width")}
        />
        <SizeInput
          label="Height"
          name="height"
          value={this.props.size.height}
          onChange={this.onChange("height")}
        />
      </div>
    );
  }
}

export default Size;
