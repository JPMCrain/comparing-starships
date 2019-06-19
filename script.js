let starShips = [
	{ name: 'CR90 Corrvette', id: 2},
	{ name: 'V-wing', id: 75},
	{ name: 'Belbullab-22 Starfighter', id: 74},
	{ name: 'Jedi Interceptor', id: 65},
	{ name: 'Star Destroyer', id: 3},
	{ name: 'Trade Fedaration Cruiser', id: 59},
	{ name: 'Solar Sailer', id: 58},
	{ name: 'Republic Attack Cruiser', id: 63},
	{ name: 'B-wing', id:29},
	{ name: 'A-wing', id: 28},
	{ name: 'Naboo Fighter', id:39},
	{ name: 'Millenium Falcon', id:10},	
]

let attributes = ['name','cost_in_credits','max_atmosphering_speed','cargo_capacity','passengers']

const starShip1 = document.querySelector('#starship1');
const starShip2 = document.querySelector('#starship2');

window.onload = () => {
	starShips.forEach(element => {
		starShip1.innerHTML += `<option value="${element.id}">${element.name}</option>`;
		starShip2.innerHTML += `<option value="${element.id}">${element.name}</option>`;	
	});	

	document.getElementById("compare").addEventListener('click',  function(){
		run(gen).catch(function(err){
				alert(err.message);
		});
	})
};

function run(getFunc){
	const genObject = getFunc();

	function iterate(iteration){
			if(iteration.done)
					return Promise.resolve(iteration.value);
			return Promise.resolve(iteration.value)
			.then(x => iterate(genObject.next(x)))
			.catch(x => iterate(genObject.throw(x)));
	}

	try{
			return iterate(genObject.next());
	} catch(ex){
			return Promise.reject(ex);
	}
}

const url = "https://swapi.co/api/starships/";

function *gen(){
	//fetch the starship1 resource
	let ship1Reponse = yield fetch(url + starShip1.value + "/");
	let ship1 = yield ship1Reponse.json();

	//fetch the starship2 rersource
	let ship2Reponse = yield fetch(url + starShip1.value + "/");
	let ship2 = yield ship2Reponse.json();

	//fill results in the table
	for (const i of attributes) {
			document.getElementById(i+"1").innerHTML = ship1[i];
			document.getElementById(i+"1").style.backgroundColor = (parseInt(ship1[i],10) > parseInt(ship2[i],10) ? "red" : "");

			document.getElementById(i+"2").innerHTML = ship2[i];
			document.getElementById(i+"2").style.backgroundColor = (parseInt(ship2[i],10) > parseInt(ship1[i],10) ? "red" : "");
	}

	//fill div with results
	
}