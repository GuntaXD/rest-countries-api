'use strict'

const API_URL = "https://restcountries.com/v3/all";

fetch(API_URL)
.then( response => response.json() )
.then( paises =>{ ordenar(paises);
	mostrar(paises);

	checkbox(paises);
 })
.catch( error => console.log(error) );

function mostrar( arreglo ){

	document.querySelector(".countries").innerHTML = "";

	arreglo.forEach( pais =>{
		let card = document.createElement("div");
		card.classList.add("card");

		let img = document.createElement("img");
		img.classList.add("card__img");
		img.setAttribute("src" , `${pais.flags[1]}`);

		let cardName = document.createElement("p");
		cardName.classList.add("card__name");
		cardName.appendChild(document.createTextNode(`${pais.name.common}`));

		let cardStats = document.createElement("div");
		cardStats.classList.add("card__stats");

		let cardPopulation = document.createElement("p");
		cardPopulation.classList.add("card__population");
		cardPopulation.appendChild(document.createTextNode(`Population: ${pais.population}`));
		cardStats.appendChild(cardPopulation);

		let cardRegion = document.createElement("p");
		cardRegion.classList.add("card__region");
		cardRegion.appendChild(document.createTextNode(`Region: ${pais.region}`));
		cardStats.appendChild(cardRegion);

		let cardCapital = document.createElement("p");
		cardCapital.classList.add("card__capital");
		cardCapital.appendChild(document.createTextNode(`Capital: ${pais.capital}`));
		cardStats.appendChild(cardCapital);

		card.appendChild(img);
		card.appendChild(cardName);
		card.appendChild(cardStats);

		document.querySelector(".countries").appendChild(card);
	})
}

function ordenar( array ){
	
	for( let i = 0 ; i < array.length; i++ ){

		for ( let j = i + 1; j < array.length ; j++ ){

			if( array[i].name.common > array[ j ].name.common ){

				let aux = JSON.parse(JSON.stringify(array[j]));
				array[j] = JSON.parse(JSON.stringify(array[i]));
				array[i] = JSON.parse(JSON.stringify(aux));

			}
		}
	}

}

//funcion del checkbox

function checkbox( paises ){
	
	let selectBox = document.querySelector(".selectBox");
	let list = selectBox.querySelector(".selectBox__list");
	let selectBoxSelection = selectBox.querySelector(".selectBox__selection");
	let selectBoxArrow = selectBox.querySelector(".selectBox__arrow");

	selectBox.addEventListener("click" , (event)=>{

		list.classList.toggle("active");
		selectBoxArrow.classList.toggle("active");
	
		if ( event.target.className == "selectBox__option" ){
			selectBoxSelection.innerHTML = event.target.innerHTML;

			if( event.target.innerHTML == "All" ){

				mostrar(paises);
				console.log("hola");

			}else{

				let filtro = paises.filter( pais => pais.region == event.target.innerHTML );
				mostrar(filtro);

			}
		}

	});

}