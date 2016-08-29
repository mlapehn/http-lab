angular.module('TheCriminalsApp', [])
	.controller('CriminalsController', CriminalsController);

CriminalsController.$inject = ['$http'];
function CriminalsController($http){
	self = this;
	self.all = [];
	self.addCriminal = addCriminal;
	self.deleteCriminal = deleteCriminal;

	function getCriminals() {
		$http.get('http://localhost:3000/criminals')
	      .then(function(response){
	        self.all = response.data.criminals;
	    });
	}
	getCriminals();

	function addCriminal() {
		criminal = self.newCriminal;
	    self.all.push(self.newCriminal);
	    $http({
	      url: 'http://localhost:3000/criminals', // IP address replaced with ##'s
	      method: 'POST',
	      data: criminal,
	      headers: {'Content-Type': 'application/json'}
	    });
	    self.newCriminal = {};
	}

	function deleteCriminal(criminal) {
		var criminalId = criminal._id;
	    $http({
	      url: 'http://localhost:3000/criminals/' + criminalId, // IP address replaced with ##'s
	      method: 'DELETE',
	      headers: {'Content-Type': 'application/json'}
	    });
	    self.all.pop(criminal);
	}
}
