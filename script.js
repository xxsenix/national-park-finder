'use strict';

const apiKey = 'cZ9vEhKBbwxKlpp80lYWwyCuJ2AJXo09Mc5GFoEL'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them

  $('#results-list').empty();
  // iterate through the data array

  for (let i = 0; i < responseJson.data.length; i++){
    
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
}

function getParks(state, results) {
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: results,
    start: "0"
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#results-list').empty();
    const stateCodes = $('#js-state-options').val();
    const maxResults = $('#js-max-results').val();
    getParks(stateCodes, maxResults);
  });
}

$(watchForm);