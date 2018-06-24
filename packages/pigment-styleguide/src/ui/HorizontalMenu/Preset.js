import React from "react";
import { css } from "react-emotion";
import classnames from "classnames";
import { primary } from "../colors";

const presetListClass = css`
  display: flex;
  justify-content: center;
`;

const presetActiveClass = css`
  background: ${primary};
`;

const presetClass = css`
  margin: 0 0.5em;

  button {
    padding: 0.7em 1em;
    color: #fff;
    font-weight: bold;
    font-size: inherit;
    font-family: inherit;
    background: #39354b;
    cursor: pointer;
    border: 0;
  }

  .preset button:hover,
  .preset button:focus {
    ${presetActiveClass};
  }
`;

const PresetList = ({ presets, onSelect, selected }) => (
  <div className={presetListClass}>
    {presets.map((preset, index) => (
      <Preset
        key={index}
        active={preset.preset === selected}
        preset={preset}
        onSelect={onSelect}
      />
    ))}
  </div>
);

const Preset = ({ active, preset, onSelect }) => (
  <div className={classnames(presetClass, { [presetActiveClass]: active })}>
    <button onClick={() => onSelect(preset.preset)}>{preset.label}</button>
  </div>
);

export default PresetList;
