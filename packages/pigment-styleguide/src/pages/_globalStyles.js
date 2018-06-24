import { injectGlobal } from "emotion";
import * as colors from "../ui/colors";

injectGlobal`
  body {
    margin: 0;
    color: ${colors.dark};
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    line-height: 1.5;
  }
`;
