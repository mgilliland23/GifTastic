var topics = ["Game of Thrones", "The Sopranos", "Breaking Bad", "The Wire", "True Detective",
    "Always Sunny In Philadelphia", "The Leftovers", "South Park", "Rick and Morty", " Spongebob"];

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

//Given a topic, make an API call to giphy and return an array of 10 gif objects
function fetchGifs(topic) {
    const APIkey = "mvYexwHDWsrMpKSWSF9IvfQi5d5LOfQE";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + topic + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        console.log(response.data);
        displayGifs(response.data);
    });

}

//Loop through the array of giph objects, build the gif tile, and append each to the #gifContainer
function displayGifs(gifs) {
    $("#gif-container").empty();

    gifs.forEach(function (gifObj) {
        var gifCard = buildGifCard(gifObj);
        $("#gif-container").append(gifCard);
    })
}

//Given a gif object, build the gifCard to display on the page with the still, the gif, the rating
function buildGifCard(gifObj) {
    var gifCard = $("<div>").addClass("gif-card card");

    var gif = $("<img>").addClass("card-img-top");
    gif.attr("src", gifObj.images.fixed_height_still.url);
    gif.attr("data-gifURL", gifObj.embed_url);

    //Add click handler that plays or stops the gif
    gif.click(function () {
        if (gif.attr("src") === gifObj.images.fixed_height_still.url) {
            gif.attr("src", gifObj.images.fixed_height.url)
        }
        else {
            gif.attr("src", gifObj.images.fixed_height_still.url);
        }
    });

    // <div class="card" style="width: 18rem;">
    //     <img class="card-img-top" src="..." alt="Card image cap">
    //         <div class="card-body">
    //             <h5 class="card-title">Card title</h5>
    //             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //             <a href="#" class="btn btn-primary">Go somewhere</a>
    //         </div>
    // </div>

    var cardBody = $("<div>").addClass("card-body");
    var title = $("<h5>").text(gifObj.title).addClass("card-title");
    var rating = $("<p>").text("Rating: " + gifObj.rating);

    cardBody.append(title);
    cardBody.append(rating);

    gifCard.append(gif);
    gifCard.append(cardBody);

    return gifCard;
}
//Create function that adds a topic to the topic array. Call function to append buttons to #buttonContainer


displayButtons();

//Add event listener for add topic button click
$("#submit-button").on("click", function (e) {
    e.preventDefault();
    var newTopic = $("#new-topic").val();
    topics.push(newTopic);
    $("#new-topic").val("");
    displayButtons();
})


