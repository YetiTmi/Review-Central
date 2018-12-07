'use strict';

const fileInput = document.querySelector('#pic');
const upform = document.querySelector('#uploadform');
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
                const product = document.createElement('h3');
                const like = document.createElement('h2');
                product.innerHTML = image.product;
                like.innerHTML = image.likes;
                li.appendChild(product);
                const img = document.createElement('img');
                img.src = 'thumbs/' + image.thumbnail;
                const likeButton = makeLike(image);
                li.appendChild(likeButton);
                li.appendChild(like);
                li.appendChild(img);
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
                const title = document.createElement('h3');
                const like = document.createElement('h2');
                title.innerHTML = image.product;
                like.innerHTML = image.likes;
                li.appendChild(title);
                const img = document.createElement('img');
                img.src = 'thumbs/' + image.thumbnail;
                const likeButton = makeLike(image);
                li.appendChild(likeButton);
                li.appendChild(like);
                li.appendChild(img);
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
        const postedBy = document.createElement('h2');
        const li = document.createElement('li');
        const product = document.createElement('h3');
        const like = document.createElement('h2');
        postedBy.innerHTML = "Review By: " + image.owner;
        product.innerHTML = image.product;
        like.innerHTML = image.likes;
        li.appendChild(product);
        const img = document.createElement('img');
        img.src = 'medium/' + image.image;
        const likeButton = makeLike(image);
        li.appendChild(postedBy);
        li.appendChild(likeButton);
        li.appendChild(like);
        li.appendChild(img);
        feed.appendChild(li)
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
    if(image.owner == username || likes.includes(image.id)){
      sendButton.setAttribute("disabled", true);
    }
    form.appendChild(inputId);
    form.appendChild(sendButton);
    return form;
  
  }


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

//Check if file is selected
const check = () => {
  if (!fileInput.isEmpty) {
    document.querySelector('#ButtonSend').removeAttribute('disabled');
  }
};

//Upload form
upform.addEventListener('submit', sendForm);
//Search form
sFrm.addEventListener('submit', searchForm);

//Forms for category buttons
phoneform.addEventListener('submit', phoneForm);
televisionform.addEventListener('submit', televisionForm);
computerform.addEventListener('submit', computerForm);
tabletform.addEventListener('submit', tabletForm);

getuser();
getuserslike();
getImages();