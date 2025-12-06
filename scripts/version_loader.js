const version = new Date().getTime(); 
document.getElementById("styleLink").href = `./style.css?v=${version}`;
const style = document.getElementById("styleLink");
style.onload = () => {
  document.body.style.visibility = "visible";
};
