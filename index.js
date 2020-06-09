(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io/'
  const Index_URL = BASE_URL + 'api/v1/movies/'
  const POSTER_URL = BASE_URL + 'posters/'
  const data = []  //存放res資料
  const dataPanel = document.querySelector('#data-panel')

  axios.get(Index_URL)
    .then(res => {
      console.log(res.data.results)
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
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }
  let arr = ['a', 'b', 'c']
  arr.forEach((item, index, array) => {
    console.log(item)
    console.log(index)
    console.log(array)
    console.log(' --- 分隔線 ---')
  })
})()