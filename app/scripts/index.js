var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var githubtoken = require('./githubtoken.js').token;
var moment = require('moment');

//global variables

if(typeof(githubtoken) !== "undefined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken,
    }
  });
}

var username = "gabrielzzarate";
var hubUser = "https://api.github.com/users/" + username;
var hubRepo =  "https://api.github.com/users/" + username + "/repos";



//init function
function init() {
	fetchUserData();
	fetchRepoData();
	
}

init();


function fetchUserData() {
	$.getJSON(hubUser, displaySidebar);
	
}

function fetchRepoData() {
	$.getJSON(hubRepo, displayRepos); 
	
}


function displaySidebar(json) {

console.log(json);

var source = $('#sidebar-template').html();
  var template = handlebars.compile(source);
  var renderedTemplate = template(json);

  

  $('.user-profile-image').html(renderedTemplate);


displayHeader(json);
}

function displayHeader(json){

	var source = $('#header-template').html();
  var template = handlebars.compile(source);
  var renderedTemplate = template(json);


  

  $('.header-profile-image').prepend(renderedTemplate);

}

function displayRepos(repoData) {
	console.log(repoData);

 	repoData = mostRecentRepo(repoData);



  var source = $('#repo-template').html();
  var template = handlebars.compile(source);
  var renderedTemplate = template({'repoData': repoData});

  

  $('.repo-content').html(renderedTemplate);

mostRecentRepo(repoData);
}


function mostRecentRepo(repoData) {

repoData = _.sortBy(repoData, function(repoData){

		return repoData.pushed_at;

	});

repoData.reverse();


	
repoData = _.map(repoData, function(repoData){
		var formattedDate = new Date(repoData.pushed_at);
		repoData.pushed_at = moment(formattedDate).startOf('hours').fromNow();
		return repoData;

	});
	return repoData;
}
















