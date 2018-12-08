'use strict';

const feed = document.querySelector('#imagefeed');

const sFrm = document.querySelector('#searchform');
const searchinput = document.querySelector('#searchinput');

const phone = document.querySelector('#phone');
const television = document.querySelector('#television');
const computer = document.querySelector('#computer');
const tablet = document.querySelector('#tablet');

const phoneform = document.querySelector('#phoneform');
const televisionform = document.querySelector('#tvform');
const computerform = document.querySelector('#computerform');
const tabletform = document.querySelector('#tabletform');

const categoryImages = (cat) => {
    fetch('/images').then((response) => {
        return response.json();
    }).then((json) => {
        //console.log(json);
        console.log('Searching for -> ' + cat);
        feed.innerHTML = '';
        json.forEach((image) => {
            if(image.category === cat){
                const li = document.createElement('li');
                const div = document.createElement('div');
                const product = document.createElement('h3');
                const like = document.createElement('h2');
                product.innerHTML = image.product;
                like.innerHTML = image.likes;
                li.appendChild(product);
                const img = document.createElement('img');
                img.src = 'thumbs/' + image.thumbnail;
                div.appendChild(img);
                div.appendChild(product);
                div.appendChild(like);
                li.appendChild(div);
                feed.appendChild(li);
            } else if(cat === '' || cat === ' ') {
                getImages();
            };
        });
    });
};

const searchImages = (stars) => {
    fetch('/images').then((response) => {
        return response.json();
    }).then((json) => {
        //console.log(json);
        console.log('Searching for -> ' + stars);
        feed.innerHTML = '';
        console.log(searchinput.value);
        searchinput.value = '';
        json.forEach((image) => {
            if(image.stars === stars){
                const li = document.createElement('li');
                const div = document.createElement('div');
                const product = document.createElement('h3');
                const like = document.createElement('h2');
                product.innerHTML = image.product;
                like.innerHTML = image.likes;
                li.appendChild(product);
                const img = document.createElement('img');
                img.src = 'thumbs/' + image.thumbnail;
                div.appendChild(img);
                div.appendChild(product);
                div.appendChild(like);
                li.appendChild(div);
                feed.appendChild(li);
            } else if(stars === '' || stars === ' ') {
                getImages();
            };
        });
    });
};

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    //console.log(json);
    feed.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      const product = document.createElement('h3');
      const like = document.createElement('h2');
      product.innerHTML = image.product;
      like.innerHTML = image.likes;
      li.appendChild(product);
      const img = document.createElement('img');
      img.src = 'medium/' + image.image;
      div.appendChild(img);
      div.appendChild(product);
      div.appendChild(like);
      li.appendChild(div);
      feed.appendChild(li);
    });
  });
};



const searchForm = (evt) => {
    evt.preventDefault();
    fetch('/search').then((response) => {
        return response.json();
    }).then((json) => {
        //console.log(json);
        if(searchinput.isEmpty){
            searchImages.evt;
        } else {
            const searchword = searchinput.value.toUpperCase();
            searchImages(searchword);
        };
    });
};

const phoneForm = (evt) => {
    evt.preventDefault();
    fetch('/phone').then((response) => {
        return response.json();
    }).then((json) => {
        const searchword = phone.value;
        categoryImages(searchword);
    });
};
const televisionForm = (evt) => {
    evt.preventDefault();
    fetch('/television').then((response) => {
        return response.json();
    }).then((json) => {
        const searchword = television.value;
        categoryImages(searchword);
    });
};
const computerForm = (evt) => {
    evt.preventDefault();
    fetch('/computer').then((response) => {
        return response.json();
    }).then((json) => {
        const searchword = computer.value;
        categoryImages(searchword);
    });
};
const tabletForm = (evt) => {
    evt.preventDefault();
    fetch('/tablet').then((response) => {
        return response.json();
    }).then((json) => {
        const searchword = tablet.value;
        categoryImages(searchword);
    });
};



//Search form
sFrm.addEventListener('submit', searchForm);

//Forms for category buttons
phoneform.addEventListener('submit', phoneForm);
televisionform.addEventListener('submit', televisionForm);
computerform.addEventListener('submit', computerForm);
tabletform.addEventListener('submit', tabletForm);

getImages();