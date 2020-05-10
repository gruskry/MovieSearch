var articles = new Array();
var pages = new Array();
var push_apply = Function.apply.bind([].push);
var slice_call = Function.call.bind([].slice);

var slideIndex = []
Object.defineProperty(Array.prototype, "pushArrayMembers", {
    value: function() {
        for (var i = 0; i < arguments.length; i++) {
            var to_add = arguments[i];
            for (var n = 0; n < to_add.length; n+=300) {
                push_apply(this, slice_call(to_add, n, n+300));
            }
        }
    }
});


async function getBaseTitle(page) {

    const url = `https://www.omdbapi.com/?s=cops&page=${page}&apikey=abbbd99b`;
    const res = await fetch(url);
    const data = await res.json();

    articles.pushArrayMembers(data.Search);
    startApp();   
}

function getIndex () {
    var unit = document.querySelectorAll('.slide');
    for(var i = 0; i < unit.length; i++) {  
    (function(i) {
        var index = unit[i].getAttribute('data-index');
        const rate = document.querySelectorAll('.film-rating');
        const url = `https://www.omdbapi.com/?i=${articles[index].imdbID}&apikey=abbbd99b`;

        return fetch(url)
        .then(res => res.json())
        .then(data => {
            articles[index].imdbID = data.imdbRating;
            rate[index].innerHTML = `imbdRating: ${data.imdbRating}`;
        });
           
    })(i);
}
}

const articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;
  
    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-card');
        ARTICLE_LIST_NODE = document.querySelector('.swiper-container');
    }
  
    function insertArticlesInDOM(articles) {
        const articlesNodes = renderArticles(articles);
        articlesNodes.forEach((node) => {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }   
  
    function renderArticles(articles) {
        return articles.map((article, index) => renderArticle(article, index));
    }
    
    function renderArticle(article, index) {
        const template = ARTICLE_TEMPLATE;
        
        template.content.querySelector('.slide').dataset.index = index;
        template.content.querySelector('.film-name').innerHTML = article.Title;
        template.content.querySelector('.film-poster').setAttribute('src', article.Poster);
        template.content.querySelector('.film-date').innerHTML = article.Year;
        template.content.querySelector('.film-rating').innerHTML = article.imdbID;

        return template.content.querySelector('.slide').cloneNode(true); 
    }
      
    return {
      init,
      insertArticlesInDOM,
  };
}());
  
  function startApp() {
   articleRenderer.init();
   articleRenderer.insertArticlesInDOM(articles);
   getIndex();
   
  }

  function addScript(src){
    var script = document.createElement('script');
    script.src = src;
    script.async = false; 
    document.body.appendChild(script);
  }

  getBaseTitle();
 
  window.onload = function () {
    addScript('slick/slick.min.js');
    addScript('slick.js');
    addScript('search.js');
 
}
