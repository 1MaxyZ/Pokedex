//numero random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//"DOMContentLoaded" se activa cuando carga la pagina
document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 151);
  console.log(random);
  fetchData(random);
});

//"await" sirve para hacer que la funcion espere a que cumpla la linea antes de continuar.
//modificar la tarjeta
const fetchData = async (id) => {
  try {
    //buscar la info de la API
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    //convertirlo en json
    const data = await res.json();
    //pintar la plantilla con los datos
    pintarCard(data);
    //verificar y cambiar el texto segun su tamaño (pc/mobil)
    {
      if (anchoVentana > 570) {
        document.querySelector(".atk_titulo").textContent = "Ataque";
        document.querySelector(".def_titulo").textContent = "Defensa";
        document.querySelector(".spa_titulo").textContent = "At.Esp.";
        document.querySelector(".spd_titulo").textContent = "Def.Esp.";
        document.querySelector(".spe_titulo").textContent = "velocidad";
      } else {
        document.querySelector(".atk_titulo").textContent = "ATK";
        document.querySelector(".def_titulo").textContent = "DEF";
        document.querySelector(".spa_titulo").textContent = "SPA";
        document.querySelector(".spd_titulo").textContent = "SPD";
        document.querySelector(".spe_titulo").textContent = "SPE";
      }
    }
  } catch (error) {
    //si hay error lo muestra en la consola
    console.log(error);
  }
};

//funcion para pintar la plantilla
const pintarCard = (pokemon) => {
  console.log(pokemon);
  //la tarjeta modificada
  const flex = document.querySelector("#flex");
  //la plantilla
  const plantilla = document.querySelector("#plantilla").content;
  //clon de la plantilla
  const clone = plantilla.cloneNode(true);
  //fragment: invisible (solo js), manipula el DOM, evita re-flow, util para loops(+sencillo y elegante que usar "inner.HTML")
  const fragment = document.createDocumentFragment();

  //MODIFICAMOS LAS PARTES DEL CLON CON LA INFO DE LA API
  // prettier-ignore
  {
  clone.querySelector("#card-body-img").setAttribute("src",pokemon.sprites.other["official-artwork"].front_default);
  clone.querySelector(".card-title").textContent = pokemon.name + " #" + pokemon.id;
  clone.querySelector(".ps").textContent = pokemon.stats[0].base_stat;
  clone.querySelector(".ataque").textContent = pokemon.stats[1].base_stat;
  clone.querySelector(".defensa").textContent = pokemon.stats[2].base_stat;
  clone.querySelector(".atEsp").textContent = pokemon.stats[3].base_stat;
  clone.querySelector(".defEsp").textContent = pokemon.stats[4].base_stat;
  clone.querySelector(".velocidad").textContent = pokemon.stats[5].base_stat;
  clone.querySelector("#altura").textContent = "Altura: "+ pokemon.height/10 +" m";
  clone.querySelector("#peso").textContent = "Peso: "+ pokemon.weight/10 +" kg";
  //habilidades del pokemon segun su .length (entre 1 y 3 habilidades)
  for (let i = 0; i < pokemon.abilities.length; i++) {
    clone.querySelector(".habilidad" + i).textContent = pokemon.abilities[i].ability.name;
    }
  }
  //GUARDAR EL CODIGO DE CLON EN FRAGMENT
  fragment.appendChild(clone);
  //MOVER EL CODIGO A FLEX
  flex.appendChild(fragment);
};

var anchoVentana = window.innerWidth;
//Ajustar nombre de stats segun tamaño(pc/mobil).
window.onresize = function () {
  anchoVentana = window.innerWidth;
  if (anchoVentana > 700) {
    document.querySelector(".atk_titulo").textContent = "Ataque";
    document.querySelector(".def_titulo").textContent = "Defensa";
    document.querySelector(".spa_titulo").textContent = "At.Esp.";
    document.querySelector(".spd_titulo").textContent = "Def.Esp.";
    document.querySelector(".spe_titulo").textContent = "velocidad";
  } else {
    document.querySelector(".atk_titulo").textContent = "ATK";
    document.querySelector(".def_titulo").textContent = "DEF";
    document.querySelector(".spa_titulo").textContent = "SPA";
    document.querySelector(".spd_titulo").textContent = "SPD";
    document.querySelector(".spe_titulo").textContent = "SPE";
  }
};


const buscador_boton = document.querySelector("#buscador_button")
const buscador_input = document.querySelector("#buscador_input")
//evento de buscador
buscador_boton.addEventListener("click", () => {
console.log(buscador_input.value)
fetchData(buscador_input.value)
if (document.querySelectorAll("#trajeta").length > 0) {
    eliminarTarjeta(0)
    buscador_input.value = ""
}
})
//eliminar tarjetas
function eliminarTarjeta(id){
	tarjeta = document.querySelectorAll("#trajeta")[id];	
	if (!tarjeta){
		console.log("El elemento selecionado no existe");
	} else {
		padre = tarjeta.parentNode;
		padre.removeChild(tarjeta);
	}
}

