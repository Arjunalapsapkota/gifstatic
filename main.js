$(document).ready(function()
{

  var getImages =function(animal)
  {
    $("#giphy-list").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) 
    {
        var results = response.data;
        for (var i = 0; i < results.length; i++) 
        {
        var string_source=results[i].images.fixed_height.url;
        var Array=string_source.split("200.");
            //gifDiv.append(Array[0]);
            //gifDiv.append(Array[1]);
        var still=Array[0]+"200_s."+ Array[1];                             // Source for still picture 
        var animate=string_source;                                         // Source for moving picture
        var gifDiv = $("<div>");
        var animalImage = $("<img>");
        animalImage.attr("src", animate);
        animalImage.attr("data-still",still);
        animalImage.attr("data-animate",animate);
        animalImage.attr("data-state","animate");
        animalImage.addClass("giphy");
        gifDiv.addClass("arrange");
        gifDiv.append(animalImage);
        $("#giphy-list").append(gifDiv);
        }
    });
  }

  $("#submit_button").on("click", function() 
    {
      // this function gets the user input, reset the input fields and pass
      // user input to a function;===> getImages() function receive
      // event.preventDefault(); 
            
      var animal = $("#user-input").val();
            
      var animal_button=$("<button>");
        //animal_button.attr("id","button-list");
      animal_button.addClass("spacing");
      animal_button.append(animal);
            
      $("#animal-list").append(animal_button);
      $("#user-input").val("");
      getImages(animal);
            
      $(".giphy").on("click", function()
        {
          var state = $(this).attr("data-state");         
          if (state === "still") 
          {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } 
          else 
          {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
        //detecting dynamic-button press and displaying respective images  
        $(".spacing").on("click", function() 
        {
          var animal=$(this).text();
          getImages(animal);
        });
      });
});