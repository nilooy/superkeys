import { render } from "preact";
import '../../src/styles/index.css'
import {Autocomplete} from "../../src/components/autocomplete/autocomplete";

const Popup = () =>  <div><Autocomplete /></div>

render(<Popup />, document.getElementById("root")!);
