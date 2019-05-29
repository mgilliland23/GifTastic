var topics = ["It's Always Sunny In Philadelphia", "South Park", "Rick and Morty", " Spongebob",
    "The Sopranos", "Breaking Bad", "East Bound and Down", "True Detective", "Game of Thrones",
    "The Leftovers"];

//Generate buttons from the topics array and append them to the #buttonContainer
function displayButtons() {
    $("#button-container").empty();
    topics.forEach(function (topic) {
        var button = $("<button>");
        //console.log(topic);
        button.text(topic);
        button.addClass("topic-button btn btn-primary");
        //Add click handler to button
        button.click(function () {
            fetchGifs(topic);
        })

        $("#button-container").append(button);
    });
}

//Given a topic, make an API call to giphy and return an array of 12 gif objects
function fetchGifs(topic) {
    const APIkey = "mvYexwHDWsrMpKSWSF9IvfQi5d5LOfQE";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + topic + "&limit=12&offset=0&rating=PG-13&lang=en";

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        console.log(response.data);
        displayGifs(response.data);
    });

}

//Loop through the array of gif objects, build the gif card, and append each to the #gifContainer
function displayGifs(gifs) {
    $("#gif-container").empty();

    gifs.forEach(function (gifObj) {
        var gifCard = buildGifCard(gifObj);
        $("#gif-container").append(gifCard);
    })
}

//Given a gif object, build the gifCard to display on the page with the still, the title, the rating
function buildGifCard(gifObj) {
    var gifCard = $("<div>").addClass("gif-card card");

    var gif = $("<img>").addClass("card-img-top");
    gif.attr("src", gifObj.images.fixed_height_still.url);
    gif.attr("data-gifURL", gifObj.embed_url);

    //Add click handler that plays the gif in a modal
    gif.click(function () {
        showGifModal(gifObj.images.original.url);
    });

    var cardBody = $("<div>").addClass("card-body");
    var title = $("<h5>").text(gifObj.title).addClass("card-title");
    var rating = $("<p>").text("Rating: " + gifObj.rating.toUpperCase());

    cardBody.append(title);
    cardBody.append(rating);

    gifCard.append(gif);
    gifCard.append(cardBody);

    return gifCard;
}

//Given a gif url, show this gif on the page using a modal 
function showGifModal(url) {
    var gif = $("<img>");
    gif.attr("src", url);

    $(".modal-body").html(gif);

    $('#gif-modal').modal('show')
}

//Add event listener for add topic button click and add the users input to the gloabl topics array
$("#submit-button").on("click", function (e) {
    e.preventDefault();
    var newTopic = $("#new-topic").val();
    topics.push(newTopic);
    $("#new-topic").val("");
    displayButtons();
})

//Call the display buttons function to build the initial list of buttons
displayButtons();



