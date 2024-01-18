let hash = "fa57ecb68368db4b9a073022eb1020b1";
let pubKey = "bdd8927cc325728869e4e301c9b2592c";
let url = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${pubKey}&hash=${hash}`;
let body = document.body;
let containerMarvel = document.querySelector("div");
fetch(url)
  .then((response) => response.json())
  .then((response) => displayM(response))
  .catch((error) => alert("Erreur : " + error));

function displayM(response) {
  let marvels = response.data.results;
  let selectEl = createHtmlTag("select");

  marvels.map(function (marvel) {
    if (
      marvel.description !== "" &&
      marvel.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    ) {
      let optionEl = createHtmlTag("option");
      optionEl.innerHTML = marvel.name;
      optionEl.value = marvel.id;
      append(selectEl, optionEl);
      append(body, selectEl);
    }
  });
  selectEl.addEventListener("change", (event) => {
    let idCharacter = event.target.value;
    let url = `http://gateway.marvel.com/v1/public/characters/${idCharacter}?ts=1&apikey=${pubKey}&hash=${hash}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => displayCharac(response))
      .catch((error) => alert("Erreur : " + error));
  });
}
function displayCharac(response) {
  let character = response.data.results;
  effacer(containerMarvel);
  let imgC = createHtmlTag("img");
  let h2C = createHtmlTag("h2");
  let pC = createHtmlTag("p");

  imgC.src =
    character[0].thumbnail.path + "." + character[0].thumbnail.extension;
  h2C.textContent = character[0].name;
  pC.textContent = character[0].description;
  append(containerMarvel, imgC);
  append(containerMarvel, h2C);
  append(containerMarvel, pC);
}

function createHtmlTag(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
function effacer(element) {
  return (element.innerHTML = "");
}
