
document.addEventListener('DOMContentLoaded', (event) => {
  // console.log('DOM fully loaded and parsed');
  const rangeElement = document.getElementById('range-input');
  rangeElement.addEventListener('touchmove', function(event){
  event.preventDefault();
    
  });   
  console.log("browser support", rangeElement)
});