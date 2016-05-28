  function kimonoCallback(data) {
    // do something with the data
    // please make sure the scope of this function is global
	document.getElementById("carbon").innerHTML = data.results.collection1[6].co2;
	document.getElementById("crude-oil").innerHTML = data.results.collection1[4].oil;
	var bitcoin = data.results.collection1[2].bitcoin;
	document.getElementById("bitcoin").innerHTML = bitcoin.replace('1 Bitcoin =', '');
	document.getElementById("solar-coin").innerHTML = data.results.collection1[5].solar;
	var demand = data.results.collection1[8].property1;
	document.getElementById("gigawatts").innerHTML = demand.replace('Demand ', '').replace('GW','');
	var wind_array = data.results.collection1[11].property1.split("(");
	document.getElementById("wind").innerHTML = wind_array[1].replace(")",'');
	var coal_array = data.results.collection1[12].property1.split("(");
	document.getElementById("coal").innerHTML = coal_array[1].replace(")",'');
	var nuclear_array = data.results.collection1[13].property1.split("(");
	document.getElementById("nuclear").innerHTML = nuclear_array[1].replace(")",'');
	document.getElementById("sea-maldives").innerHTML = data.results.collection1[1].maldiv + 'm';
	var exo_array = data.results.collection1[7].planets.split(" / ");
	document.getElementById("exoplanets").innerHTML = exo_array[1].replace(" planets",'');
	document.getElementById('dashboard').style.visibility = "visible";
  }
  $.ajax({
    "url":"//kimonolabs.com/api/6bsavl58?apikey=mYKI4BfL6lB0ICNIMEJJmmPPgpPa4wq4&callback=kimonoCallback",
    "crossDomain":true,
    "dataType":"jsonp"
});
