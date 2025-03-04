document.querySelector('#app').innerHTML = `
  <div class="container mx-auto py-8">
    <h1 class="text-5xl font-mono font-extrabold">
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Hello!</span>
    </h1>
    <pre id="result"></pre>
  </div>
`;

async function fetchDataAndDisplay() {
  const response = await fetch(`/api/test`);
  const json = await response.json();

  document.querySelector('#result').innerHTML = JSON.stringify(json, null, 2);
}

fetchDataAndDisplay();
