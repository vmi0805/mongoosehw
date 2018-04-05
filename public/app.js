function scrape(){

		$.getJSON("/coins", function(data){

			console.log(data)

			displayResults(data)

		})

		function displayResults(coins){

			$("tbody").empty();

			console.log(coins)

			coins.forEach(function(coin){
				// console.log(coin)

				$("tbody").append("<tr><td>" + coin.name + "</td>" +
								  "<tr><td>" + coin.description + "</td>" +
								  "<tr><td>" + coin.link + "</td>" +
								  "<tr><td>" + coin.note + "</td>");
			})
		}
}

// scape();