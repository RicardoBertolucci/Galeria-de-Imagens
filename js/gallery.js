const listCategories = document.querySelector(".gallery__list-categories");
const grid = document.querySelector(".gallery__grid");

const categories = [];
let state = 0;

// CREATE FUNCTIONS
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

const createDivCard = () => {
  const divCard = document.createElement("div");
  divCard.classList.add("gallery__card");
  return divCard;
};

const createImgCard = (src, alt) => {
  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", `assets/${src}`);
  img.setAttribute("alt", alt);
  img.setAttribute("loading", "lazy");
  return img;
};

const createDivTags = (tags) => {
  const divTags = document.createElement("div");
  divTags.classList.add("gallery__tags");

  for (let i = 0; i < tags.length; i++) {
    let tag = document.createElement("p");
    tag.classList.add("gallery__tag");
    tag.textContent = tags[i];
    divTags.append(tag);
  }

  return divTags;
};

// LOGIC FUNCTIONS
const extractCategories = () => {
  imagens.forEach((obj) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i] === obj.categoria) {
        return;
      }
    }

    categories.push(obj.categoria);
  });
};

const createBtnCategory = (quantitybuttons) => {
  for (let i = 0; i < quantitybuttons; i++) {
    const resultLi = createLi();
    const resultBtn = createButton(categories[i]);

    resultLi.append(resultBtn);
    listCategories.append(resultLi);
  }
};

const createStructureImage = (src, alt, tags) => {
  const card = createDivCard();
  const img = createImgCard(src, alt);
  const divTags = createDivTags(tags);

  card.append(img, divTags);

  return card;
};

const loadImages = (btn) => {
  imagens.forEach((obj) => {
    const defaultImages = createStructureImage(obj.src, obj.titulo, obj.tags);
    grid.append(defaultImages);
  });

  if (btn) {
    // Limpa o grid
    grid.innerHTML = "";

    // Descobre quais são os botões selecionados
    const selectedImages = imagens.filter(
      (obj) => obj.categoria === btn.textContent.trim(),
    );
    
    selectedImages.forEach((category) => {
      const result = createStructureImage(
        category.src,
        category.titulo,
        category.tags,
      );
      grid.append(result);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Extraio do data as diferentes categorias
  extractCategories();

  // Crio os botões das categorias
  createBtnCategory(categories.length);

  // Carrego as imagens de todas as categorias
  loadImages();
});

listCategories.addEventListener("click", (e) => {
  const btn = e.target.closest(".gallery__category");

  if (!btn) {
    return;
  } else {
    // Tenho nesse momento, que todas as imagens estão aparecendo
    if (btn.classList.contains("gallery__category--active")) {
      btn.classList.remove("gallery__category--active");
      // Tenho que criar uma função que remove imagens
    } else {
      btn.classList.add("gallery__category--active");
      let btnSelected = loadImages(btn);
    }
  }
});