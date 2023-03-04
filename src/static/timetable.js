function showField() {
  var elem = document.getElementById("Question");
  if(elem.style.display == "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

var expand = document.getElementById("survey");
expand.addEventListener("click", showField);
