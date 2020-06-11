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
              <button class="btn btn-info btn-remove-favorite" data-id="${item.id}"> X </button>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  //show movie Modal
  function showMovie(id) {
    //get elements
    const modalTitle = document.querySelector('#show-movie-title')
    const modalImage = document.querySelector('#show-movie-image')
    const modalDate = document.querySelector('#show-movie-date')
    const modalDescription = document.querySelector('#show-movie-description')
    //set request url
    const url = Index_URL + id
    console.log(url)
    //send request to show api
    axios.get(url)
      .then(res => {
        const data = res.data.results
        console.log(data)
        //insert data into modal ui
        modalTitle.textContent = data.title
        modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="responsive image">`
        modalDate.textContent = `release at : ${data.release_date}`
        modalDescription.textContent = `${data.description}`
      })
      .catch((err) => { console.log(err) })
  }

  //delete movie from favoriteItem
  function removeFavoriteItem(id) {
    //find movie by id
    const index = data.findIndex(item => item.id === Number(id))
    if (index === -1) return  //找到要刪除電影的id在data陣列中的位置
    //remove movie from data and update localStorage
    data.splice(index, 1)  //切割陣列將要刪除的電影去除
    localStorage.setItem('favoriteMovies', JSON.stringify(data))  //更新後的資料要用setItem重新存回localStorage
    //repaint dataList
    displayDataList(data)
  }

  //listen to dataPanel
  dataPanel.addEventListener('click', event => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    }
    else if (event.target.matches('.btn-remove-favorite')) {
      removeFavoriteItem(event.target.dataset.id)
    }
  })


})()