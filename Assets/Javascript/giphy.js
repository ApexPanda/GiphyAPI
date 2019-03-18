$(document).ready(function () {
	var pAndR = ["Ron Swanson", "April Ludgate", "Leslie Knopp", "Ben Wyatt", "Andy Dwyer", "Sweetums", "Tom Haverford", "Ann Perkins"];

	// Add buttons for original movies array
	function renderButtons() {
		$("#show-buttons").empty();
		for (i = 0; i < pAndR.length; i++) {
			$("#show-buttons").append("<button class='btn btn-success' data-show='" + pAndR[i] + "'>" + pAndR[i] + "</button>");
		}
	}

	renderButtons();

	// Adds a button for the show input
	$("#add-show").on("click", function () {
		event.preventDefault();
		var show = $("#show-input").val().trim();
		pAndR.push(show);
        renderButtons();
        console.log(pAndR);
		return;
	});


	// Gets gif from Giphy API 
	$("button").on("click", function () {
        var show = $(this).attr("data-show");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            show + "&api_key=RpfTEa8IXfuMLWfpzrglmryWn0HkKOp8&limit=10";
            
            console.log(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#shows").empty();
			for (var i = 0; i < results.length; i++) {
				var showDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var showImg = $("<img>");

				showImg.attr("src", results[i].images.original_still.url);
				showImg.attr("data-still", results[i].images.original_still.url);
				showImg.attr("data-animate", results[i].images.original.url);
				showImg.attr("data-state", "still");
				showImg.attr("class", "gif");
				showDiv.append(p);
				showDiv.append(showImg);
				$("#shows").append(showDiv);
			}
		});
	});

    // makes the gifs animate or stop moving on click
	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	$(document).on("click", ".gif", changeState);

});
