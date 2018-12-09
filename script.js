'use strict';

// put your own value below!
const apiKey = 'cZ9vEhKBbwxKlpp80lYWwyCuJ2AJXo09Mc5GFoEL'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

// function displayResults(responseJson) {
//   // if there are previous results, remove them
//   console.log(responseJson);
//   $('#results-list').empty();
//   // iterate through the items array
//   for (let i = 0; i < responseJson.items.length; i++){
//     // for each video object in the items 
//     //array, add a list item to the results 
//     //list with the video title, description,
//     //and thumbnail
//     $('#results-list').append(
//       `<li><h3>${responseJson.items[i].snippet.title}</h3>
//       <p>${responseJson.items[i].snippet.description}</p>
//       <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
//       </li>`
//     )};
//   //display the results section  
//   $('#results').removeClass('hidden');
// };

function getParks(state, results=10) {
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: results
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerms = $('#js-state-options').val().join('&stateCode=');
    const maxResults = $('#js-max-results').val();
    console.log(searchTerms);
    console.log(maxResults);
    getParks(searchTerms, maxResults);
  });
}

$(watchForm);