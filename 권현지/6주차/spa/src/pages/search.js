export const renderSearch = ({searchParam})=>{
  document.querySelector('#app').innerHTML = `
  <h1>movie search</h1>
  <p>${searchParam.query}</p>
`
}
