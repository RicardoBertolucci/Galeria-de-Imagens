const listCategories = document.querySelector(".gallery__list-categories");
const grid = document.querySelector(".gallery__grid");

const categories = [];
const active = new Set();

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

const loadImages = (category) => {

  if (category === undefined || category.size === 0) {
    grid.innerHTML = "";
    imagens.forEach((category) => {
      const defaultImages = createStructureImage(category.src, category.titulo, category.tags);
      grid.append(defaultImages);
    });
  } else {
    // Limpa o grid
    grid.innerHTML = "";
    
    const availableItems = imagens.filter((item) => { 
      return active.has(item.categoria)
    });

    availableItems.forEach((item) => {
      const result = createStructureImage(
        item.src,
        item.titulo,
        item.tags,
      );
      grid.append(result);
    })
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
      active.delete(btn.textContent.trim());
      loadImages(active);
    } else {
      btn.classList.add("gallery__category--active");
      active.add(btn.textContent.trim());
      loadImages(active);
    }
  }
});

grid.addEventListener("click", () => {
  console.log("oi")
})