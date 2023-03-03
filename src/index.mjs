import { h, render } from "https://unpkg.com/preact?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

function App(props) {
  return html`
  <div>
  ${props.cpus.map((cpu) => {
    return html`
      <div class="bar">
        <div class="bar-inner" style="width: ${cpu}%"></div>
        <label>${cpu.toFixed(2)}% usage</label>
      </div> `;
  })}
  </div>
  `;
}

const evtSource = new EventSource("/sse/cpus");
evtSource.onmessage = (ev) => {
  let json = JSON.parse(ev.data);
  render(html`<${App} cpus=${json}></${App}>`, document.body);
};

