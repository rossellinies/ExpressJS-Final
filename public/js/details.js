function showDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");

  fetch(`api/recipes/${recipeId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((recipe) => renderRecipe(recipe));
}

function renderRecipe({image, title, author, year, description}) {
  // const { image, title, author, description } = recipe;

  const recipeEl = document.querySelector(".recipe");
  // recipeEl = document.createElement("div");
  recipeEl.innerHTML = `
    <img src="img/${image}" />
    <h3>${title}</h3>
    <h4>${author === undefined ? "Author" : author}</h4>
    <p>${year}</p>
    <p>${description}</p>
    <a href="/">Back</a>
    `;

      editForm.title.value = title;
      editForm.author.value = author === undefined ? "Author" : author;
      editForm.image.value = image;
      editForm.year.value = year;
      editForm.description.value = description;

  // document.querySelector(".recipe").append(recipeEl);
}

// function renderRecipe(recipe) {
//   const { image, title, description } = recipe;

//   recipeEl = document.createElement("div");
//   recipeEl.innerHTML = `
//     <img src="img/${image}" />
//     <h3>${title}</h3>
//     <p>${description}</p>
//     <a href="/">Back</a>
//     `;

//   editForm.title.value = title;
//   editForm.image.value = image;
//   editForm.description.value = description;

//   document.querySelector(".recipe").append(recipeEl);
// }

const updateRecipe = (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");
  const { title, author, image, year, description } = event.target;
  const updatedRecipe = {
    _id: recipeId,
    title: title.value,
    author: author.value,
    image: image.value,
    year: year.value,
    description: description.value,
  };
  fetch(`api/recipes/${recipeId}`, {
    method: "PUT",
    body: JSON.stringify(updatedRecipe),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(showDetail);
};

const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", updateRecipe);

showDetail();
