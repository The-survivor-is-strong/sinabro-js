export const renderSearch = async({searchParam})=>{
  document.querySelector('#app').innerHTML = `
    <h1>movie search</h1>
    <p>about title: ${searchParam.query}</p>
  `;

const res = await fetch(`http://localhost:3000/search?keyword=${searchParam.query}`);
const json = await res.json();
document.querySelector('#app').innerHTML = `
    <h1>movie search result</h1>
      ${json
        .map(
          (movie) => `
          <div class="movie">
            <p>${movie.title}</p>
            <button type="button">click</button>
          </div>
        `
        )
        .join('')}
    `;

}
