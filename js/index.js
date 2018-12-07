console.log("index.js");

const indexFooder = document.querySelector('#indexFeed');

const getImages = () => {
    fetch('/images').then((response) => {
      return response.json();
    }).then((json) => {
      indexFooder.innerHTML = '';
      json.forEach((image) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const product = document.createElement('p');
        const like = document.createElement('p');
        like.innerHTML = image.likes;
        product.innerHTML = image.product;
        const img = document.createElement('img');
        img.src = 'medium/' + image.image;
        div.appendChild(img);
        div.appendChild(product);
        div.appendChild(like);
        li.appendChild(div);
        indexFooder.appendChild(li);
      });
    });
  };
getImages();