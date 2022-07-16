const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const hurt = document.querySelectorAll(".favorite");
const favoriteBtn = document.querySelector(".btn17");
console.log(favoriteBtn);

// let test = [];
// let favorits= [];
// for (let i=0; i<hurt.length; i++) {
//     test.push(hurt[i].id)
//     console.log(hurt)
//  }

//  console.log(test);

// hurt.forEach( button =>{
//     button.addEventListener('click',localItem)
// });

// Select Container Element
// const questionContainer = document.querySelector(".container");

// // Listen For Clicks Within Container
// questionContainer.onclick = function (event) {
//     // Prevent default behavior of button
//     event.preventDefault();

//     // Store Target Element In Variable
//     const element = event.target;

//     // If Target Element Is a Button
//     if (element.nodeName === 'BUTTON') {
//         // Event Code
//     }
//}

// console.log(hurt);
// console.log(main)
// console.log(search);

const API_KEY = "d217ecceb45ac547f9a8da76471f024c";

let POPULAR = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

let IMG_URL = "https://image.tmdb.org/t/p/w500/";

let SEARCH__URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

getMovies(POPULAR);

function getMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showMovies(data.results);
      localItem(data.results);

      // console.log(data);
      localStorage.setItem("allData", JSON.stringify(data.results));
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
      }
    });
}
// let allData = JSON.parse(localStorage.getItem('allData'));
// let cart = JSON.parse(localStorage.getItem('cart'));
// console.log(allData);

//  function addToCard(){
//      let
//      let movieId = allData.find(movies=> movies.id ===id);
//      if(cart.length===0){
//          cart.push(movieId);
//      }else{
//          let response = cart.find( el=> el.id ==id)
//          if(response===undefined){
//              cart.push(movieId)
//          }
//      }
//      localStorage.setItem('cart', JSON.stringify(cart))

//  }
// const addFavorite = (el) => {
//     console.log("hello");
//   localStorage.setItem("movie", JSON.stringify(el));

//   };

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((el) => {
    //     const {backdrop_path, title, vote_average,overview} =el;
    var movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.setAttribute("id", `${el.id}`);
    movieEl.innerHTML = `
       
            <img src="${IMG_URL + el.backdrop_path}" alt="image">
            <div class="movie__info">
             
                <h3>${el.title ? el.title : "No name Sorry"}</h3>
                <span class="${getColor(el.vote_average)}">${
      el.vote_average
    }</span>    
            </div>
            <div class="overview">

            <p>  <h3> ${el.title ? el.title : "No name Sorry"}</h3>
            ${el.overview} </p>

                <div class="favorite">  </div>
                
             </div>
           `;

    main.appendChild(movieEl);
  });
}

function localItem(data) {
  let movie = document.querySelectorAll(".movie");

  for (let i = 0; i < movie.length; i++) {
    console.log();
    let btn = movie[i].querySelector(".favorite");

    btn.addEventListener("click", () => {
      btn.classList.toggle("favoriteClicked");

      let id = movie[i].id;

      let movieItem = data.find((el) => {
        return el.id === Number(id);
      });

      console.log(movieItem);
      let cart1 = JSON.parse(localStorage.getItem("cart"));

      if (cart1.length == 0) {
        cart1.push(movieItem);
      } else {
        let response = cart1.find((el) => {
          el.id == id;
        });

        if (response === undefined) {
          cart1.push(movieItem);
        }
      }

      console.log(cart1);
      localStorage.setItem("cart", JSON.stringify(cart1));
    });
  }
}

favoriteBtn.addEventListener("click", showFavorite);

function showFavorite() {
  let cart2 = JSON.parse(localStorage.getItem("cart"));

  main.innerHTML = "";

  cart2.forEach((el) => {
    //     const {backdrop_path, title, vote_average,overview} =el;
    let movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.setAttribute("id", `${el.id}`);
    movieEl.innerHTML = `
             
                  <img src="${IMG_URL + el.backdrop_path}" alt="image">
                  <div class="movie__info">
                   
                      <h3>${el.title ? el.title : "No name Sorry"}</h3>
                      <span class="${getColor(el.vote_average)}">${
      el.vote_average
    }</span>    
                  </div>
      
                  <div class="overview">

                        <p>  <h3> ${el.title ? el.title : "No name Sorry"}</h3>
                        ${el.overview} </p>
                <div id="delete">  </div>

             </div>
                  `;
    removeItem(movieEl);
    main.appendChild(movieEl);
  });
  removeItem();
}

function getColor(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchItem = search.value;
  // console.log(searchItem)

  if (searchItem) {
    getMovies(SEARCH__URL + searchItem);
  }
});

function removeItem() {
  let main = document.querySelectorAll(".movie");
    
  
      for (let i = 0; i < main.length; i++) {
        let btn = main[i].querySelector('#delete');
         console.log(btn);

        btn.addEventListener("click", (e) => {
            
        let id = main[i].id;
        console.log(id)
        
        let cart3 = JSON.parse(localStorage.getItem("cart"));
        let movieItem = cart3.find((el) => {
            return el.id === Number(id);
          });
          console.log(movieItem)
            let movie = cart3.filter((el) => {
                        return el.id != Number(id) });

          localStorage.setItem('cart', JSON.stringify(movie));
          let target = e.target;
          target.parentElemet.parentElement.remove();
        });

      }
  }
