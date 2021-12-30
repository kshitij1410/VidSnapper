// Global Vars
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');//Take Photo
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');
// var selection=document.getElementsByClassName('selection');
var arr= [];      

const downLoad = document.getElementById('download-button');
downLoad.addEventListener('click',downloadImage)

// Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function(stream) {
    // Link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
  })
  .catch(function(err) {
    console.log(`Error: ${err}`);
  });

  // Play when ready
  video.addEventListener('canplay', function(e) {
    console.log('are you sure');
    if(!streaming) {
      // Set video / canvas heigh
      
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      // canvas.setAttribute('width', width);
      // canvas.setAttribute('height', height);

      streaming = true;
    }
  }, false);

  // Photo button event
  photoButton.addEventListener('click', function(e) {
    takePicture();

    e.preventDefault();
  }, false);

  // Filter event
  photoFilter.addEventListener('change', function(e) {
    // Set filter to chosen option
    filter = e.target.value;
    // Set filter to video
    video.style.filter = filter;

    e.preventDefault(); 
  });

  // Clear event
  clearButton.addEventListener('click', function(e) {
    // Clear photos
    photos.innerHTML = '';
    // Change filter back to none
    filter = 'none';
    downLoad.style.display="none"
    // Set video filter
    video.style.filter = filter;
    // Reset select list
    photoFilter.selectedIndex = 0;
  });

  // Take picture from canvas
  function takePicture() {
    // Create canvas
    const context = canvas.getContext('2d');
    if(width && height) {
      // set canvas props
      canvas.width = width;
      canvas.height = height;
      // Draw an image of the video on the canvas
      context.drawImage(video, 0, 0, width, height);

      // Create image from the canvas
      const imgUrl = canvas.toDataURL('image/png');
     
      // Create img element
      const img = document.createElement('img');
      
      // Set img src
      img.setAttribute('src', imgUrl);

      // Set image filter
      img.style.filter = filter;
 
      // 
      // var select=document.createElement('select');
      // select.style.width="60px";
      // select.style.height="20px";

      // var option=document.createElement('option');
      // option.value="none"
      // option.innerHTML=':';
      // select.appendChild(option);

      // var option1=document.createElement('option');
      // option1.value="delete"
      // option1.innerHTML='Delete';
      // select.appendChild(option1);
      // var option2=document.createElement('option');
      // option2.value="download"
      // option2.innerHTML='Download';
      // select.appendChild(option2);

      // console.log(select);
      // selection.firstChild(select);
      // console.log(selection);
      // Add image to photos
      // photos.style.marginLeft='0px'
     
      // photos.appendChild(select);
      

      arr.push(img);
      
      photos.appendChild(img);
      downLoad.style.display="block"
    }
  }
  // console.log(arr);

  function downloadImage() {
    // var download = document.getElementById("download");

  //  var temp=img.substring('22',img.length-1)
    // console.log(arr)
    arr.forEach((photo) => {
      var canvas = document.getElementById("mcanvas");
      image = photo.currentSrc;
      var link = document.createElement('a');
      link.download = "my-image.jpeg";
      link.href = image;
      link.click();
    });
    
    //download.setAttribute("download","archive.png");
    }