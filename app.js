const ingredientes = {
  hierbas: [
    { nombre: "Belladona", desc: "Hierba extremadamente peligrosa y venenosa...", img: "https://i0.wp.com/thedruidscauldron.net/wp-content/uploads/2025/02/Gherardo_Cibo_-_Atropa_belladonna_or_Atropa_bella-donna_from_Paintings_of_Flora_of_the_Roman_Sta_-_MeisterDrucke-1354809.jpg?resize=698%2C1024&ssl=1" },
    { nombre: "Mandrágora", desc: "Raíz mística con propiedades mágicas...", img: "https://i.pinimg.com/736x/8d/bc/5a/8dbc5a55fe71a0eaa14b8906d91ed5c7.jpg" },
    { nombre: "Orquídea de sangre", desc: "Flor rara y mística...", img: "https://png.pngtree.com/thumb_back/fh260/background/20250708/pngtree-a-vibrant-glowing-orchid-with-fiery-red-and-orange-lines-set-image_17484072.webp" }
  ],
  polvos: [
    { nombre: "Oro", desc: "Metal precioso brillante...", img: "https://i.ibb.co/8D5X6Fmm/1aac5c0b-20e9-4b37-8fe4-63d774cb1b20.png" },
    { nombre: "Carbón", desc: "Elemento común pero transformador...", img: "https://thumbs.dreamstime.com/b/generated-image-373760421.jpg" },
    { nombre: "Azufre", desc: "Sustancia inflamable y reactiva...", img: "https://i.ibb.co/C5yWz8mq/484a8863-64ae-4970-9a43-8851205f84d0.png" }
  ],
  liquidos: [
    { nombre: "Aceite", desc: "Líquido denso y altamente inflamable...", img: "https://i.ibb.co/WNxP93KY/8e4cab64-4599-46d0-97b9-f239545a9d6c.png" },
    { nombre: "Agua", desc: "Líquido transparente, puro y esencial...", img: "https://i.pinimg.com/originals/22/09/19/220919658e87c78f4c5c820c4f517869.jpg" },
    { nombre: "Miel", desc: "Sustancia dulce, viscosa y altamente nutritiva...", img: "https://cdn.pixabay.com/photo/2024/04/06/23/33/ai-generated-8680176_960_720.png" }
  ]
};

const seleccion = { hierba: null, polvo: null, liquido: null };
const listaIngredientes = document.getElementById("ingredient-list");
const resultado = document.getElementById("result");
const botonMezclar = document.getElementById("mix-btn");
const tituloCategoria = document.getElementById("current-category");
let vistaActual = "grid";

function mostrarIngredientes(categoria) {
  listaIngredientes.innerHTML = "";
  tituloCategoria.innerText = `Elige un ingrediente de ${categoria}`;
  ingredientes[categoria].forEach(ing => {
    const div = document.createElement("div");
    div.className = "ingrediente";
    div.innerHTML = `
      <img src="${ing.img}" alt="${ing.nombre}">
      <div class="nombre">${ing.nombre}</div>
      <div class="descripcion">${ing.desc}</div>
      <button class="boton-anadir">Añadir al caldero</button>
    `;
    div.querySelector(".boton-anadir").onclick = () => {
      seleccion[categoria.slice(0, -1)] = ing.nombre;
      resultado.innerText = `Has elegido: ${seleccion.hierba || "-"}, ${seleccion.polvo || "-"}, ${seleccion.liquido || "-"}`;
    };
    listaIngredientes.appendChild(div);
  });

  // Solo agregamos/removemos clases, no reemplazamos todo
  if(vistaActual === "grid") {
    listaIngredientes.classList.remove("lista-ingredientes");
    listaIngredientes.classList.add("grid-ingredientes");
  } else {
    listaIngredientes.classList.remove("grid-ingredientes");
    listaIngredientes.classList.add("lista-ingredientes");
  }
}

// Categorías
document.querySelectorAll(".boton-categoria").forEach(b => {
  b.addEventListener("click", e => mostrarIngredientes(e.currentTarget.dataset.categoria));
});

// Vista grid/lista
document.getElementById("view-grid").onclick = () => {
  vistaActual = "grid";
  listaIngredientes.classList.remove("lista-ingredientes");
  listaIngredientes.classList.add("grid-ingredientes");
};
document.getElementById("view-list").onclick = () => {
  vistaActual = "list";
  listaIngredientes.classList.remove("grid-ingredientes");
  listaIngredientes.classList.add("lista-ingredientes");
};

// Mezclar
botonMezclar.onclick = function() {
  const { hierba, polvo, liquido } = seleccion;
  if (!hierba || !polvo || !liquido) resultado.innerText = " Debes elegir los 3 ingredientes.";
  else if (hierba === "Mandrágora" && polvo === "Oro" && liquido === "Agua") resultado.innerText = " ¡Has creado una Poción de Vida Eterna!";
  else if (hierba === "Belladona" && polvo === "Azufre" && liquido === "Aceite") resultado.innerText = " ¡Cuidado! (el caldero explotó)";
  else if (hierba === "Belladona" && polvo === "Azufre" && liquido === "Miel") resultado.innerText = " Has creado un veneno muy potente!";
  else if (hierba === "Orquídea de sangre" && polvo === "Carbón" && liquido === "Aceite") resultado.innerText = " Esto parece más un cosmético que una poción";
  else resultado.innerText = " Has obtenido brebaje pringoso... intenta otra vez";
};
