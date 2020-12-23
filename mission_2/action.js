function right_move1(){
  currentImage = document.querySelector('.active1');
  
  if(currentImage){
    nextImage = currentImage.nextElementSibling;
    currentImage.classList.remove('active1');
    
    if(nextImage){
      nextImage.classList.add('active1');
    }
    else{
      firstImage1.classList.add('active1');      
    }
  }
}

function left_move1(){
  currentImage = document.querySelector('.active1');

  if (currentImage){
    prevImage = currentImage.previousElementSibling;
    currentImage.classList.remove('active1');

    if(prevImage){
      prevImage.classList.add('active1');
    }
    else{
      lastImage1.classList.add('active1');
    }
  }
}

function right_move2(){
  currentImage = document.querySelector('.active2');
  
  if(currentImage){
    nextImage = currentImage.nextElementSibling;
    currentImage.classList.remove('active2');
    
    if(nextImage){
      nextImage.classList.add('active2');
    }
    else{
      firstImage2.classList.add('active2');
    }
  }
}

function left_move2(){
  currentImage = document.querySelector('.active2');

  if (currentImage){
    prevImage = currentImage.previousElementSibling;
    currentImage.classList.remove('active2');

    if(prevImage){
      prevImage.classList.add('active2');
    }
    else{
      lastImage2.classList.add('active2');
    }
  }
}