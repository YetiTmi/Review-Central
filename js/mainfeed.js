'use strict';
console.log("mainfeed.js");

const fileInput = document.querySelector('#pic');
const upform = document.querySelector('#uploadform');
const feed = document.querySelector('#imagefeed');
var username = "";
var likes = [];
//get user!
const getuser = () => {
  fetch('/users').then((response) => {
    console.log("fetch users posts");
    return response.json();
  }).then((user) => {
    user.forEach((userdata) => {
      username = userdata.username;
    });
    //get from an object
    //Give the user here and check if it matches with the image owner...
  });
};

const getuserslike = () => {
  fetch('/user_likes').then((response) => {
    console.log("fetch user likes");
    return response.json();
  }).then((data) => {
    console.log("data", data);
    data.forEach((userAndLike)=>{
      console.log("data.forEach", userAndLike.Review_id);
      likes.push(userAndLike.Review_id)
    });
    console.log("Array", likes);
    //get from an object
    //Give the user here and check if it matches with the image owner...
  });
}

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    feed.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      div.className ="box";
      const product = document.createElement('div');
      product.className='productName';
      //const likeNo = document.createElement('h2');
      product.innerHTML = image.product;
      //likeNo.innerHTML = image.likes;
      const img = document.createElement('img');
      img.src = 'medium/' + image.image;
      const info = document.createElement('div');
      info.className= "info";
      const likeButton = makeLike(image);
      const likeDiv = document.createElement('div');
      likeDiv.className = "likeDiv";
      likeDiv.innerHTML = image.likes;
      likeDiv.appendChild(likeButton);
      info.appendChild(product);
      info.appendChild(likeDiv);
      div.appendChild(img);
      div.appendChild(info);
      li.appendChild(div);
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
  const likeIcon = document.createElement('i');
  likeIcon.className = 'far fa-thumbs-up ';
  sendButton.appendChild(likeIcon);
  //sendButton.innerHTML = "like";
  if(image.owner == username || likes.includes(image.id)){
    sendButton.setAttribute("disabled", true);
  }
  form.appendChild(inputId);
  form.appendChild(sendButton);
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

getuser();
getuserslike();
getImages();
