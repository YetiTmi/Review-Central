console.log('index.js');

const indexFooder = document.querySelector('#indexFeed');

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    indexFooder.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      div.className = 'box';
      const product = document.createElement('div');
      product.className = 'productName';
      //.likeDiv >  .likeIcon
      //const likeNo = document.createElement('p');
      //likeNo.className = 'likeNo';
       const likeIcon = document.createElement('i');
       likeIcon.className = 'far fa-thumbs-up fa-fw';
      const likeDiv = document.createElement('div');
      likeDiv.className = 'likeDiv';
      likeDiv.innerHTML = image.likes;
      likeDiv.appendChild(likeIcon);
      //likeDiv.appendChild(likeNo);
      //.info > .productName + .likeDiv
      const info = document.createElement('div');
      info.className = 'info';
      info.appendChild(product);
      info.appendChild(likeDiv);
      //.box > img + .info
      product.innerHTML = image.product;
      const img = document.createElement('img');
      img.src = 'medium/' + image.image;
      div.appendChild(img);
      div.appendChild(info);
      //li > .box
      li.appendChild(div);
      indexFooder.appendChild(li);
    });
  });
};
getImages();