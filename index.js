'use strict'

const API_URL = "https://restcountries.com/v3/all";

fetch(API_URL)
.then( response => response.json() )
.then( paises =>{ ordenar(paises);
	mostrar(paises);
	checkbox(paises);
	buscar(paises);
	infoCountry(paises);
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

function buscar( paises ){

	let input = document.querySelector(".input");

	input.addEventListener("input", ()=>{

		let filtro = paises.filter( pais => pais.name.common.toLowerCase().startsWith(input.value.toLowerCase()));
		mostrar(filtro);
		
	});
}

function infoCountry( paises ){

	
	let card = document.querySelectorAll(".card");
	let countries = document.querySelector(".countries");
	let nav = document.querySelector(".nav");

	countries.addEventListener("click" , (event)=>{
		if( event.target.parentNode.className == "card" || 
			event.target.parentNode.className == "card__stats" ||
			event.target.className == "card" ){

			//obtener el pais al que se clickeo;

			let country;

			if( event.target.parentNode.className == "card" ){
				country = event.target.parentNode;
				country = country.querySelector(".card__name").innerHTML;
				country = paises.find( pais => pais.name.common == country );
			}else if ( event.target.className == "card" ){
				country = event.target;
				country = country.querySelector(".card__name").innerHTML;
				country = paises.find( pais => pais.name.common == country );
			}else{
				country = event.target.parentNode.parentNode;
				country = country.querySelector(".card__name").innerHTML;
				country = paises.find( pais => pais.name.common == country );
			}
			console.log(country);

			nav.innerHTML = "";

			let back = document.createElement("div");
			back.appendChild(document.createTextNode("Back"));
			back.className = "button__back";
			nav.appendChild(back);

			back.addEventListener("click", ()=>{

				nav.innerHTML = "";

				let form = document.createElement("form");
				form.className = "form";

				let inputImg = document.createElement("img");
				inputImg.className = "input__img";
				inputImg.setAttribute("src","assets/search-icon.svg");

				let input = document.createElement("input");
				input.className = "input";
				input.setAttribute("placeholder", "Search for a country...");

				form.appendChild(inputImg);
				form.appendChild(input);

				let selectBox = document.createElement("div");
				selectBox.className = "selectBox";

				let selectBoxSelection = document.createElement("div");
				selectBoxSelection.className = "selectBox__selection";
				selectBoxSelection.appendChild(document.createTextNode("Filter by region"));

				let selectBoxArrow = document.createElement("img");
				selectBoxArrow.className = "selectBox__arrow";
				selectBoxArrow.setAttribute("src", "assets/down-arrow.svg");

				let selectBoxList = document.createElement("div");
				selectBoxList.className = "selectBox__list";

				let options = [ "All" , "Africa" , "Americas", "Asia", "Europe" , "Oceania"];

				for(let i = 0; i < options.length ; i++ ){

					let selectBoxOption = document.createElement("div");
					selectBoxOption.className = "selectBox__option";
					selectBoxOption.appendChild(document.createTextNode(options[i]));

					selectBoxList.appendChild(selectBoxOption);

				}

				selectBox.appendChild(selectBoxSelection);
				selectBox.appendChild(selectBoxArrow);
				selectBox.appendChild(selectBoxList);

				nav.appendChild(form);
				nav.appendChild(selectBox);

				countries.innerHTML = "";

				buscar(paises);
				checkbox(paises);
				mostrar(paises);
			});


			countries.innerHTML = "";

			let countryPage = document.createElement("div");
			countryPage.className = "country";

			let countryFlag = document.createElement("img");
			countryFlag.className = "country__flag";
			countryFlag.setAttribute("src", country.flags[0] );

			let countryInfo = document.createElement("div");
			countryInfo.className = "country__info";

			let countryName = document.createElement("h2");
			countryName.className = "country__name";
			countryName.appendChild(document.createTextNode(country.name.common));

			let primaryInfo = document.createElement("div");
			primaryInfo.className = "primary__info";

			let nativeName = document.createElement("p");
			nativeName.className = "native__name";

			let bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Native name:  "));

			nativeName.appendChild(bolder);
			nativeName.appendChild(document.createTextNode(country.name.nativeName[ Object.keys(country.name.nativeName)[Object.keys(country.name.nativeName).length -1 ] ].common ));

			primaryInfo.appendChild(nativeName);

			let population = document.createElement("p");
			population.className = "population";

			bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Population:  "));

			population.appendChild(bolder);
			population.appendChild(document.createTextNode(country.population));

			primaryInfo.appendChild(population);

			let region = document.createElement("p");
			region.className = "region";

			bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Region:  "));

			region.appendChild(bolder);
			region.appendChild(document.createTextNode(country.region));

			primaryInfo.appendChild(region);

			let subRegion = document.createElement("p");
			subRegion.className = "sub__region";

			bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Sub-region:  "));

			subRegion.appendChild(bolder);
			subRegion.appendChild(document.createTextNode(country.subregion));

			primaryInfo.appendChild(subRegion);

			let capital = document.createElement("p");
			capital.className = "capital";

			bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Capital:  "));

			capital.appendChild(bolder);
			capital.appendChild(document.createTextNode(country.capital));

			primaryInfo.appendChild(capital);

			let secondaryInfo = document.createElement("div");
			secondaryInfo.className = "secondary__info";

			let topDomain = document.createElement("p");
			topDomain.className = "top__domain";

			bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Top level domain:  "));

			topDomain.appendChild(bolder);
			topDomain.appendChild(document.createTextNode(country.tld[0]));

			secondaryInfo.appendChild(topDomain);

			let currencies = document.createElement("p");
			currencies.className = "currencies";

			bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Currencies:  "));

			currencies.appendChild(bolder);

			for( let i = 0; i < Object.keys(country.currencies).length ; i++ ){
				currencies.appendChild(document.createTextNode(country.currencies[Object.keys(country.currencies)[i]].name ));
				if( i != Object.keys(country.currencies).length - 1 ){
					currencies.appendChild(document.createTextNode(", "));
				}else{
					currencies.appendChild(document.createTextNode("."));
				}
			}

			secondaryInfo.appendChild(currencies);

			let languages = document.createElement("p");
			languages.className = "languages";

			bolder = document.createElement("span");
			bolder.className = "bolder";
			bolder.appendChild(document.createTextNode("Languages:  "));

			languages.appendChild(bolder);

			for( let lang in country.languages ){
				languages.appendChild(document.createTextNode(country.languages[lang]));
				if( country.languages[lang] != country.languages[ Object.keys(country.languages)[ Object.keys(country.languages).length - 1 ]]){
					languages.appendChild(document.createTextNode(", "));
				}else{
					languages.appendChild(document.createTextNode(". "));
				}
			}

			secondaryInfo.appendChild(languages);

			let countryBorder = document.createElement("div");
			countryBorder.className = "country__border";

			let borderTitle = document.createElement("h4");
			borderTitle.className = "border__title";
			borderTitle.appendChild(document.createTextNode("Borders countries:"));

			countryBorder.appendChild(borderTitle);

			let containBorderCountries = document.createElement("div");
			containBorderCountries.className = "contain__border--countries";

			for( let i = 0 ; i < country.borders.length ; i++ ){

				let border = document.createElement("div");
				border.className = "border__country";

				border.appendChild(document.createTextNode( paises.find( pais => pais.cca3 == country.borders[i]).name.common ));
				containBorderCountries.appendChild(border);
			}

			countryBorder.appendChild(containBorderCountries);

			countryInfo.appendChild(countryName);
			countryInfo.appendChild(primaryInfo);
			countryInfo.appendChild(secondaryInfo);
			countryInfo.appendChild(countryBorder);


			//agregando elementos al padre

			countryPage.appendChild(countryFlag);
			countryPage.appendChild(countryInfo);

			//agregando elementos a la pagina

			countries.appendChild(countryPage);
		}
	})

}