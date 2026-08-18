const listCategories = document.querySelector(".gallery__list-categories");
const grid = document.querySelector(".gallery__grid");
const modal = document.querySelector(".modal");
const imageModal = document.querySelector(".modal__box img");
const inputSearch = document.querySelector(".gallery__input-search");

let indice;
const categories = [];
const active = new Set();

let renderImages;

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

const createDivCard = (index) => {
  const divCard = document.createElement("div");
  divCard.classList.add("gallery__card");
  divCard.setAttribute("data-id", `${index}`);
  return divCard;
};

const createImgCard = (src, titulo) => {
  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", `assets/${src}`);
  img.setAttribute("alt", titulo);
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

const createStructureImage = ({ src, titulo, tags, index }) => {
  const card = createDivCard(index);
  const img = createImgCard(src, titulo);
  const divTags = createDivTags(tags);

  card.append(img, divTags);

  return card;
};

const loadStructureImages = () => {
  // 1. Decide QUAL lista mostrar
  const termo = inputSearch.value.toLowerCase();

  renderImages = imagens.filter((item) => {
    // cada condição resolve o próprio caso "desligada" com o ||
    const passaCategoria = active.size === 0 || active.has(item.categoria);

    const passaBusca =
      termo === "" ||
      item.titulo.toLowerCase().includes(termo) ||
      item.tags.some((tag) => tag.toLowerCase().includes(termo));

    // o && entre as duas é o E lógico do requisito
    return passaCategoria && passaBusca;
  });

  /*
  if (active.size === 0 && inputSearch.value === "") {
    renderImages = imagens;
  } else {
    if (active.size === 0 && inputSearch.value !== "") {
      renderImages = imagens.filter((item) => {
        return (
          item.titulo.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(inputSearch.value.toLowerCase()),
          )
        );
      });
    } else if (active.size !== 0 && inputSearch.value === "") {
      renderImages = imagens.filter((item) => {
        return active.has(item.categoria);
      });
    } else if (active.size !== 0 && inputSearch.value !== "") {
      renderImages = imagens.filter((item) => {
        return (
          (item.titulo
            .toLowerCase()
            .includes(inputSearch.value.toLowerCase()) ||
            item.tags.some((tag) =>
              tag.toLowerCase().includes(inputSearch.value.toLowerCase()),
            )) &&
          active.has(item.categoria)
        );
      });
    }
  }
  */

  // 2. Limpa o grid
  grid.innerHTML = "";

  // 3. Renderiza a lista escolhida
  if (renderImages.length !== 0) {
    renderImages.forEach((obj, i) => {
      const card = createStructureImage({ ...obj, index: i });
      grid.append(card);
    });
  } else {
    const empty = document.createElement("p");
    empty.classList.add("gallery__empty");
    empty.textContent = inputSearch.value
      ? `Nenhuma imagem encontrada para "${inputSearch.value}".`
      : "Nenhuma imagem encontrada para os filtros selecionados.";
    grid.append(empty);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Extraio do data as diferentes categorias
  extractCategories();

  // Crio os botões das categorias
  createBtnCategory(categories.length);

  // Carrego as imagens de todas as categorias
  loadStructureImages();
});

listCategories.addEventListener("click", (e) => {
  const btn = e.target.closest(".gallery__category");
  if (!btn) return;

  const categoria = btn.textContent.trim();
  const ficouAtivo = btn.classList.toggle("gallery__category--active");

  if (ficouAtivo) {
    active.add(categoria);
  } else {
    active.delete(categoria);
  }

  loadStructureImages();
});

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".gallery__card");
  if (!card) return;

  indice = Number(card.dataset.id);

  const obj = renderImages[indice];
  imageModal.src = `assets/${obj.src}`;
  imageModal.alt = `${obj.titulo}`;

  modal.classList.remove("is-hidden");
});

modal.addEventListener("click", (e) => {
  const closeBtn = e.target.closest(".modal__close");
  const previousBtn = e.target.closest(".modal__arrow-left");
  const nextBtn = e.target.closest(".modal__arrow-right");
  let obj;

  if (closeBtn) modal.classList.add("is-hidden");

  if (previousBtn) {
    if (indice === 0) {
      indice = renderImages.length - 1;
      obj = renderImages[indice];
      imageModal.src = `assets/${obj.src}`;
      imageModal.alt = `${obj.titulo}`;
    } else {
      indice--;
      obj = renderImages[indice];
      imageModal.src = `assets/${obj.src}`;
      imageModal.alt = `${obj.titulo}`;
    }
  }

  if (nextBtn) {
    if (indice === renderImages.length - 1) {
      indice = 0;
      obj = renderImages[indice];
      imageModal.src = `assets/${obj.src}`;
      imageModal.alt = `${obj.titulo}`;
    } else {
      indice++;
      obj = renderImages[indice];
      imageModal.src = `assets/${obj.src}`;
      imageModal.alt = `${obj.titulo}`;
    }
  }
});

inputSearch.addEventListener("input", (e) => {
  loadStructureImages();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("is-hidden")) {
    modal.classList.add("is-hidden");
  }
});
