import React from "react";
import QuickForm from "../QuickForm";

const SearchableContext = React.createContext("");

class Searchable extends React.Component {
  constructor() {
    super();
    this.state = {
      search: /./
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ search: new RegExp(value, "i") });
  }

  render() {
    const { children } = this.props;
    return (
      <SearchableContext.Provider value={this.state.search}>
        <QuickForm onChange={this.onChange} label="Search" submitLabel="OK" />
        {children}
      </SearchableContext.Provider>
    );
  }
}

Searchable.Match = ({ match, children }) => {
  return (
    <SearchableContext.Consumer>
      {regexp => children(match(regexp))}
    </SearchableContext.Consumer>
  );
};

export default Searchable;
