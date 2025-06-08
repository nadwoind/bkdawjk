
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function loadArticles() {
  const { data: articles, error } = await supabase
    .from('article')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Błąd pobierania:', error);
    return;
  }

  const container = document.getElementById('articles');
  container.innerHTML = articles.map(a => `
    <article class="card">
      <h2>${a.title}</h2>
      <h3>${a.subtitle}</h3>
      <p><em>${a.author} — ${new Date(a.created_at).toLocaleDateString()}</em></p>
      <div>${a.content}</div>
    </article>
  `).join('');
}


document.getElementById('new-article').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target;
  const payload = {
    title:    f.title.value,
    subtitle: f.subtitle.value,
    author:   f.author.value,
    content:  f.content.value
  };

  const { error } = await supabase
    .from('article')
    .insert([payload]);

  if (error) {
    alert('Nie udało się dodać artykułu: ' + error.message);
    return;
  }

  f.reset();      
  loadArticles();  
});


document.addEventListener('DOMContentLoaded', loadArticles);


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
