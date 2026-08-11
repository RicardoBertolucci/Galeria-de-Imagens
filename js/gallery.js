// Variáveis da DOM
const listCategories = document.querySelector(".gallery__list-categories");

// Array de categorias
const categories = [];

// Variável auxiliar
let aux;

// Funções
const extractCategories = () => {
  imagens.forEach((obj, index) => {
    if (categories.length === 0) {
      aux = obj.categoria;
      categories.push(aux);
    } else {
      if (aux !== obj.categoria) {
        aux = obj.categoria;
        categories.push(aux);
      }
    }
  });
};

const createLi = () => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  return li;
};

const createButton = (text) => {
  const button = document.createElement("button");
  button.classList.add("gallery__category");
  button.setAttribute("type", "button");
  button.textContent = text;

  return button;
};

const createBtnCategory = (quantitybuttons) => {
  for (let i = 0; i < quantitybuttons; i++) {
    const resultLi = createLi();
    const resultBtn = createButton(categories[i]);
    
    resultLi.append(resultBtn);
    listCategories.append(resultLi);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  extractCategories();
  createBtnCategory(categories.length);
});

listCategories.addEventListener("click", (e) => {
  const btn = e.target.closest(".gallery__category");
  if (!btn) return;
});