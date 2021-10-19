'use strict'

const API_URL = "https://restcountries.com/v3/all";

fetch(API_URL)
.then( response => response.json() )
.then( paises =>{ ordenar(paises);
	for( let i = 0; i < paises.length ; i++ ){
		console.log(paises[i]);
	}
 })
.catch( error => console.log(error) );

function mostrar( arreglo ){
	for(let i = 0; i < arreglo.length ; i++ ){
		console.log(arreglo[i].name);
	}
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

