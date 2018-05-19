import React from "react";

const SearchableContext = React.createContext("");

class Searchable extends React.Component {
  constructor() {
    super();
    this.state = {
      search: /./
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ search: new RegExp(e.target.value, "i") });
  }

  render() {
    const { children } = this.props;
    return (
      <SearchableContext.Provider value={this.state.search}>
        <form>
          <label>
            Search: <input name="search" onChange={this.onChange} />
          </label>
        </form>
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
