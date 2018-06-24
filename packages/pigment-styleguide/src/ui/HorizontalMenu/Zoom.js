import React from "react";
import classnames from "classnames";
import { css } from "react-emotion";
import Slider from "../Slider";
import Input from "./Input";

const zoomItemClass = css`
  min-height: 1em;
  text-align: center;
`;

const zoomSliderClass = css`
  margin-top: 1em;
`;

const Zoom = ({ zoom, onChange }) => (
  <div>
    <div className={zoomItemClass}>
      Zoom
      <Input
        type="number"
        step="5"
        value={zoom}
        onChange={event => onChange(event.currentTarget.value)}
      />
      %
    </div>
    <div className={classnames(zoomItemClass, zoomSliderClass)}>
      <Slider
        min={25}
        max={400}
        value={parseInt(zoom)}
        onChange={value => {
          onChange(value);
        }}
        tipFormatter={null}
      />
    </div>
  </div>
);

export default Zoom;
