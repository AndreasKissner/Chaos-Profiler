const version = new Date().getTime(); 
document.getElementById("styleLink").href = `./style.css?v=${version}`;
