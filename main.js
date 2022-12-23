let Notes;
if(localStorage.getItem("user") === null){
  Notes = {
    tabl1: {
      semestre1: [0],
      semestre1des: [],
    },
    tabl2: {
      semestre1: [0],
      semestre1des: [],
    },
    tabl3: {
      mathSemestre1: [0],
      mathSemestre1des: [],
      mathSemestre2: [0],
      mathSemestre2des: [],
      mathSemestre3: [0],
      mathSemestre3des: [],
      anglaisSemestre1: [0],
      anglaisSemestre1des: [],
      anglaisSemestre2: [0],
      anglaisSemestre2des: [],
      anglaisSemestre3: [0],
      anglaisSemestre3des: [],
      anglaisSemestre4: [0],
      anglaisSemestre4des: [],
      anglaisSemestre5: [0],
      anglaisSemestre5des: [],
    },
    tabl4: {
      cultGSemestre1: [0],
      cultGSemestre1des: [],
      cultGSemestre2: [0],
      cultGSemestre3: [0],
      cultGSemestre3des: [],
      cultGSemestre4: [0],
      cultGSemestre4des: [],
      cultGSemestre5: [0],
      cultGSemestre5des: [],
      cultGSemestre6: [0],
      cultGSemestre6des: [],
      cultGSemestre7: [0],
      cultGSemestre7des: [],
      cultGSemestre8: [0],
      cultGSemestre8des: [],
    },
    tabl5: {
      semestre1: [0],
      semestre1des: [],
    },
  };
}else{
  Notes = JSON.parse(localStorage.getItem('user'));
}
let numForRow = 0
//Loop for index
for (var i = 1; i <= 5; i++) {
  getButton(i);
}
//Get and push grade in the right table.
function getButton(index) {
  document
    .getElementById("addButton-" + index)
    .addEventListener("click", function () {
      let grade = parseFloat(
        document.getElementById("noteInput-" + index).value
      );
      let descri = document.getElementById("descri-" + index).value;
      let tablo = document.getElementById("tabl" + index);
      if (grade > 6) {
        alert("Votre note n'est pas valable.");
        return 0;
      }
      if (!isNaN(grade)) {
          let sems = document.getElementById("dropdown-" + index).value;
          if (sems == "choice") {
            alert("Veuillez choisir un semestre");
            return 0;
          }
          console.log(sems);
          Notes["tabl" + index][sems].push(grade);
          Notes["tabl" + index][sems + "des"].push(descri);
          addRow(tablo, grade, descri);
          average(index, sems);
      } else {
        alert("Votre note n'est pas valable.");
      }
      localStorage.setItem("user", JSON.stringify(Notes));
    });

}
//Function that calculates the average grade stores it in the object and displays it for a SINGLE tab.
function average(index, semestre) {
  let sum = 0;
  let rightNote = Notes["tabl" + index][semestre];
  Notes["tabl" + index][semestre].splice(0, 1, null);
  for (const value of rightNote) {
    sum += value;
  }
  //Display average
  if (sum > 0) {
    let finMoyIndic = Notes["tabl" + index][semestre].length - 1;
    document.getElementById("maMoyenne" + index).innerHTML =
      "Ma moyenne: " + (sum / finMoyIndic).toFixed(1);
    Notes["tabl" + index][semestre].splice(
      0,
      1,
      (sum / finMoyIndic).toFixed(1) * 1
    );
    tabl3Tabl4();
  }
}
//adds row, columns and innerHTML.
function addRow(tablo, grade, descri) {
  numForRow++
  let row = tablo.insertRow(0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.className = "row" + numForRow;
  cell2.className = "row" + numForRow;
  cell1.innerHTML = grade;
  cell2.innerHTML = descri;
  buttonDelete(numForRow, tablo, grade)
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
      let rightNote = Notes["tabl" + index][semestre];
      let descri = Notes["tabl" + index][semestre + "des"];
      let iForDescri = -2;
      for (const grade of rightNote) {
        if (semestre == "choice" || grade == 0) {
          return 0;
        }
        iForDescri ++
        let row = tabl.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.className = "row" + iForDescri;
        cell2.className = "row" + iForDescri;
        cell1.innerHTML = grade;
        cell2.innerHTML = descri[iForDescri];
        buttonDelete(iForDescri, tabl ,grade)
      }
      //average is stored in the same table this line displays not this line
      tabl.deleteRow(tabl.rows.length - 1);
      average(index, semestre);
    });
  }
}
deleteTabl();
// Merge average for tabl 3 and 4 and add all average in a tabl
function tabl3Tabl4() {
  let allNotes = [];
  let allNotesCult = [];
  let sumMaths = 0;
  let sumCult = 0;
  let allMoy = [];
  for (const tabl of Object.keys(Notes)) {
    if (tabl == "tabl3" || tabl == "tabl4") {
      let allSemestres = Object.keys(Notes[tabl]);
      for (const semestres of allSemestres) {
        if (tabl == "tabl3" && Notes[tabl][semestres][0] > 0) {
          allNotes.push(Notes[tabl][semestres][0]);
        }
        if (tabl == "tabl4" && Notes[tabl][semestres][0] > 0) {
          allNotesCult.push(Notes[tabl][semestres][0]);
        }
      }
    } else {
      let mestre1 = Notes[tabl].semestre1[0];
      allMoy.push(mestre1);
    }
  }
  for (const singleNote of allNotes) {
    sumMaths += singleNote;
  }
  for (const singleNote of allNotesCult) {
    sumCult += singleNote;
  }
  if (sumMaths > 0) {
    let avgForTablAnd4 = parseFloat((sumMaths / allNotes.length).toFixed(1));
    allMoy.push(avgForTablAnd4);
  }
  if (sumCult > 0) {
    let avgForTabl3And4 = parseFloat(
      (sumCult / allNotesCult.length).toFixed(1)
    );
    allMoy.push(avgForTabl3And4);
  }
  finale(allMoy);
}
tabl3Tabl4();
// Deletes a note when the table row is clicked
function buttonDelete(numForRow, tablo, grade) {
  for (const iterator of document.getElementsByClassName("row" + numForRow)) {
    iterator.addEventListener('click', function(){
      this.parentElement.remove(this)
      tablo = tablo.id
      let sems;
      if (tablo == "tabl3" || tablo == "tabl4") {
        sems = document.getElementById("dropdown-" + tablo[4]).value;
      }else{
        sems = "semestre1"
      }
      let indexForSupp = Notes[tablo][sems].indexOf(grade)
      Notes[tablo][sems].splice(indexForSupp, 1)
      indexForSupp -- 
      Notes[tablo][sems + "des"].splice(indexForSupp, 1)
      localStorage.setItem("user", JSON.stringify(Notes));
    })
  } 
}
function finale(allMoy) {
  if (allMoy[0] > 0 && allMoy[1] > 0) {
    allMoy.splice(
      0,
      2,
      parseFloat((allMoy[0] * 0.8 + allMoy[1] * 0.2).toFixed(1))
    );
  }
  if (allMoy[0] > 0 && allMoy[1] > 0 && allMoy[2] > 0 && allMoy.length == 4) {
    allMoy = (
      allMoy[0] * 0.3 +
      allMoy[1] * 0.1 +
      allMoy[2] * 0.2 +
      allMoy[3] * 0.4
    ).toFixed(1);
    document.getElementById("cfc").innerHTML = allMoy;
    if (allMoy >= 4) {
      document.getElementById("re").innerHTML = "Réussi";
    } else {
      document.getElementById("re").innerHTML = "Raté";
    }
  }
} 