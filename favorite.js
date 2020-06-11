(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io/'
  const Index_URL = BASE_URL + 'api/v1/movies/'
  const POSTER_URL = BASE_URL + 'posters/'
  const data = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const dataPanel = document.querySelector('#data-panel')

  displayDataList(data)

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h6>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}"> X </button>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }
})()