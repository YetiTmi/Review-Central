'use strict';
console.log("mainfeed.js");

const fileInput = document.querySelector('#pic');
const upform = document.querySelector('#uploadform');
const feed = document.querySelector('#imagefeed');

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    feed.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const product = document.createElement('h3');
      const like = document.createElement('h2');
      product.innerHTML = image.product;
      like.innerHTML = image.likes;
      li.appendChild(product);
      const img = document.createElement('img');
      img.src = 'medium/' + image.image;
      const likeButton = makeLike(image);
      li.appendChild(likeButton);
      li.appendChild(like);
      li.appendChild(img);
      feed.appendChild(li);
    });
  });
};

const makeLike = (image) => {
  const form = document.createElement('form');
  form.action = "/likeImage";
  form.id = "likeImage";
  const inputId = document.createElement('input');
  inputId.name = "id";
  inputId.value = image.id;
  inputId.hidden= true;
  const sendButton = document.createElement('button');
  sendButton.type = "Like";
  sendButton.id = "likeButton";
  sendButton.innerHTML = "like";
  form.appendChild(inputId);
  form.appendChild(sendButton);
  console.log(form);
  return form;
}


const sendForm = (evt) => {
  console.log('sendForm()');
  evt.preventDefault();
  const fd = new FormData(upform);
  const settings = {
    method: 'post',
    body: fd,
  };
  fetch('/upload', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    getImages();
  });
};

const check = () => {
  if (!fileInput.isEmpty) {
    document.querySelector('#ButtonSend').removeAttribute('disabled');
  }
};

upform.addEventListener('submit', sendForm);

getImages();