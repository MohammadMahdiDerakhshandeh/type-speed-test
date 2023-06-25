content = document.getElementsByClassName("content")[0];
let paragraph =
  "The sample pages linked to from this page illustrate basic characteristics of particular scripts They support the examples used in the tutorial An Introduction to Writing Systems"
  //  and Unicode For additional details for these and other scripts follow the links from the Script comparison table page";

wordArr = paragraph.split(" ");

for (const word of wordArr) {
  span = document.createElement("span");
  span.classList.add("word");
  span.innerText = word;
  content.innerHTML += span.outerHTML + " ";
}

word = document.getElementsByClassName("word");
word[0].classList.add("active");

timer = document.getElementsByClassName("timer")[0];
input = document.getElementById("importer");
input.addEventListener("keydown", startTimer);
input.addEventListener("keyup", checkWord);
let indexCheckWord = 0;
function checkWord(e) {
  if (e.code === "Space" && word[indexCheckWord].innerText != input.value) {
    word[indexCheckWord].classList.remove("active");
    word[indexCheckWord].classList.add("wrong");
    indexCheckWord++;
    word[indexCheckWord].classList.add("active");
    input.value = "";
    input.focus();
    bou = word[indexCheckWord].getBoundingClientRect();
    content.scrollTo(bou.x, bou.y);
    console.log(bou);

  }
  if (word[indexCheckWord].innerText == input.value) {
    word[indexCheckWord].classList.remove("active");
    word[indexCheckWord].classList.add("currect");
    indexCheckWord++;
    word[indexCheckWord].classList.add("active");
    input.value = "";
    input.focus();
    bou = word[indexCheckWord].getBoundingClientRect();
    content.scrollTo(0, bou.y);
  }
}
function startTimer() {
  input.removeEventListener("keydown", startTimer);
  interval = setInterval(() => {
    newTimer = Number(timer.innerText) - 1;
    if (newTimer === -1) {
      timer.innerText = 0 + " ";
      clearInterval(interval);
      result();
    } else {
      timer.innerText = newTimer + " ";
    }
  }, 1000);
}
function result() {
  resultDiv = document.getElementById("result");
  currect = document.getElementsByClassName("currect").length;
  wrong = document.getElementsByClassName("wrong").length;
  table = `<table><thead><tr><th>word correct</th><th>time(s)</th></tr></thead><tbody><tr><td>${currect}</td><td>60</td></tr><tr><td>${
    (currect * 3600) / 60
  }</td><td>3600</td></tr></tbody></table>`;
  document.getElementsByClassName("section3")[0].innerHTML =
    '<span class="timer">result</span>';
  input.setAttribute("disabled", "disabled");
  resultDiv.innerHTML = table;
}
