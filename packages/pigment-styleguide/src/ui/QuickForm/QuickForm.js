import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import screenReaderOnly from "../screenReaderOnly";
import * as colors from "../colors";

const classes = {
  form: css`
    position: relative;
  `,
  input: css`
    width: 100%;
    border: 1px solid ${colors.white};
    box-sizing: border-box;
    padding: 0 1rem;
    line-height: 2rem;
    background: ${colors.white};
    &:focus {
      outline: 0;
      border: 1px solid ${colors.shade04};
    }
  `,
  reset: css`
    position: absolute;
    right: 0;
    border: 1px solid transparent;
    background: none;
    box-sizing: border-box;
    font-size: 2rem;
    line-height: 2rem;
    padding: 0 0.5rem;
    color: ${colors.shade04};

    &:focus,
    &:hover {
      color: ${colors.dark};
    }
    &:focus {
      outline: 0;
      border: 1px solid ${colors.shade04};
    }
  `
};

class QuickForm extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.state = {
      value: ""
    };
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  onSubmit(e) {
    e.preventDefault();

    if (typeof this.props.onChange === "function") {
      this.props.onSubmit(this.state.value);
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });

    if (typeof this.props.onChange === "function") {
      this.props.onChange(e.target.value);
    }
  }

  onReset() {
    this.setState({ value: "" });

    if (typeof this.props.onChange === "function") {
      this.props.onChange("");
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className={classes.form}>
        <label htmlFor={this.id} className={screenReaderOnly}>
          {this.props.label}
        </label>
        <input
          id={this.id}
          name="search"
          placeholder={this.props.label}
          value={this.state.value}
          onChange={this.onChange}
          className={classes.input}
        />
        {this.state.value.length > 0 && (
          <button
            aria-label="Reset"
            type="button"
            onClick={this.onReset}
            className={classes.reset}
          >
            &times;
          </button>
        )}
        <button className={screenReaderOnly}>{this.props.submitLabel}</button>
      </form>
    );
  }
}

QuickForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  label: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired
};

export default QuickForm;
