const form_search = document.querySelector('form');
const input_form = document.querySelector('#input_form');
const resultsSection = document.querySelector('.slick-track');
const notFound = document.querySelector('.notFound');

var movie = new Array();

// for (var i = 0; i < slideIndex.length; i++) {
//     li = document.createElement("li");
//     li.innerText = "NewLi";
//     uls[i].appendChild(li);

// }
document.querySelector('.search-clear').onclick = function () {
    input_form.value = "";
}
form_search.addEventListener('submit', formSubmitted);   

async function formSubmitted(event) {
    event.preventDefault();
  
  try {

    getResults()
    
  } catch(error) {
    showError();
    console.log(error);
  }
}

function getResults() {
    const searchTerm = input_form.value;
    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=abbbd99b`;
    
        return fetch(url)
        .then(res => res.json())
        .then(data => {
        movie = data.Search;
        data.Error ? showError() : getMovieTemplate();
        });
    }

function getMovieTemplate() {
    loader ();
    let slide = document.querySelector('.slick-track').querySelectorAll('.slick-slide');
    notFound.innerText = "";  
    slide.forEach((e) => {
       let index = e.getAttribute('data-index');
        e.querySelector('.film-name').innerHTML = movie[index].Title;
        e.querySelector('.film-poster').setAttribute('src', movie[index].Poster);
        e.querySelector('.film-date').innerHTML = movie[index].Year;
        
        getIndexNow ();
        nextPage ();
        prevPage();
    })
}

function showError() {
    notFound.innerHTML = "Movie not found!";
}


let page = 1;

function nextPage () {
    let preLoad = document.getElementById('slick-slide09').getAttribute('class');
    let nameClass = 'slide slick-slide slick-active';
    let nextButton = document.querySelector('.slick-next');

    document.querySelector('.slick-next').setAttribute('onclick','nextPage ()');
    nextButton.getAttribute('class') == 'slick-next slick-arrow slick-disabled' ? nextButton.setAttribute('onclick', 'nextPage ()') : nextButton.setAttribute('onclick', 'nextPage ()');
    if (preLoad == nameClass){
        page += 1;
        loadPage();
    }  
    else {page = page};
    
}

function prevPage () {
    let preLoad = document.getElementById('slick-slide01').getAttribute('class');
    let nameClass = 'slide slick-slide slick-active';
    let prevButton = document.querySelector('.slick-prev');

    document.querySelector('.slick-prev').setAttribute('onclick','prevPage ()');
    prevButton.getAttribute('class') == 'slick-prev slick-arrow slick-disabled' ? prevButton.setAttribute('onclick', 'prevPage ()') : prevButton.setAttribute('onclick', 'prevPage ()');
    if (preLoad == nameClass && page != 1){
        page -= 1;
        loadPage();
    }  
    else {page = page};
    
}


function loadPage () {
    if (page != 0) {
        const searchTerm = input_form.value;
        const url = `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=abbbd99b`;
        return fetch(url)
        .then(res => res.json())
        .then(data => {
        movie = data.Search;
        loader ();
        insertNewPage ();   
    }); 
}}
function insertNewPage (){
    let slide = document.querySelector('.slick-track').querySelectorAll('.slick-slide');

    slide.forEach((e) => {
       let index = e.getAttribute('data-index');
        e.querySelector('.film-name').innerHTML = movie[index].Title;
        e.querySelector('.film-poster').setAttribute('src', movie[index].Poster);
        e.querySelector('.film-date').innerHTML = movie[index].Year;
        
        
        getIndexNow ();
        
    })
    baseSlidePos ();
}

function baseSlidePos () {
    let currentPos = document.querySelector('div[data-index="0"]');
    let slides = document.querySelectorAll('.slide');
    let slickDots = document.querySelector('.slick-dots').querySelectorAll('li');
    let firstSlickDots = slickDots[0];
    let slickBtns = document.querySelectorAll('li > button');
    let firstSlickBtns = slickBtns[0];
    let lastSlickBtns = slickBtns[5];
    
    slickDots.forEach((e) => {
        e.setAttribute('class','')
        firstSlickDots.setAttribute('class','slick-active');
    })
    slides.forEach((e) => {
        e.setAttribute('class','slide slick-slide');
        
        currentPos.setAttribute('class','slide slick-slide slick-current slick-active');
        document.querySelector('div[data-index="1"]').setAttribute('class','slide slick-slide slick-active');
        document.querySelector('div[data-index="2"]').setAttribute('class','slide slick-slide slick-active');
        document.querySelector('div[data-index="3"]').setAttribute('class','slide slick-slide slick-active');
    })
    slickBtns.forEach((e) => {
    //    console.log(e.getAttribute('tabindex')) ;
    lastSlickBtns.setAttribute('tabindex','-1');
        // firstSlickBtns.setAttribute('aria-selected','true');
        firstSlickBtns.setAttribute('tabindex','0');
  
    })
}

function getIndexNow (){
    var unit = document.querySelectorAll('.slide');
    for(var i = 0; i < unit.length; i++) {  
        (function(i) {
            var index = unit[i].getAttribute('data-index');
            const rate = document.querySelectorAll('.film-rating');
            const url = `https://www.omdbapi.com/?i=${movie[index].imdbID}&apikey=abbbd99b`;

            return fetch(url)
            .then(res => res.json())
            .then(data => {
                movie[index].imdbID = data.imdbRating;
                rate[index].innerHTML = `imbdRating: ${data.imdbRating}`;
        });
           
        })(i);
    }   
}

function loader () {
    let load = document.querySelector('.load');
    load.style.display = 'block';
    setTimeout(() => {
        load.style.display = 'none';
    }, 2500);
}
