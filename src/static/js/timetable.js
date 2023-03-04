function showField() {
  var elem = document.getElementById("Question");
  if(elem.style.display == "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

function update() {
  var table = document.getElementById("table");
  var type = document.getElementById("coursetype").value;
  var grade = parseInt(document.getElementById("grade").value);
  var block = parseInt(document.getElementById("courseblock").value);
  var code = document.getElementById("newcourse").value;
  if(block <= 8 && type == "dayschool") {
    table.rows[block + 1].cells[grade].getElementsByClassName("fake-input-field").value = code;
  } else if(block <= 2 && type == "summerschool") {
    table.rows[block + 10].cells[grade].innerHTML = code;
  } else if(block <= 2 && type == "nightschool") {
    table.rows[block + 13].cells[grade].innerHTML = code;
  } else if(block <= 1 && type == "repertoire") {
    table.rows[block + 16].cells[grade].innerHTML = code;
  }
}

function reset() {
  for(var i=2; i<10; i++) {
    for(var j=0; j<4; j++) {
      table.rows[i].cells[j].innerHTML = "Course " + (i - 1);
    }
  }
  for(var i=11; i<13; i++) {
    for(var j=0; j<4; j++) {
      table.rows[i].cells[j].innerHTML = "Summer School " + (i - 10);
    }
  }
  for(var i=14; i<16; i++) {
    for(var j=0; j<4; j++) {
      table.rows[i].cells[j].innerHTML = "Night School " + (i - 13);
    }
  }
  for(var j=0; j<4; j++) {
    table.rows[17].cells[j].innerHTML = "Repertoire 1";
  }
}

function standard() {
  reset();
  table.rows[2].cells[0].innerHTML = "English Gr.9 (ENG1D)";
  table.rows[2].cells[1].innerHTML = "English Gr.10 (ENG2D)";
  table.rows[2].cells[2].innerHTML = "English Gr.11 (ENG3U)";
  table.rows[2].cells[3].innerHTML = "English Gr.12 (ENG4U)";
  table.rows[3].cells[0].innerHTML = "Principles of Mathematics Gr.9 (MPM1D)";
  table.rows[3].cells[1].innerHTML = "Principles of Mathematics Gr.10 (MPM2D)";
  table.rows[3].cells[2].innerHTML = "Functions Gr.11 (MCR3U)";
  table.rows[4].cells[0].innerHTML = "Science Gr.9 (SNC1D)";
  table.rows[4].cells[1].innerHTML = "Science Gr.10 (SNC2D)";
  table.rows[5].cells[0].innerHTML = "Issues in Canadian Geography Gr.9 (CGC1D)";
  table.rows[5].cells[1].innerHTML = "Canadian History since World War I Gr.10 (CHC2D)";
  table.rows[6].cells[0].innerHTML = "Core French Gr.9 (FSF1D)";
  table.rows[6].cells[1].innerHTML = "Civics and Citizenship Gr.10 (CHV2O)";
  table.rows[7].cells[0].innerHTML = "Healthy Active Living Education Gr.9 (PPL1O)";
}

var expand = document.getElementById("survey");
expand.addEventListener("click", showField);

let minDis = [
  [0,0,0,22,22,22,22,22,22,22,75,75,11,11,55,55,17,17,16,16,16,26,26,26,26,1,1],
[0,0,0,22,22,22,22,22,22,22,75,75,11,11,55,55,17,17,16,16,16,26,26,26,26,1,1],
[0,0,0,22,22,22,22,22,22,22,75,75,11,11,55,55,17,17,16,16,16,26,26,26,26,1,1],
[121,121,121,0,0,0,0,0,0,0,125,125,6,6,106,106,5,5,6,6,6,16,16,16,16,7,7],
[121,121,121,0,0,0,0,0,0,0,125,125,6,6,106,106,5,5,6,6,6,16,16,16,16,7,7],
[121,121,121,0,0,0,0,0,0,0,125,125,6,6,106,106,5,5,6,6,6,16,16,16,16,7,7],
[121,121,121,0,0,0,0,0,0,0,125,125,6,6,106,106,5,5,6,6,6,16,16,16,16,7,7],
[121,121,121,0,0,0,0,0,0,0,125,125,6,6,106,106,5,5,6,6,6,16,16,16,16,7,7],
[121,121,121,0,0,0,0,0,0,0,125,125,6,6,106,106,5,5,6,6,6,16,16,16,16,7,7],
[121,121,121,0,0,0,0,0,0,0,125,125,6,6,106,106,5,5,6,6,6,16,16,16,16,7,7],
[50,50,50,72,72,72,72,72,72,72,0,0,61,61,105,105,67,67,66,66,66,76,76,76,76,51,51],
[50,50,50,72,72,72,72,72,72,72,0,0,61,61,105,105,67,67,66,66,66,76,76,76,76,51,51],
[120,120,120,11,11,11,11,11,11,11,136,136,0,0,105,105,6,6,5,5,5,15,15,15,15,1,1],
[120,120,120,11,11,11,11,11,11,11,136,136,0,0,105,105,6,6,5,5,5,15,15,15,15,1,1],
[15,15,15,26,26,26,26,26,26,26,90,90,21,21,0,0,21,21,20,20,20,20,20,20,20,16,16],
[15,15,15,26,26,26,26,26,26,26,90,90,21,21,0,0,21,21,20,20,20,20,20,20,20,16,16],
[116,116,116,5,5,5,5,5,5,5,130,130,1,1,101,101,0,0,1,1,1,11,11,11,11,2,2],
[116,116,116,5,5,5,5,5,5,5,130,130,1,1,101,101,0,0,1,1,1,11,11,11,11,2,2],
[115,115,115,6,6,6,6,6,6,6,131,131,1,1,100,100,1,1,0,0,0,10,10,10,10,2,2],
[115,115,115,6,6,6,6,6,6,6,131,131,1,1,100,100,1,1,0,0,0,10,10,10,10,2,2],
[115,115,115,6,6,6,6,6,6,6,131,131,1,1,100,100,1,1,0,0,0,10,10,10,10,2,2],
[136,136,136,15,15,15,15,15,15,15,140,140,21,21,121,121,20,20,21,21,21,0,0,0,0,22,22],
[136,136,136,15,15,15,15,15,15,15,140,140,21,21,121,121,20,20,21,21,21,0,0,0,0,22,22],
[136,136,136,15,15,15,15,15,15,15,140,140,21,21,121,121,20,20,21,21,21,0,0,0,0,22,22],
[136,136,136,15,15,15,15,15,15,15,140,140,21,21,121,121,20,20,21,21,21,0,0,0,0,22,22],
[130,130,130,21,21,21,21,21,21,21,146,146,10,10,115,115,16,16,15,15,15,25,25,25,25,0,0],
[130,130,130,21,21,21,21,21,21,21,146,146,10,10,115,115,16,16,15,15,15,25,25,25,25,0,0]
]
