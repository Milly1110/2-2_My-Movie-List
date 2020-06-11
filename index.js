(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io/'
  const Index_URL = BASE_URL + 'api/v1/movies/'
  const POSTER_URL = BASE_URL + 'posters/'
  const data = []  //存放res資料
  const dataPanel = document.querySelector('#data-panel')
  const searchForm = document.querySelector('#search')
  const searchInput = document.querySelector('#search-input')

  axios.get(Index_URL)
    .then(res => {
      // console.log(res.data.results)
      //避免data.push(res.data.results)讓data變成只有一個item的陣列
      //方法一:迭代器
      // for (let item of res.data.results) {
      //   data.push(item)
      // }
      //方法二:利用spread operator展開陣列元素
      data.push(...res.data.results)
      displayDataList(data)  //資料成功放入data後，調用函式把data的內容輸出至網頁
    })
    .catch(err => { console.log(err) })

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
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}"> + </button>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    //監聽show按鈕
    if (event.target.matches('.btn-show-movie')) {
      console.log(event.target.dataset.id)
      showMovie(event.target.dataset.id)  //show movie Modal
    }
    //監聽badd-favorite按鈕
    else if (event.target.matches('.btn-add-favorite')) {
      console.log(event.target.dataset.id)
      addFavoriteItem(event.target.dataset.id)
    }
  })

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

  // search movie 
  searchForm.addEventListener('submit', event => {
    event.preventDefault()  //終止button發出HTTP request的預設行為
    // console.log('click')
    let input = searchInput.value.toLowerCase()
    let results = data.filter(
      movie => movie.title.toLowerCase().includes(input)
    )  //運用filter篩選data陣列內容跟input相符的元素
    console.log(results)
    displayDataList(results)  //將filter篩選出的結果顯示到畫面
  })

  //add movie to favorite
  function addFavoriteItem(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []  //存放localStorage資料時，因為value為string type，要用JSON.parse(value)
    const movie = data.find(item => item.id === Number(id))
    //判斷收藏列表(list)中是否有重複項目
    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your favorite list.`)
    }
    else {
      list.push(movie)
      alert(`Added ${movie.title} to your favorite list!`)
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(list))  //取得localStorage資料時，因為value為string type，要用JSON.stringify(obj)
  }

})()