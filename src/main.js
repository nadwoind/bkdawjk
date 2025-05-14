import './style.css';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div class="p-8 text-center">
    <h1 class="text-2xl font-bold text-primary mb-4">Technologie Webowe</h1>
    <div>
      <button id="counter" class="text-blue-300 p-4">count is 0</button>
    </div>
  </div>
`;

setupCounter(document.querySelector('#counter'));
