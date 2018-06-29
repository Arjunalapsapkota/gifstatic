$(document).ready(function()
{
    
 

  $("#display").on("click", function() 
    {
        event.preventDefault();
        $("#giphy-list").empty();
          var animal = $("#user-input").val();
          var btn=$("<button>");
          btn.addClass("spacing");
          btn.append(animal);
          $("#animal-list").append(btn);
          $("#user-input").val("");
          var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=dc6zaTOxFJmzC&limit=10";
          $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function(response) {
          var results = response.data;
              for (var i = 0; i < results.length; i++) {
                //if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                  
                  var string_source=results[i].images.fixed_height.url;
                  //console.log(n);
                  //var string_source= JSON.stringify(results[i].images.fixed_height.url);
                
                  var Array=string_source.split("200.");
                  //gifDiv.append(Array[0]);
                  //gifDiv.append(Array[1]);
                  var still=Array[0]+"200_s."+Array[1];                             // Source for still picture 
                  var animate=string_source;                                                 // Source for moving picture

                  var gifDiv = $("<div>");
                  var animalImage = $("<img>");
                  console.log(still);
                  animalImage.attr("src", animate);
                  animalImage.attr("data-still",still);
                  animalImage.attr("data-animate",animate);
                  animalImage.attr("data-state","animate");
                  animalImage.addClass("gif");
                  gifDiv.addClass("arrange");
                  gifDiv.append(animalImage);
                  $("#giphy-list").prepend(gifDiv);
               // }
              }
              
            });

            $(".gif").on("click", function(){
              alert("clicked");
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
              
            $(".spacing").on("click", function() 
            {
              alert($(this).text());
            });
    });
    
});