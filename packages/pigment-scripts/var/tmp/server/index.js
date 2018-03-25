import App from "./../app/index.js";
import Document from "./../../../../pigment-demo/src/Document.js";
import { serverRenderApp } from "../../../src/serve/serverRenderApp";

export default serverRenderApp(Document, App);
