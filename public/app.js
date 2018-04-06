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
								  "<td>" + coin.description + "</td>" +
								  "<td>" + coin.link + "</td>" +
								  "<td>" + coin.note + "</td>");
			})
		}
}