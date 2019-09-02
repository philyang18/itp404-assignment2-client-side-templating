
const resultsTemplate = Handlebars.compile(
  document.getElementById('results-template').innerHTML
  );
Handlebars.registerHelper('convert-sub', function(number) {
  return number.toLocaleString() + " subscribers";
});

$('#reddit-form').submit(async function(e) {
  e.preventDefault();

  $('#loading-spinner').addClass("loader");
  $('#results').html("");
  $('#error').html("");

  let searchValue = $('#search-bar').val(); 
  $('#search-bar').val("");
  var endpoint = 'https://www.reddit.com/r/' + searchValue + '.json'; 

  try{
    let results = await $.ajax({
      type: 'GET',
      url: endpoint
    });
    console.log(results);
    let sanitizedHtml = resultsTemplate({ results });
    $('#loading-spinner').removeClass("loader");
    $('#results').html(sanitizedHtml);
    $('#error').html("");
  }
  catch{
    $('#loading-spinner').removeClass("loader");
    $('#results').html("");
    $('#error').html("Oops! Something went wrong!");
  }
});

