function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
    table.rows[block + 1].cells[grade].innerHTML = code;
  } else if(block <= 2 && type == "summerschool") {
    table.rows[block + 10].cells[grade].innerHTML = code;
  } else if(block <= 2 && type == "nightschool") {
    table.rows[block + 13].cells[grade].innerHTML = code;
  } else if(block <= 1 && type == "rep") {
    table.rows[block + 16].cells[grade].innerHTML = code;
  }
}

function reset() {
  var table = document.getElementById("table");
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
    table.rows[17].cells[j].innerHTML = "After School 1";
  }
}

function standard() {
  reset();
  var table = document.getElementById("table");
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

function random_shuffle(array) {
  var currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = rand(0, currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function generate() {
  var table = document.getElementById("table");
  var grade = parseInt(document.getElementById("question1").value);
  var rep = document.getElementById("question8").value;
  var spare = parseInt(document.getElementById("question6").value);
  var space = 0;
  var val = [0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f, 0x3f3f3f3f3f];
  var nameList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
  var vis = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var first = parseInt(document.getElementById("question2").value);
  var second = parseInt(document.getElementById("question3").value);
  var third = parseInt(document.getElementById("question4").value);
  var UCW = document.getElementById("question5").value;
  var visString = [];
  if(document.getElementById("question4").value == "npart") {
    val[0] = 2;
    val[1] = 2;
    val[2] = 2;
  } else if(document.getElementById("question4").value == "npbusinessstudies") {
    val[3] = 2;
    val[4] = 2;
    val[5] = 2;
    val[6] = 2;
  } else if(document.getElementById("question4").value == "npcanadianandworldstudies") {
    val[7] = 2;
    val[8] = 2;
    val[9] = 2;
  } else if(document.getElementById("question4").value == "nplanguages") {
    val[10] = 2;
    val[11] = 2;
  } else if(document.getElementById("question4").value == "npcomputerstudies") {
    val[12] = 2;
    val[13] = 2;
  } else if(document.getElementById("question4").value == "nphealthandphysicaleducation") {
    val[14] = 2;
    val[15] = 2;
  } else if(document.getElementById("question4").value == "npmathematics") {
    val[16] = 2;
    val[17] = 2;
  } else if(document.getElementById("question4").value == "npscience") {
    val[18] = 2;
    cal[19] = 2;
    val[20] = 2;
  } else if(document.getElementById("question4").value == "npsocialstudiesandhumanities") {
    val[21] = 2;
    val[22] = 2;
    val[23] = 2;
    val[24] = 2;
  } else if(document.getElementById("question4").value == "nptechnologicalstudies") {
    val[25] = 2;
    val[26] = 2;
  } else if(document.getElementById("question4").value == "npnopreference") {
    for(var i=0; i<27; i++) {
      val[i] = 2;
    }
  } else {
    val[third] = 2;
    for(var i=0; i<27; i++) {
      val[i] = Math.min(val[i], val[third] + minDis[third][i]);
    }
  }
  if(document.getElementById("question3").value == "npart") {
    val[0] = 1;
    val[1] = 1;
    val[2] = 1;
  } else if(document.getElementById("question3").value == "npbusinessstudies") {
    val[3] = 1;
    val[4] = 1;
    val[5] = 1;
    val[6] = 1;
  } else if(document.getElementById("question3").value == "npcanadianandworldstudies") {
    val[7] = 1;
    val[8] = 1;
    val[9] = 1;
  } else if(document.getElementById("question3").value == "nplanguages") {
    val[10] = 1;
    val[11] = 1;
  } else if(document.getElementById("question3").value == "npcomputerstudies") {
    val[12] = 1;
    val[13] = 1;
  } else if(document.getElementById("question3").value == "nphealthandphysicaleducation") {
    val[14] = 1;
    val[15] = 1;
  } else if(document.getElementById("question3").value == "npmathematics") {
    val[16] = 1;
    val[17] = 1;
  } else if(document.getElementById("question3").value == "npscience") {
    val[18] = 1;
    cal[19] = 1;
    val[20] = 1;
  } else if(document.getElementById("question3").value == "npsocialstudiesandhumanities") {
    val[21] = 1;
    val[22] = 1;
    val[23] = 1;
    val[24] = 1;
  } else if(document.getElementById("question3").value == "nptechnologicalstudies") {
    val[25] = 1;
    val[26] = 1;
  } else if(document.getElementById("question3").value == "npnopreference") {
    for(var i=0; i<27; i++) {
      val[i] = 1;
    }
  } else {
    val[second] = 1;
    for(var i=0; i<27; i++) {
      val[i] = Math.min(val[i], val[second] + minDis[second][i]);
    }
  }
  if(document.getElementById("question2").value == "npart") {
    val[0] = 0;
    val[1] = 0;
    val[2] = 0;
  } else if(document.getElementById("question2").value == "npbusinessstudies") {
    val[3] = 0;
    val[4] = 0;
    val[5] = 0;
    val[6] = 0;
  } else if(document.getElementById("question2").value == "npcanadianandworldstudies") {
    val[7] = 0;
    val[8] = 0;
    val[9] = 0;
  } else if(document.getElementById("question2").value == "nplanguages") {
    val[10] = 0;
    val[11] = 0;
  } else if(document.getElementById("question2").value == "npcomputerstudies") {
    val[12] = 0
    val[13] = 0;
  } else if(document.getElementById("question2").value == "nphealthandphysicaleducation") {
    val[14] = 0;
    val[15] = 0;
  } else if(document.getElementById("question2").value == "npmathematics") {
    val[16] = 0;
    val[17] = 0;
  } else if(document.getElementById("question2").value == "npscience") {
    val[18] = 0;
    cal[19] = 0;
    val[20] = 0;
  } else if(document.getElementById("question2").value == "npsocialstudiesandhumanities") {
    val[21] = 0;
    val[22] = 0;
    val[23] = 0;
    val[24] = 0;
  } else if(document.getElementById("question2").value == "nptechnologicalstudies") {
    val[25] = 0;
    val[26] = 0;
  } else if(document.getElementById("question2").value == "npnopreference") {
    for(var i=0; i<27; i++) {
      val[i] = 0;
    }
  } else {
    val[first] = 0;
    for(var i=0; i<27; i++) {
      val[i] = Math.min(val[i], val[first] + minDis[first][i]);
    }
  }
  nameList.sort((a, b) => val[a] - val[b]);
  for(var i=2; i<10; i++) {
    if(table.rows[i].cells[grade].innerHTML.substring(0, 6) == "Course") {
      space++;
    } else {
      visString.push(table.rows[i].cells[grade].innerHTML);
      for(var j=0; j<27; j++) {
        for(var k=0; k<coursetype[j].length; k++) {
          if(coursetype[j][k] == table.rows[i].cells[grade].innerHTML) {
            vis[j] = 1;
            break;
          }
        }
      }
    }
  }
  if(grade == 3) {
    space -= spare;
  }
  if(rep == "yesrep") {
    table.rows[17].cells[grade].innerHTML = "Repertoire";
  } else {
    table.rows[17].cells[grade].innerHTML = "After School 1";
  }
  var cnt = 1;
  while(cnt <= space) {
    var idx = rand(0, cnt + 10);
    while(vis[idx] == 1) {
      idx = rand(0, cnt + 10);
    }
    vis[idx] = 1;
    var exist = 0;
    for(var j=0; j<coursetype[idx].length; j++) {
      if(parseInt(coursetype[idx][j].charAt(coursetype[idx][j].length - 3)) == grade + 1 && 
        !(visString.includes(coursetype[idx][j])) && ((("DMOU".includes(coursetype[idx][j].charAt(coursetype[idx][j].length - 2)) && UCW == "unipathway")) || (UCW != "unipathway"))) {
        visString.push(coursetype[idx][j]);
        exist = 1;
        for(var k=2; k<10; k++) {
          if(table.rows[k].cells[grade].innerHTML.substring(0, 6) == "Course") {
            table.rows[k].cells[grade].innerHTML = coursetype[idx][j];
            break;
          }
        }
        if(exist == 1) {
          cnt++;
        }
        break;
      }
    }
  }
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
[130,130,130,21,21,21,21,21,21,21,146,146,10,10,115,115,16,16,15,15,15,25,25,25,25,0,0],
]

let coursetype = [
  ["Visual Arts Gr.9 (AVI1O)", "Visual Arts Gr.10 (AVI2O)", "Visual Arts Gr.11 (AVI3M)", "Visual Arts Gr.11 (AVI3O)", "Visual Arts Gr.12 (AVI4M)"],
  ["Drama Gr.9 (ADA1O)", "Drama Gr.10 (ADA2O)", "Drama Gr.11 (ADA3M)", "Drama Gr.11 (ADA3O)"],
  ["Music Gr.9 (AMU1O)", "Music Gr.10 (AMU2O)", "Music Gr.11 (AMU3M)", "Music Gr.12 (AMU4M)", "Repertoire"],
  ["Marketing: Goods Gr.11 (BMI3C)"],
  ["Financial Accounting Fundamentals Gr.11 (BAF3M)", "Financial Accounting Principles Gr.12 (BAT4M)"],
  ["Entrepreneurship: The Venture Gr.11 (BDI3C)"],
  ["International Business Fundamentals Gr.12 (BBB4M)", "Business Leadership: Management Fundamentals Gr.12 (BOH4M)"],
  ["Issues in Canadian Geography Gr.9 (CGC1D)", "Travel and Tourism: A Geographic Perspective Gr.11 (CGG3O)", "World Issues: A Geographic Analysis Gr.12 (CGW4U)"],
  ["Canadian History Since World War I Gr.10 (CHC2D)", "Canadian History Gr.10 (CHC2L)", "World History Since 1900: Global & Regional Interactions Gr.11 (CHT3O)", "World History to the End of the 15th Century Gr.11 (CHW3M)", "World History Since the Fifteenth Century Gr.12 (CHY4U)"],
  ["Understanding Canadian Law Gr.11 (CLU3M)", "Canadian and International Law Gr.12 (CLN4U)", "Canadian and World Politics Gr.12 (CPW4U)", "Analysing Current Economic Issues Gr.12 (CIA4U)", "The Individual and the Economy Gr.11 (CIE3M)"],
  ["English Gr.9 (ENG1D)", "English Gr.9 (ENG1P)", "English Gr.10 (ENG2D)", "English Gr.10 (ENG2P)", "Literacy Skills: Reading and Writing Gr.10 (ELS2O)", "English Gr.11 (ENG3U)", "Canadian Literature Gr.11 (ETC3M)", "Media Studies Gr.11 (EMS3O)", "Presentation and Speaking Skills Gr.11 (EPS3O)", "English Gr.12 (ENG4U)", "English Gr.12 (ENG4C)", "Studies in Literature Gr.12 (ETS4U)", "The Writer’s Craft Gr.12 (EWC4U)", "Studies in Literature Gr.12 (ETS4C)", "The Writer’s Craft College Gr.12 (EWC4C)", "English: Understanding Contemporary First Nations, Métis, and Inuit Voices Gr.11 (NBE3U)", "English: Understanding Contemporary First Nations, Métis, and Inuit Voices Gr.11 (NBE3C)", "Contemporary First Nations, Métis, and Inuit Issues and Perspectives Gr.11 (NDA3M)", "World Views and Aspirations of First Nations, Métis, and Inuit Communities in Canada Gr.11 (NBV3C)", "Contemporary Indigenous Issues and Perspectives in a Global Context Gr.12 (NDW4M)", "First Nations, Métis, and Inuit Governance in Canada Gr.12 (NDG4M)", "Classical Languages (Ancient Greek/Latin) Level 1 (LVGBD/LVLBD)", "Classical Languages (Ancient Greek/Latin) Level 2 (LVGCU/LVLCU)", "Classical Languages (Ancient Greek/Latin) Level 3 (LVGDU/LVLDU)", "International Languages Level 1 (LBABD - LDYBD)", "International Languages Level 1 (LBABO - LDYBO)", "International Languages Level 2 (LBACU - LDYCU)", "International Languages Level 2 (LBACO - LDYCO)", "International Languages Level 3 (LBADU - LDYDU)", "International Languages Level 3 (LBADO - LDYDO)"],
  ["Classical Languages (Ancient Greek/Latin) Level 1 (LVGBD/LVLBD)", "Classical Languages (Ancient Greek/Latin) Level 2 (LVGCU/LVLCU)", "Classical Languages (Ancient Greek/Latin) Level 3 (LVGDU/LVLDU)", "Core French Gr.9 (FSF1D)", "Core French Gr.9 (FSF1P)", "Core French Gr.9 (FSF1O)", "Core French Gr.10 (FSF2D)", "Core French Gr.10 (FSF2P)", "Core French Gr.10 (FSF2O)", "Core French Gr.11 (FSF3U)", "Core French Gr.11 (FSF3O)", "Core French Gr.11 (FSF3O)", "Core French Gr.12 (FSF4O)"],
  ["Computer Engineering Technology Gr.11 (TEJ3M)", "Computer Engineering Technology Gr.12 (TEJ4M)"],
  ["Introduction to Computer Studies Gr.10 (ICS2O)", "Introduction to Computer Science Gr.11 (ICS3U)", "Introduction to Computer Programming Gr.11 (ICS3C)", "Computer Science Gr.12 (ICS4U)", "Computer Programming Gr.12 (ICS4C)", "Computer Technology Gr.10 (TEJ2O)"],
  ["Healthy Active Living Education Gr.9 (PPL1O)", "Healthy Active Living Education Gr.10 (PPL2O)", "Healthy Active Living Education Gr.11 (PPL3O)", "Health for Life Gr.11 (PPZ3C)", "Healthy Active Living Education Gr.12 (PPL4O)", "Recreation and Healthy Active Living Leadership Gr.12 (PLF4M)"],
  ["Healthy Active Living Education Gr.9 (PPL1O)", "Healthy Active Living Education Gr.10 (PPL2O)", "Healthy Active Living Education Gr.11 (PPL3O)", "Health for Life Gr.11 (PPZ3C)", "Healthy Active Living Education Gr.12 (PPL4O)", "Introductory Kinesiology Gr.12 (PSK4U)", "Recreation and Healthy Active Living Leadership Gr.12 (PLF4M)"],
  ["Principles of Mathematics Gr.9 (MPM1D)", "Foundations of Mathematics Gr.9 (MFM1P)", "Mathematics of Transfer Course Gr.9 (MPM1H)", "Principles of Mathematics Gr.10 (MPM2D)", "Foundations of Mathematics Gr.10 (MFM2P)", "Functions Gr.11 (MCR3U)", "Functions and Applications Gr.11 (MCF3M)", "Advanced Functions Gr.12 (MHF4U)", "Calculus and Vectors Gr.12 (MCV4U)"],
  ["Foundations for College Mathematics Gr.11 (MBF3C)", "Mathematics of Data Management Gr.12 (MDM4U)", "Foundations for College Mathematics Gr.12 (MAP4C)"],
  ["Science Gr.9 (SNC1D)", "Science Gr.9 (SNC1P)", "Science Gr.10 (SNC2D)", "Science Gr.10 (SNC2P)", "Physics Gr.11 (SPH3U)", "Physics Gr.12 (SPH4U)", "Physics Gr.12 (SPH4C)"],
  ["Science Gr.9 (SNC1D)", "Science Gr.9 (SNC1P)", "Science Gr.10 (SNC2D)", "Science Gr.10 (SNC2P)", "Chemistry Gr.11 (SCH3U)", "Chemistry Gr.12 (SBI4U)", "Chemistry Gr.12 (SCH4C)"],
  ["Science Gr.9 (SNC1D)", "Science Gr.9 (SNC1P)", "Science Gr.10 (SNC2D)", "Science Gr.10 (SNC2P)", "Biology Gr.11 (SBI3U)", "Biology Gr.11 (SBI3C)", "Biology Gr.12 (SBI4U)"],
  ["Raising Healthy Children Gr.11 (HPC3O)", "Working with Infants and Young Children Gr.11 (HPW3C)", "Dynamics of Human Relationships Gr.11 (HHD3O)", "Housing and Home Design Gr.11 (HLS3O)", "Exploring Family Studies Gr.10 (HIF2O)"],
  ["Food and Healthy Living Gr.12 (HFL4E)", "Nutrition and Health Gr.12 (HFA4C)", "Nutrition and Health Gr.12 (HFA4U)", "Food and Culture Gr.11 (HFC3M)", "Food and Nutrition Gr.10 (HFN2O)","Food and Nutrition Gr.9 (HFN1O)" ],
  ["Philosophy: The Big Questions Gr.11 (HZB3M)", "Philosophy: Questions and Theories Gr.12 (HZT4U)"],
  ["Introduction to Anthropology, Psychology, and Sociology Gr.11 (HSP3C)", "Introduction to Anthropology, Psychology, and Sociology Gr.11 (HSP3U)"],
  ["Exploring Technologies Gr.9 (TIJ1O)", "Communications Technology Gr.10 (TGJ2O)", "Communications Technology Gr.11 (TGJ3M)", "Communications Technology: Broadcast and Print Production Gr.11 (TGJ3O)", "Communications Technology Gr.12 (TGJ4M)", "Information and Communication Technology in Business Gr.9 (BTT1O)"],
  ["Exploring Technologies Gr.9 (TIJ1O)", "Construction Technology Gr.10 (TCJ2O)", "Construction Engineering Technology Gr.11 (TCJ3C)", "Construction Engineering Technology Gr.12 (TCJ4C)", "Technological Design Gr.10 (TDJ2O)", "Technological Design Gr.11 (TDJ3M)", "Technological Design Gr.12 (TDJ4M)", "Transportation Technology Gr.10 (TTJ2O)", "Transportation Technology Gr.11 (TTJ3C)", "Transportation Technology Gr.12 (TTJ4C)"],
]
