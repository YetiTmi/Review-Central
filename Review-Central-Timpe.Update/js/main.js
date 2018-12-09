'use strict';
console.log("main.js");
const list = document.querySelector('#user');
const ownFeed = document.querySelector('#Ownfeed');
const updateForm = document.querySelector('#updateform');

const getUser = () => {
  fetch('/users').then((response) => {
    console.log("fetch user");
    return response.json();
  }).then((json) => {
    json.forEach((user) => {
      document.getElementById('user').appendChild(constructUser(user));
      console.log(list);
    });
  });
};
const constructUser = (user) => {
  const li = document.createElement('li');
  const title = document.createElement('h3');
  const posts = document.createElement('p');
  title.innerHTML = user.username;
  posts.innerHTML = user.posts;
  li.appendChild(title);
  li.appendChild(posts);
  console.log("User constructed");
  return li;
};

const userposts = () => {
  fetch('/userPosts').then((response) => {
    console.log("fetch users posts");
    return response.json();
  }).then((json) => {
    
    // list.innerHTML = '';
    json.forEach((image) => {
      buildUserPosts(image);
    });
  });
};

const buildUserPosts = (image) => {
  const li = document.createElement('li');
  const container = document.createElement('div');
  container.className = 'container';
  const product = document.createElement('div');
  product.className='productName';
  const like = document.createElement('div');
  like.className='likeNo';
  product.innerHTML = image.product;
  like.innerHTML = image.likes;
  const likeIcon = document.createElement('i');
  likeIcon.className = 'far fa-thumbs-up ';
  like.appendChild(likeIcon);
  //li.appendChild(product);
  const img = document.createElement('img');
  const update = document.createElement('button');
  update.innerHTML = 'update';
  const deleteImg = document.createElement('button');
  deleteImg.innerHTML = 'delete';
  img.src = 'thumbs/' + image.thumbnail;
  update.addEventListener('click', () => {
    showForm(image);
  });
  const riseDiv = document.createElement('div');
  riseDiv.className = 'overlay';
  const deleteForm = addDelete(image);
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'buttonDiv';
  const info = document.createElement('div');
  info.className='info';
  buttonDiv.appendChild(update);
  buttonDiv.appendChild(deleteForm);
  info.appendChild(product);
  info.appendChild(like);
  riseDiv.appendChild(info);
  riseDiv.appendChild(buttonDiv);
  container.appendChild(riseDiv);
  container.appendChild(img);
  li.appendChild(container);
  console.log(li);
  ownFeed.appendChild(li);
};

const addDelete = (image) => {
  const form = document.createElement('form');
  form.action = "/delete";
  form.id = "deleteform";
  const inputId = document.createElement('input');
  inputId.name = "id";
  inputId.value = image.id;
  inputId.hidden= true;
  const sendButton = document.createElement('button');
  sendButton.type = "delete";
  sendButton.id = "but";
  sendButton.innerHTML = "delete";
  form.appendChild(inputId);
  form.appendChild(sendButton);
  return form;
}
const showForm = (img) => {

  document.querySelector('#updateform input[name=id]').value = img.id;
  updateForm.removeAttribute('hidden');
};

const deleteImgs = (img) => {
  console.log('delete' + JSON.stringify(img));
};

userposts();
getUser();