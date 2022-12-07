let Notes = JSON.parse(localStorage.getItem('user'));
//Loop for index
for (var i = 1; i <= 5; i++) {
  getButton(i);
}
//Get and push grade in the right table.
function getButton(index) {
  document.getElementById("addButton-" + index).addEventListener("click", function () {
      let grade = parseFloat(document.getElementById("noteInput-" + index).value);
      if (grade > 6) {
        alert("Votre note n'est pas valable.");
        return 0;
      }if (!isNaN(grade)) {
        if (index == 3 || index === 4) {
          let sems = document.getElementById("dropdown-" + index).value;
          let tablo = document.getElementById("tabl" + index);
          Notes["tabl" + index][sems].push(grade);
          addRow(index, tablo, grade);
          average(index, sems)
        } else {
          let descri = document.getElementById("descri-" + index).value;
          let tablo = document.getElementById("tabl" + index);
          Notes["tabl" + index].semestre1.push(grade);
          Notes["tabl" + index].mod1.push(descri);
          addRow(index, tablo, grade, descri);
          let param = "semestre1"
          average(index, param)
        }
      } else {
        alert("Votre note n'est pas valable.");
      }
  localStorage.setItem('user', JSON.stringify(Notes))
  });
}
//Function that calculates the average grade stores it in the object and displays it for a SINGLE tab.
function average(index, semestre) {
  let sum = 0;
  let rightNote = Notes["tabl" + index][semestre];
  Notes["tabl" + index][semestre].splice(0, 1, null)
  for (const value of rightNote) {
    sum += value
  }
//Display average
   if (sum > 0){
    let finMoyIndic = Notes["tabl" + index][semestre].length-1;
    document.getElementById("maMoyenne" + index).innerHTML = "Ma moyenne: " + (sum / finMoyIndic).toFixed(1);
    Notes["tabl" + index][semestre].splice(0, 1, (sum / finMoyIndic).toFixed(1)*1);
    tabl3Tabl4()
  }
 }
//adds row, columns and innerHTML.
function addRow(index, tablo, grade, descri) {
  if (index == 3 || index === 4) {
    let row = tablo.insertRow(0);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = grade;
  }else {
    let row = tablo.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.style.width = "100px";
    cell2.style.width = "100px";
    cell1.innerHTML = grade;
    cell2.innerHTML = descri;
  }
}
//Deletes the table and adds stored notes when semestre is changed.
function deleteTabl() {
  let selector = document.querySelectorAll(".dropdown1");
  for (const iterator of selector) {
    iterator.addEventListener("change", function (e) {
      let index = e.target.id.split("-")[1];
      let tabl = document.getElementById("tabl" + index);
      let rowLength = tabl.rows.length;
      for (var i = 1; i <= rowLength; i++) {
        tabl.deleteRow(0);
      }
//Adds the stored notes in table
  let semestre = e.target.value;
  if (semestre == "choice") { return 0}
      let rightNote = Notes["tabl" + index][semestre];
      for (const grade of rightNote) {
      let row = tabl.insertRow(0);
      let cell1 = row.insertCell(0);
      cell1.innerHTML = grade;
    
  }

//average is stored in the same table this line displays not this line
      tabl.deleteRow(tabl.rows.length-1);
      average(index, semestre)
    });
  }
}
deleteTabl();
// Merge average for tabl 3 and 4 and add all average in a tabl
function tabl3Tabl4() {
  let allNotes = []
  let allNotesCult = []
  let sumMaths = 0;
  let sumCult = 0;
  let allMoy = []
  for (const tabl of Object.keys(Notes)) {
    if (tabl == "tabl3" || tabl == "tabl4") {
      let allSemestres = Object.keys(Notes[tabl])
      for (const semestres of allSemestres) {
        if (tabl == "tabl3" && Notes[tabl][semestres][0] > 0) {
          allNotes.push(Notes[tabl][semestres][0]);
        }if(tabl == "tabl4" && Notes[tabl][semestres][0] > 0){
          allNotesCult.push(Notes[tabl][semestres][0]);
        }
      }
    }else{
      let mestre1 = (Notes[tabl].semestre1[0])
      allMoy.push(mestre1)
  }
}
  for (const singleNote of allNotes) {
    sumMaths += singleNote;
  }
  for (const singleNote of allNotesCult) {
    sumCult += singleNote;
  }
  if (sumMaths > 0){
    let avgForTablAnd4 = parseFloat((sumMaths / allNotes.length).toFixed(1))
    allMoy.push(avgForTablAnd4)
  }
  if (sumCult > 0){
    let avgForTabl3And4 = parseFloat((sumCult / allNotesCult.length).toFixed(1))
    allMoy.push(avgForTabl3And4)
  }
  finale(allMoy)
}
tabl3Tabl4()
function finale(allMoy) {
  if (allMoy[0] > 0 && allMoy[1] > 0) {
    allMoy.splice(0, 2, parseFloat((allMoy[0]*0.80 + allMoy[1]*0.20).toFixed(1)))
    console.log(allMoy);
  }if (allMoy[0] > 0 && allMoy[1] > 0 && allMoy[2] > 0 && allMoy.length == 4) {
    allMoy = (allMoy[0]*0.30+allMoy[1]*0.10+allMoy[2]*0.20+allMoy[3]*0.40).toFixed(1);
    document.getElementById("cfc").innerHTML = allMoy;
      if (allMoy >= 4) {
        document.getElementById("re").innerHTML = "Réussi";
      }else{
        document.getElementById("re").innerHTML = "Raté";
      }
    }
}
// let myString = JSON.stringify(Notes);
// let Notes = JSON.parse(myString);
// console.log(myString);
// Proposer des exersices pendant la présentation
// notion rappel, tache recurente, echeanche, partage liste todo