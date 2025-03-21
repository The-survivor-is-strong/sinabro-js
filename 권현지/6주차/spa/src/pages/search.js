export function getInitHtml({movies}){
  return `
    <h1>movie search result</h1>
      ${movies
        .map(
          (movie) => `
          <div class="movie">
            <p>${movie.title}</p>
            <button type="button">click</button>
          </div>
        `
        )
        .join('')}
    `
}

export const renderSearch = async({searchParam,initialData})=>{
  if (!initialData) {
    
    document.querySelector('#app').innerHTML = `
      <h1>movie search</h1>
      <p>about title: ${searchParam.keyword}</p>
    `;

    const res = await fetch(`http://localhost:3000/api/search?keyword=${searchParam.keyword}`);
    const json = await res.json();

    document.querySelector('#app').innerHTML = getInitHtml(json);
  }

  Array.from(document.querySelectorAll('.movie button')).forEach((button) => {
    button.addEventListener('click', () => {
      console.log('button is clicked.');
    });
  });
}
