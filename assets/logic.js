

var topics = ["Game of Thrones", "The Sopranos", "Breaking Bad", "The Wire", "True Detective",
    "Always Sunny In Philadelphia", "The Leftovers", "South Park", "Rick and Morty", " Spongebob"];

//Generate buttons from the topics array and appends them to the #buttonContainer
function displayButtons() {
    topics.forEach(function (topic) {
        var button = $("<button>");
        //console.log(topic);
        button.text(topic);
        button.addClass("topicButton");

        $("#buttonContainer").append(button);
    });
}

displayButtons();

//Given a topic, make an API call to giphy and return an array 10 of giph objects
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
    $("#gifContainer").empty();

    gifs.forEach(function (gifObj) {
        var gifTile = buildGifTile(gifObj);
        $("#gifContainer").append(gifTile);
    })
}

//Given a gif object, build the gif to display on the page
function buildGifTile(gifObj) {
    var gifTile = $("<div>");
    gifTile.addClass("gifTile");

    var gif = $("<img>");
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

    gifTile.append(gif);

    var rating = $("<p>").text("Rating: " + gifObj.rating);

    gifTile.append(rating);

    return gifTile;
}

//Create function that adds a topic to the topic array. Call function to append buttons to #buttonContainer

//Add event listener for topic button clicks

$(".topicButton").on("click", function () {
    var topic = $(this).text();
    console.log(topic);
    fetchGifs(topic);
})

//Add event listener for add topic button click
