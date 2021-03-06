﻿const Q = require('q');
const axios = require('axios');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

const elasticEndpoint = 'http://localhost:9200';

// Constructor
const searchService = function () {	
}

searchService.prototype.getData = function (url) {	
	return axios.get(url).then(function(result){
		if (result && result.data){
			console.log(result.data.version);
		}
	}, function(error){
		console.log(error);
	});	
}

searchService.prototype.searchData = function(){
	client.search({
  		q: 'pants'
	}).then(function (body) {
  		let hits = body.hits.hits;
	}, function (error) {
  		console.trace(error.message);
	});
}

searchService.prototype.getRestaurants = function(){
	let url = 'http://localhost:9200/place/restaurants/_search';
	let defer = Q.defer();
	axios.get(url).then(function(result){
		defer.resolve(result.data.hits.hits);
	}, function(error){
		console.log(error);
		defer.reject(error);
	});
	return defer.promise;
}

module.exports = new searchService;