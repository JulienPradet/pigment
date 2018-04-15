import React from "react";

const IsServerSideContext = React.createContext("isServerSide");

class Provider extends React.Component {
  constructor() {
    super();
    this.state = {
      isServerSide: true
    };
  }

  componentDidMount() {
    this.setState({
      isServerSide: false
    });
  }

  render() {
    return (
      <IsServerSideContext.Provider value={this.state.isServerSide}>
        {this.props.children}
      </IsServerSideContext.Provider>
    );
  }
}

const Consumer = ({ children }) => (
  <IsServerSideContext.Consumer>{children}</IsServerSideContext.Consumer>
);

export default Consumer;

export { Provider };
