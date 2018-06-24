import React, { Component } from "react";
import { Container, Group } from "../../ui/HorizontalMenu";
import Size from "../../ui/HorizontalMenu/Size";
import Zoom from "../../ui/HorizontalMenu/Zoom";
import PresetList from "../../ui/HorizontalMenu/Preset";
import presets from "./presets";

const initialOptions = {
  width: "auto",
  height: "auto",
  zoom: 100
};

const DisplayOptionsContext = React.createContext(initialOptions);

class DisplayOptionsProvider extends Component {
  constructor() {
    super();
    this.state = { displayOptions: initialOptions };
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateOptions(optionUpdaters) {
    this.setState(optionUpdaters);
  }

  render() {
    return (
      <DisplayOptionsContext.Provider value={this.state.displayOptions}>
        <>
          <Container>
            <Group>
              <Size
                size={this.state.displayOptions}
                onChange={size =>
                  this.updateOptions(state => ({
                    displayOptions: {
                      ...state.displayOptions,
                      ...size
                    }
                  }))
                }
              />
            </Group>
            <Group>
              <Zoom
                zoom={this.state.displayOptions.zoom}
                onChange={zoom =>
                  this.updateOptions(state => ({
                    displayOptions: {
                      ...state.displayOptions,
                      zoom: zoom
                    }
                  }))
                }
              />
            </Group>
            <Group>
              <PresetList
                selected={this.state.displayOptions}
                presets={presets}
                onSelect={preset =>
                  this.updateOptions(state => ({
                    displayOptions: preset
                  }))
                }
              />
            </Group>
          </Container>
          {this.props.children(this.state.displayOptions)}
        </>
      </DisplayOptionsContext.Provider>
    );
  }
}

export { DisplayOptionsProvider };
