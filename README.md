<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>API Grid Dashboard — 8 Mini Apps</title>
  <style>
    :root{
      --bg:#0f1724; --card:#0b1220; --accent:#f0c330; --muted:#98a0b3; --glass: rgba(255,255,255,0.03);
      color-scheme: dark;
    }
    *{box-sizing:border-box}
    html,body{height:100%;margin:0;font-family:Inter,Segoe UI,system-ui,Roboto,"Helvetica Neue",Arial}
    body{background:
      radial-gradient(1200px 500px at 10% 10%, rgba(240,195,48,0.06), transparent 6%),
      linear-gradient(180deg,#08101a 0%, #071421 100%);
      color:#e6eef8;padding:24px;}
    header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
    header h1{font-size:1.1rem;margin:0;color:var(--accent)}
    header p{margin:0;color:var(--muted);font-size:0.9rem}
    .grid{
      display:grid;
      grid-template-columns: repeat(4, 1fr);
      gap:16px;
    }
    /* responsive */
    @media (max-width:1100px){ .grid{grid-template-columns:repeat(2,1fr)} }
    @media (max-width:600px){ .grid{grid-template-columns:1fr} header{flex-direction:column;align-items:flex-start;gap:8px} }

    .cell{
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border:1px solid rgba(255,255,255,0.03);
      padding:12px;border-radius:10px;min-height:160px;position:relative;overflow:hidden;
      display:flex;flex-direction:column;gap:8px;
    }
    .cell h3{margin:0;font-size:0.95rem;color:var(--accent)}
    .meta{font-size:0.8rem;color:var(--muted)}
    .output{flex:1;display:flex;align-items:center;justify-content:center;padding:6px;gap:8px;flex-direction:column;text-align:center}
    .small{font-size:0.85rem;color:var(--muted)}
    button, .btn {
      background:var(--accent); color:#051018;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600;
    }
    button:disabled{opacity:0.6;cursor:default}
    img.resp{max-width:100%;max-height:220px;border-radius:8px;object-fit:cover}
    .row{display:flex;gap:8px;align-items:center;justify-content:center}
    input, select{padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit}
    .loading{font-size:0.85rem;color:var(--muted)}
    .error{color:#ff6b6b;font-size:0.85rem}
    footer{margin-top:16px;color:var(--muted);font-size:0.85rem;text-align:center}
    /* small helpers */
    pre.json{max-height:140px;overflow:auto;text-align:left;background:rgba(255,255,255,0.02);padding:8px;border-radius:6px;font-size:0.75rem}
  </style>
</head>
<body>
  <header>
    <div>
      <h1>API Grid Dashboard</h1>
      <p>8 mini-apps using fetch() + async/await — try them, inspect network, and extend.</p>
    </div>
    <div class="meta">Tip: Open DevTools → Network to inspect each request</div>
  </header>

  <main class="grid">
    <!-- 1. Dog Image -->
    <section class="cell" id="dog-cell">
      <h3>🐶 Random Dog</h3>
      <div class="meta">Source: dog.ceo</div>
      <div class="output" id="dog-output">
        <div class="loading">Click "Fetch" to get a dog image</div>
      </div>
      <div class="row">
        <button id="dog-btn">Fetch Dog</button>
      </div>
    </section>

    <!-- 2. Cat Image -->
    <section class="cell" id="cat-cell">
      <h3>🐱 Random Cat</h3>
      <div class="meta">Source: thecatapi.com</div>
      <div class="output" id="cat-output"><div class="loading">Click "Fetch"</div></div>
      <div class="row">
        <button id="cat-btn">Fetch Cat</button>
      </div>
    </section>

    <!-- 3. Weather (city search -> open-meteo) -->
    <section class="cell" id="weather-cell">
      <h3>🌤️ Weather (Open-Meteo)</h3>
      <div class="meta">Enter city name, hits geocoding + forecast (no API key)</div>
      <div class="output">
        <div style="width:100%">
          <div class="row" style="justify-content:stretch">
            <input id="city-input" placeholder="e.g., Chicago" />
            <button id="weather-btn">Get</button>
          </div>
          <div id="weather-result" class="small" style="margin-top:8px">—</div>
        </div>
      </div>
    </section>

    <!-- 4. Currency (USD → EUR) -->
    <section class="cell" id="currency-cell">
      <h3>💱 Currency (USD → EUR)</h3>
      <div class="meta">Source: exchangerate.host (free)</div>
      <div class="output" id="currency-output"><div class="loading">Click "Get Rate"</div></div>
      <div class="row">
        <button id="rate-btn">Get Rate</button>
      </div>
    </section>

    <!-- 5. Movies (TMDB) -->
    <section class="cell" id="movies-cell">
      <h3>🎬 Movies (TMDB)</h3>
      <div class="meta">Requires TMDB API key — see comments in JS</div>
      <div class="output" id="movies-output"><div class="loading">Insert TMDB key in code to fetch trending movies</div></div>
      <div class="row">
        <button id="movies-btn">Fetch (needs key)</button>
      </div>
    </section>

    <!-- 6. GitHub User -->
    <section class="cell" id="github-cell">
      <h3>👩‍💻 GitHub User</h3>
      <div class="meta">Public profile: api.github.com/users/{username}</div>
      <div class="output">
        <div class="row" style="width:100%;justify-content:stretch">
          <input id="gh-user" placeholder="e.g., octocat" />
          <button id="gh-btn">Lookup</button>
        </div>
        <div id="gh-result" style="width:100%;margin-top:8px" class="small">—</div>
      </div>
    </section>

    <!-- 7. Joke (JokeAPI v2) -->
    <section class="cell" id="joke-cell">
      <h3>😂 Random Joke</h3>
      <div class="meta">Source: JokeAPI (v2)</div>
      <div class="output" id="joke-output"><div class="loading">Click to fetch a joke</div></div>
      <div class="row">
        <button id="joke-btn">Tell me a joke</button>
      </div>
    </section>

    <!-- 8. Official Joke (alternative / fallback) -->
    <section class="cell" id="ojoke-cell">
      <h3>🤡 Official Joke (fallback)</h3>
      <div class="meta">official-joke-api.appspot.com</div>
      <div class="output" id="ojoke-output"><div class="loading">Click to fetch</div></div>
      <div class="row">
        <button id="ojoke-btn">Fetch Official Joke</button>
      </div>
    </section>
  </main>

  <footer>
    Built with fetch() • try breaking each cell and inspect Network/Console. See sources in the project notes.
  </footer>

  <script>
    /* ---------------------------
       Helpers
    ----------------------------*/
    const $ = (sel) => document.querySelector(sel);
    const setLoading = (el, msg='Loading...'){ el.innerHTML = '<div class="loading">'+msg+'</div>'; }

    /* ---------------------------
       1) Dog Image — dog.ceo
       Endpoint: https://dog.ceo/api/breeds/image/random
       docs: https://dog.ceo/dog-api/documentation/random  (no key)
       ----------------------------*/
    $('#dog-btn').addEventListener('click', async () => {
      const out = $('#dog-output');
      out.innerHTML = '<div class="loading">Fetching dog...</div>';
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        if(!res.ok) throw new Error('Network error');
        const data = await res.json();
        // data.message contains image URL
        out.innerHTML = `<img class="resp" src="${data.message}" alt="Random dog">`;
      } catch(err) {
        out.innerHTML = `<div class="error">Error: ${err.message}</div>`;
      }
    });

    /* ---------------------------
       2) Cat Image — thecatapi
       Endpoint: https://api.thecatapi.com/v1/images/search
       (returns an array; first item has .url)
       ----------------------------*/
    $('#cat-btn').addEventListener('click', async () => {
      const out = $('#cat-output');
      out.innerHTML = '<div class="loading">Fetching cat...</div>';
      try {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        if(!res.ok) throw new Error('Network error');
        const data = await res.json();
        const img = data[0]?.url;
        if(!img) throw new Error('No image found');
        out.innerHTML = `<img class="resp" src="${img}" alt="Random cat">`;
      } catch(err) {
        out.innerHTML = `<div class="error">Error: ${err.message}</div>`;
      }
    });

    /* ---------------------------
       3) Weather (Open-Meteo)
       Flow: geocode city -> get lat/lon -> fetch forecast
       Geocoding endpoint: https://geocoding-api.open-meteo.com/v1/search?name={city}
       Forecast endpoint: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
       ----------------------------*/
    $('#weather-btn').addEventListener('click', async () => {
      const out = $('#weather-result');
      const city = $('#city-input').value.trim();
      if(!city){ out.textContent = 'Please enter a city name.'; return; }
      out.innerHTML = '<div class="loading">Searching city...</div>';
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        if(!geoRes.ok) throw new Error('Geocoding failed');
        const geo = await geoRes.json();
        const place = geo.results && geo.results[0];
        if(!place) throw new Error('City not found');
        out.innerHTML = `<div class="small">Found: ${place.name}, ${place.country} (lat:${place.latitude.toFixed(2)}, lon:${place.longitude.toFixed(2)})</div>
                         <div class="loading">Fetching weather...</div>`;
        const lat = place.latitude, lon = place.longitude;
        const wfRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
        if(!wfRes.ok) throw new Error('Weather fetch failed');
        const wf = await wfRes.json();
        const cur = wf.current_weather;
        if(!cur) throw new Error('No current weather data');
        out.innerHTML = `<div><strong>${place.name}, ${place.country}</strong></div>
                         <div class="small">Temperature: ${cur.temperature}°C • Wind: ${cur.windspeed} km/h • Time: ${cur.time}</div>`;
      } catch(err) {
        out.innerHTML = `<div class="error">${err.message}</div>`;
      }
    });

    /* ---------------------------
       4) Currency (exchangerate.host)
       Endpoint example: https://api.exchangerate.host/latest?base=USD&symbols=EUR
       ----------------------------*/
    $('#rate-btn').addEventListener('click', async () => {
      const out = $('#currency-output');
      out.innerHTML = '<div class="loading">Fetching rate...</div>';
      try {
        const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=EUR');
        if(!res.ok) throw new Error('Network error');
        const data = await res.json();
        const rate = data?.rates?.EUR;
        if(!rate) throw new Error('Rate not available');
        out.innerHTML = `<div><strong>USD → EUR</strong></div><div class="small">1 USD = ${rate.toFixed(4)} EUR (base: ${data.base})</div>`;
      } catch(err) {
        out.innerHTML = `<div class="error">${err.message}</div>`;
      }
    });

    /* ---------------------------
       5) Movies (TMDB) — placeholder
       Endpoint (trending example): https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_KEY
       TMDB requires registration for an API key. See developer.themoviedb.org
       ----------------------------*/
    $('#movies-btn').addEventListener('click', async () => {
      const out = $('#movies-output');
      out.innerHTML = '<div class="loading">Fetch disabled — add TMDB key in JS to use.</div>';
      // to enable: uncomment code below and add your API key to `TMDB_KEY`
      /*
      const TMDB_KEY = 'YOUR_TMDB_KEY_HERE';
      if(!TMDB_KEY) { out.textContent = 'Add TMDB_KEY variable in the code.'; return;}
      try {
        const r = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`);
        const j = await r.json();
        out.innerHTML = '<div class="small">'+ j.results.slice(0,5).map(m=>'<div>'+m.title+' ('+ (m.release_date||'n/a') +')</div>').join('') +'</div>';
      } catch(e){ out.innerHTML = '<div class="error">'+e.message+'</div>' }
      */
    });

    /* ---------------------------
       6) GitHub user profile
       Endpoint: https://api.github.com/users/{username}
       ----------------------------*/
    $('#gh-btn').addEventListener('click', async () => {
      const out = $('#gh-result');
      const username = $('#gh-user').value.trim();
      if(!username){ out.textContent='Enter a GitHub username'; return; }
      out.innerHTML = '<div class="loading">Fetching GitHub profile...</div>';
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
        if(res.status===404) throw new Error('User not found');
        if(!res.ok) throw new Error('Network error');
        const data = await res.json();
        out.innerHTML = `<div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-direction:column">
                          <img src="${data.avatar_url}" alt="${data.login}" style="width:80px;height:80px;border-radius:50%"/>
                          <div><strong>${data.name||data.login}</strong> • <span class="small">${data.bio||''}</span></div>
                          <div class="small">Repos: ${data.public_repos} • Followers: ${data.followers}</div>
                         </div>`;
      } catch(err){
        out.innerHTML = `<div class="error">${err.message}</div>`;
      }
    });

    /* ---------------------------
       7) JokeAPI v2 (Sv443)
       Example: https://v2.jokeapi.dev/joke/Any?type=single
       ----------------------------*/
    $('#joke-btn').addEventListener('click', async () => {
      const out = $('#joke-output');
      out.innerHTML = '<div class="loading">Fetching joke...</div>';
      try {
        // using type=single to receive a single-line joke in .joke
        const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&safe-mode');
        if(!res.ok) throw new Error('Network error');
        const d = await res.json();
        if(d.error) throw new Error('API returned an error');
        out.innerHTML = `<div class="small">${d.joke}</div>`;
      } catch(e){
        out.innerHTML = `<div class="error">${e.message}</div>`;
      }
    });

    /* ---------------------------
       8) Official Joke API (fallback)
       Endpoint: https://official-joke-api.appspot.com/jokes/random
       ----------------------------*/
    $('#ojoke-btn').addEventListener('click', async () => {
      const out = $('#ojoke-output');
      out.innerHTML = '<div class="loading">Fetching official joke...</div>';
      try {
        const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
        if(!res.ok) throw new Error('Network error');
        const j = await res.json();
        out.innerHTML = `<div><strong>${j.setup}</strong><div style="height:6px"></div><em>${j.punchline}</em></div>`;
      } catch(e){
        out.innerHTML = `<div class="error">${e.message}</div>`;
      }
    });

  </script>
</body>
</html>


