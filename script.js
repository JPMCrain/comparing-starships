let starShips = [
	{ name: 'CR90 corvette', id: 2, img_url: "http://custom.swcombine.com/static/2/7/34-36063-1424471432-large.png"},
	{ name: 'V-wing', id: 75, img_url: "https://vignette.wikia.nocookie.net/starwars/images/a/a9/V-wing_BF2.png/revision/latest?cb=20170825000555"},
	{ name: 'Belbullab-22 starfighter', id: 74, img_url: "https://vignette.wikia.nocookie.net/swg/images/5/56/Belbullab-22.JPG/revision/latest/zoom-crop/width/320/height/180?cb=20060622063743"},
	{ name: 'Jedi Interceptor', id: 65, img_url: "https://vignette.wikia.nocookie.net/starwars/images/7/74/AnakinsEta2.jpg/revision/latest?cb=20090424014352"},
	{ name: 'Star Destroyer', id: 3, img_url: "https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg?region=0%2C0%2C1600%2C900&width=960"},
	{ name: 'Trade Federation cruiser', id: 59, img_url: "https://i.pinimg.com/originals/2f/a1/2d/2fa12d607af47a04bd538a8182133630.jpg"},
	{ name: 'Solar Sailer', id: 58, img_url: "https://i.ebayimg.com/images/i/181528281998-0-1/s-l1000.jpg"},
	{ name: 'Republic attack cruiser', id: 63, img_url: "https://lumiere-a.akamaihd.net/v1/images/databank_republicattackcruiser_01_169_812f153d.jpeg?region=0%2C0%2C1560%2C878&width=960"},
	{ name: 'B-wing', id:29, img_url: "https://qph.fs.quoracdn.net/main-qimg-919bbaac41b76160c7b823df7f55fa97"},
	{ name: 'A-wing', id: 28, img_url: "https://vignette.wikia.nocookie.net/starwars/images/e/ec/Resistance_A-wing_SWCT.png/revision/latest?cb=20181015045043"},
	{ name: 'Naboo fighter', id:39, img_url: "https://vignette.wikia.nocookie.net/starwars/images/d/d3/N-1_BF2.png/revision/latest/scale-to-width-down/2000?cb=20170825000654"},
	{ name: 'Millennium Falcon', id:10, img_url: "https://www.gundamplanet.com/pub/media/catalog/product/cache/aa72b28f82ebf2d897600ee194018ec6/p/g/pg-1-72-millennium-falcon-00.jpg"},	
]

let attributes = ['name','cost_in_credits','max_atmosphering_speed','cargo_capacity','passengers']

window.onload = () => {
	const starShip1 = document.querySelector('#starship1');
	const starShip2 = document.querySelector('#starship2');
	starShips.forEach(element => {
		starShip1.innerHTML += `<option value="${element.id}">${element.name}</option>`;
		starShip2.innerHTML += `<option value="${element.id}">${element.name}</option>`;	
	});	

	document.getElementById("compare").addEventListener('click',  function(){
		showLoader();
		run(gen)
		.then(function() {
			hideLoader();
		})
		.catch(function(err){
			hideLoader();
				alert(err.message);
		});
	})
};

function showLoader() {
	document.getElementById('loader1').style.display = "block";
	document.getElementById('loader2').style.display = "block";
}

function hideLoader() {
	document.getElementById('loader1').style.display = "none";
	document.getElementById('loader2').style.display = "none";
}

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
	let ship1Reponse = yield fetch(url + document.querySelector('#starship1').value + "/");
	let ship1 = yield ship1Reponse.json();
	console.log(ship1);
	//fetch the starship2 resource
	let ship2Reponse = yield fetch(url + document.querySelector('#starship2').value + "/");
	let ship2 = yield ship2Reponse.json();
	console.log(ship2);

	for(let i = 0; i < starShips.length; i++){
		if(starShips[i].name == ship1.name){
			console.log(true);
			document.getElementById('image1').src = starShips[i].img_url;
		}
		if(starShips[i].name == ship2.name){
			console.log(true);
			document.getElementById('image2').src = starShips[i].img_url;
		}
	} 

	//fill results in the div
	for (const i of attributes) {
			document.getElementById(`${i}1`).innerHTML = ship1[i];
			if(parseInt(ship1[i],10) > parseInt(ship2[i],10)){
				document.getElementById(`${i}1`).style.color =  "yellowgreen";
				document.getElementById(`${i}1arrowImg`).src = './icons/arrow-up.png';
			}else if(parseInt(ship1[i],10) < parseInt(ship2[i],10)){
				document.getElementById(`${i}1`).style.color =  "red";
				document.getElementById(`${i}1arrowImg`).src = './icons/arrow-down.png';
			}

			document.getElementById(`${i}2`).innerHTML = ship2[i];
			if(parseInt(ship2[i],10) > parseInt(ship1[i],10)){
				document.getElementById(`${i}2`).style.color =  "yellowgreen";
				document.getElementById(`${i}2arrowImg`).src = './icons/arrow-up.png';
			}else if(parseInt(ship2[i],10) < parseInt(ship1[i],10)) {
				document.getElementById(`${i}2`).style.color =  "red";
				document.getElementById(`${i}2arrowImg`).src = './icons/arrow-down.png';
			}
			
	}
}