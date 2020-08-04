(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ["VehicleService","$state", 'FlashService','$scope'];
    function ListController(VehicleService,$state, FlashService,$scope) {
    	
        var vm = this;
        var optionTypes = [];
        vm.vehicleTableArray = [];
        vm.isValidOptionForm=false;
        vm.optionName=null;
        initController();
        
        function initController() {
            loadVehicles();
        }
        
        function loadVehicles() {
        	
        	// refresh table data
        	vm.vehicleTableArray = [];
        	optionTypes = [];
        	
        	// get vehicles from database
        	VehicleService.GetVehicles().then(function (vehicleRs) {				
				if(vehicleRs.success) {
					var vehicleArray=vehicleRs.response;	
					
					// get vehicle option types from database
					VehicleService.GetOptionTypes().then(function (OptionTypesRs) {				
						if(OptionTypesRs.success) {
							angular.forEach(vehicleArray, function(vehicle, key) {
								
								// vehicle options
								var vehicleOptions = vehicle.options;
								
								// vehicle option types
								optionTypes = OptionTypesRs.response;
								
								// vehicle table row object
								var vehicleObj = new Object();
								vehicleObj.id = vehicle.id;
								vehicleObj.make = vehicle.make;
								vehicleObj.model = vehicle.model;
								vehicleObj.edition = vehicle.edition;
								vehicleObj.base = numberWithCommas(vehicle.price);
								
								// compare configured vehicle options to option types from DB to create dynamic table headers and rows 
								angular.forEach(optionTypes, function(optionTypeObj, key) {
									var name=optionTypeObj.name.toLowerCase();									
									vehicleObj[name] = "-";
									angular.forEach(vehicleOptions, function(vehicleOption, key) {
										var optionTypeName = vehicleOption.optionType.name;
										if(optionTypeName.toLowerCase() === name.toLowerCase()) {
											vehicleObj[name] = numberWithCommas(vehicleOption.price);
										}
									});
								});
								vm.vehicleTableArray.push(vehicleObj);
							});
		        		}
		            });
        		}
            });
        }
        
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        vm.validateOption = function() {
        	vm.isValidOptionForm = validateOptionForm();
		}
        
        function validateOptionForm() {
        	var isValid = true;
			FlashService.clearFlashMessage();
			
			// check if input is empty
			if (vm.optionName==null) {
				return false;
			}
			
			// check for duplicate option type
			angular.forEach(optionTypes, function(optionType, key) {
				if (optionType.name.toLowerCase() === vm.optionName.toLowerCase()) {
					FlashService.Error(optionType.name + " already exists.");
					isValid = false;
				}
			});
			return isValid;
		}
        
        // go to vehicle update view
        vm.update = function(id) {
        	$state.go('update', {vehicleId: id})
        }
        
        vm.exportCSV = function() {
        	VehicleService.ExportCSV();
        }
        
        vm.SaveOptionType = function(id) {
        	VehicleService.SaveOptionType(angular.toJson( vm.optionName )).then(function(optionTypeRs) {
				if (optionTypeRs.success) {
					loadVehicles();
					
				}
			});
        	vm.optionName="";
        	$scope.focusInput = false;
        }
        
        vm.delete = function(vehicleId) {
        	if (confirm("Are you sure you want to delete this vehicle?")) {
        		VehicleService.DeleteVehicle(vehicleId).then(function (OptionTypesRs) {	
        			vm.vehicleTableArray = [];
        			loadVehicles();
        		})
        	}
        }
        
    }
})();