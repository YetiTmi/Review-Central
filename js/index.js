console.log("index.js");

const indexFooder = document.querySelector('#indexFeed');

const getImages = () => {
    fetch('/images').then((response) => {
      return response.json();
    }).then((json) => {
      indexFooder.innerHTML = '';
      json.forEach((image) => {
        const li = document.createElement('li');
        const product = document.createElement('h3');
        const like = document.createElement('h3');
        like.innerHTML = image.likes;
        product.innerHTML = image.product;
        li.appendChild(product);
        const img = document.createElement('img');
        img.src = 'medium/' + image.image;
        li.appendChild(like);
        li.appendChild(img);
        indexFooder.appendChild(li);
      });
    });
  };
getImages();