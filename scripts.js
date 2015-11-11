document.addEventListener("DOMContentLoaded", function() {
  // variables creation
  var words = [ "bonjour", "coucou", "cacao", "chouette", "balthazar" ];
  var images = [
  "",
  "http://i.imgur.com/o4UvoOV.png",
  "http://i.imgur.com/OhBapeI.png",
  "http://i.imgur.com/oj1iIja.png",
  "http://i.imgur.com/dVoZr3Y.png",
  "http://i.imgur.com/lBXS0Up.png",
  "http://i.imgur.com/DT6yreT.png",
  "http://i.imgur.com/rYTMs3r.png",
  "http://i.imgur.com/Y3VNZfk.png",
  "http://i.imgur.com/kfU5J0g.png",
  "http://i.imgur.com/7ZIEdkH.png"
  ];
  var codes = [ "Lettre trouvée !", "Mauvais input", "Perdu", "Gagné", "Lettre déjà envoyée", "Lettre non trouvée" ]
  var word = words[Math.round(10 * Math.random() % (words.length - 1))];
  var toFind = "";
  for (var i = 0; i < word.length; i++)
    toFind += '_';
  var miss = 0;
  var status = 0;
  var notFirstTime = false;
  var button = document.querySelector("button");
  var chars = [];

  // DOM selection
  var wordDOM = document.querySelector(".word");
  var sizeDOM = document.querySelector(".size");
  var statusDOM = document.querySelector(".status");
  var imgDOM = document.querySelector("img");

  function updateDOM() {
    wordDOM.textContent = toFind;
    sizeDOM.textContent = word.length;
    if (notFirstTime) {
      imgDOM.src = images[miss];
      statusDOM.textContent = codes[status - 1];
    }
    console.log(status)
  }

  function game() {
    notFirstTime = true;
    var charSent = document.querySelector("input").value;
    document.querySelector("input").value = "";
    if (status == 3 || status == 4)
      return;
    if (!charSent || charSent.length != 1) {
      status = 2;
      updateDOM();
      return;
    }
    status = 6;
    var tempFound = "";
    var winGame = true;
    var winRound = false;
    for (var i = 0; i < word.length; i++) {
      if (word[i] == charSent) {
        tempFound += charSent;
        status = 1;
      }
      else
        tempFound += toFind[i];
    }
    if (chars.indexOf(charSent) != -1)
      status = 5;
    else
      chars.push(charSent);
    if (status == 6)
      ++miss;
    if (miss == 10)
      status = 3;
    toFind = tempFound;
    if (toFind.indexOf('_') == -1)
      status = 4;
    updateDOM();
  }

  updateDOM();

  button.addEventListener("click", game);

  document.querySelector('input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13)
      game();
  });
});
