"use strict";

// Elements

//input
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYears = document.getElementById("year");
//error
const errDay = document.getElementById("day-error");
const errMonth = document.getElementById("month-error");
const errYear = document.getElementById("year-error");
// btn
const btn = document.querySelector(".form__submit-btn");
//display
const displayYears = document.querySelector(".display__number-years");
const displayMonths = document.querySelector(".display__number-months");
const displayDays = document.querySelector(".display__number-days");
// labels
const labels = document.querySelectorAll(".form__label");

//logic
function calcActualAge() {
  // Réinitialise les messages d'erreur
  errDay.style.display = "none";
  errMonth.style.display = "none";
  errYear.style.display = "none";

  // Convertit les valeurs d'entrée en nombres
  const birthYear = parseInt(inputYears.value, 10);
  const birthMonth = parseInt(inputMonth.value, 10);
  const birthDay = parseInt(inputDay.value, 10);

  // Obtient la date actuelle
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // Validation des entrées
  // Détermine le nombre de jours dans le mois
  function isValidYear(year) {
    return !isNaN(year) && year <= currentYear && year >= 1900;
  }

  function isValidMonth(month) {
    return !isNaN(month) && month >= 1 && month <= 12;
  }

  function isValidDay(day, year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    return !isNaN(day) && day >= 1 && day <= daysInMonth;
  }

  if (
    !isValidYear(birthYear) ||
    !isValidMonth(birthMonth) ||
    !isValidDay(birthDay, birthYear, birthMonth)
  ) {
    errDay.style.display = "block";
    errMonth.style.display = "block";
    errYear.style.display = "block";
    inputDay.style.border = "1px solid #ff5959 ";
    inputMonth.style.border = "1px solid #ff5959 ";
    inputYears.style.border = "1px solid #ff5959 ";
    labels.forEach((label) => {
      label.style.color = "#ff5959";
    });
    return;
  }

  // Calcul de l'âge
  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  let ageDays = currentDay - birthDay;

  if (ageDays < 0) {
    ageMonths--;
    const lastDayOfPreviousMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    ageDays += lastDayOfPreviousMonth;
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // Affichage de l'âge calculé
  displayYears.textContent = ageYears;
  displayMonths.textContent = ageMonths;
  displayDays.textContent = ageDays;
}

// Ajout d'un écouteur d'événements au bouton pour calculer l'âge lors du clic
btn.addEventListener("click", function (event) {
  event.preventDefault(); // Empêche le comportement par défaut du bouton de soumission dans un formulaire
  calcActualAge();
});

btn.addEventListener("click", function (e) {
  e.preventDefault();

  calcActualAge();
});
