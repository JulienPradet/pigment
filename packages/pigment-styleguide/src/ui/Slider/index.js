import { injectGlobal } from "emotion";
import Slider from "rc-slider";
import { lightBackground, primary, white } from "../colors";

injectGlobal`
  .rc-slider {
    position: relative;
    height: 4px;
    width: 100%;
    border-radius: 6px;
    background-color: ${lightBackground};
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-track {
    position: absolute;
    left: 0;
    height: 4px;
    border-radius: 6px;
    background-color: ${primary};
    z-index: 1;
  }
  .rc-slider-handle {
    position: absolute;
    margin-left: -10px;
    margin-top: -8px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    border: solid 2px ${primary};
    background-color: ${white};
    z-index: 2;
  }
  .rc-slider-handle:hover {
    border-color: ${primary};
  }
  .rc-slider-handle-active:active {
    border-color: ${primary};
    box-shadow: 0 0 5px ${primary};
  }
  .rc-slider-mark {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    font-size: 12px;
    z-index: 3;
  }
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: #999;
  }
  .rc-slider-mark-text-active {
    color: #666;
  }
  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
    z-index: 1;
  }
  .rc-slider-dot {
    position: absolute;
    bottom: -2px;
    margin-left: -4px;
    width: 8px;
    height: 8px;
    border: 2px solid ${lightBackground};
    background-color: ${white};
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
  }
  .rc-slider-dot:first-child {
    margin-left: -4px;
  }
  .rc-slider-dot:last-child {
    margin-left: -4px;
  }
  .rc-slider-dot-active {
    border-color: ${primary};
  }
  .rc-slider-disabled {
    background-color: ${lightBackground};
  }
  .rc-slider-disabled .rc-slider-track {
    background-color: #ccc;
  }
  .rc-slider-disabled .rc-slider-handle,
  .rc-slider-disabled .rc-slider-dot {
    border-color: #ccc;
    background-color: ${white};
    cursor: not-allowed;
  }
  .rc-slider-disabled .rc-slider-mark-text,
  .rc-slider-disabled .rc-slider-dot {
    cursor: not-allowed !important;
  }
  .rc-slider-vertical {
    width: 4px;
    height: 100%;
  }
  .rc-slider-vertical .rc-slider-track {
    bottom: 0;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-handle {
    position: absolute;
    margin-left: -5px;
    margin-bottom: -7px;
  }
  .rc-slider-vertical .rc-slider-mark {
    top: 0;
    left: 10px;
    height: 100%;
  }
  .rc-slider-vertical .rc-slider-step {
    height: 100%;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-dot {
    left: 2px;
    margin-bottom: -4px;
  }
  .rc-slider-vertical .rc-slider-dot:first-child {
    margin-bottom: -4px;
  }
  .rc-slider-vertical .rc-slider-dot:last-child {
    margin-bottom: -4px;
  }
  .rc-slider-tooltip-zoom-down-enter,
  .rc-slider-tooltip-zoom-down-appear {
    -webkit-animation-duration: .3s;
            animation-duration: .3s;
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    display: block !important;
    -webkit-animation-play-state: paused;
            animation-play-state: paused;
  }
  .rc-slider-tooltip-zoom-down-leave {
    -webkit-animation-duration: .3s;
            animation-duration: .3s;
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    display: block !important;
    -webkit-animation-play-state: paused;
            animation-play-state: paused;
  }
  .rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active,
  .rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active {
    -webkit-animation-name: rcSliderTooltipZoomDownIn;
            animation-name: rcSliderTooltipZoomDownIn;
    -webkit-animation-play-state: running;
            animation-play-state: running;
  }
  .rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active {
    -webkit-animation-name: rcSliderTooltipZoomDownOut;
            animation-name: rcSliderTooltipZoomDownOut;
    -webkit-animation-play-state: running;
            animation-play-state: running;
  }
  .rc-slider-tooltip-zoom-down-enter,
  .rc-slider-tooltip-zoom-down-appear {
    -webkit-transform: scale(0, 0);
            transform: scale(0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
            animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  .rc-slider-tooltip-zoom-down-leave {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  @-webkit-keyframes :global(rcSliderTooltipZoomDownIn) {
    0% {
      opacity: 0;
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(0, 0);
              transform: scale(0, 0);
    }
    100% {
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(1, 1);
              transform: scale(1, 1);
    }
  }
  @keyframes :global(rcSliderTooltipZoomDownIn) {
    0% {
      opacity: 0;
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(0, 0);
              transform: scale(0, 0);
    }
    100% {
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(1, 1);
              transform: scale(1, 1);
    }
  }
  @-webkit-keyframes :global(rcSliderTooltipZoomDownOut) {
    0% {
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(1, 1);
              transform: scale(1, 1);
    }
    100% {
      opacity: 0;
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(0, 0);
              transform: scale(0, 0);
    }
  }
  @keyframes :global(rcSliderTooltipZoomDownOut) {
    0% {
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(1, 1);
              transform: scale(1, 1);
    }
    100% {
      opacity: 0;
      -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
      -webkit-transform: scale(0, 0);
              transform: scale(0, 0);
    }
  }
`;

export default Slider;
