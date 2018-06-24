import { Component } from "react";
import PropTypes from "prop-types";

class Measure extends Component {
  constructor() {
    super();
    this.state = {
      width: null,
      height: null
    };
    this.updateSize = this.updateSize.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps !== this.props ||
      nextState.width !== this.state.width ||
      nextState.height !== this.state.height ||
      nextState.top !== this.state.top ||
      nextState.left !== this.state.left
    );
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
  }

  componentDidUpdate() {
    this.updateSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  }

  updateSize() {
    if (this.container) {
      const bbox = this.container.getBoundingClientRect();
      this.setState({
        width: bbox.width,
        height: bbox.height,
        top: bbox.top,
        left: bbox.left
      });
    }
  }

  render() {
    return this.props.children({
      setRef: ref => {
        this.container = ref;
      },
      measure: this.state.width !== null ? this.state : null
    });
  }
}

Measure.propTypes = {
  children: PropTypes.func.isRequired
};

export default Measure;
