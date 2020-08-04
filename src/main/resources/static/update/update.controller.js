(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpdateController', UpdateController);

    UpdateController.$inject = ["VehicleService","$stateParams","$state", "FlashService"];
    function UpdateController(VehicleService,$stateParams,$state, FlashService) {
        var vm = this;
        vm.vehicle = null;
        vm.options = [ {} ];
		vm.optionTypes = [ {} ];
        var vehicleId = $stateParams.vehicleId;
        vm.isValidForm = false;
        initController();

        function initController() {
            loadVehicle();
        }
        function loadVehicle() {        	
        	if(vehicleId == null) {
            	$state.go('list');
            } else {
            	// get vehicle from database
            	VehicleService.GetVehicle(vehicleId).then(function (vehicleRs) {	
            		if(vehicleRs.success) {        			
            			vm.vehicle=vehicleRs.response;
            			vm.options=vm.vehicle.options;
            		}
            	});
            	// get vehicle option types from database
    			VehicleService.GetOptionTypes().then(function(OptionTypesRs) {
    				if (OptionTypesRs.success) {					
    					// vehicle option types
    					vm.optionTypes = OptionTypesRs.response;
    					
    				}
    			})
            }
        } 

        // Add new option to form.
		vm.addOption = function() {
			var newOption = {};
			vm.options.push(newOption);
		}

		// Remove option from form.
		vm.removeOption = function(option) {
			var index = vm.options.indexOf(option);
			vm.options.splice(index, 1);
			
			// revalidate options
			vm.validateOptions();
		}
		
        vm.validate = function() {
			vm.isValidForm = validateVehicleForm();
		}
        
        function validateVehicleForm() {
			if(vm.vehicle == null) {
				return false;
			}			
			if (!vm.vehicle.hasOwnProperty('make')) {
				return false;
			}
			if (!vm.vehicle.hasOwnProperty('model')) {
				return false;
			}
			if (!vm.vehicle.hasOwnProperty('edition')) {
				return false;
			}
			if (!vm.vehicle.hasOwnProperty('price')) {
				return false;
			}
			if (typeof vm.vehicle.make == "undefined") {
				return false;
			}
			if (typeof vm.vehicle.model == "undefined") {
				return false;
			}
			if (typeof vm.vehicle.edition == "undefined") {
				return false;
			}
			if (typeof vm.vehicle.price == "undefined") {
				return false;
			}
			
			var isValid=true;			
			angular.forEach(vm.vehicle.options, function(option, key) {	
				if (!option.hasOwnProperty('price')) {
					isValid=false;
				}
				if (typeof option.price == "undefined") {
					isValid=false;
				}
			});
			if(!isValid) {
				return false;
			}			
			return true;
		}
        
        vm.validateOptions = function() {
			vm.isValidForm=validateVehicleForm();
			FlashService.clearFlashMessage();
			var optionCounts = new Array();
			angular.forEach(vm.options, function(option, key) {
				var isFound = false;
				if (option.hasOwnProperty('optionType')) {
					var optionName = option.optionType.name;
					angular.forEach(optionCounts, function(optionCount, key) {
						var optionCountName = optionCount.name;
						if (optionName.toLowerCase() === optionCountName.toLowerCase()) {
							isFound = true;
							optionCount.count++;
						}
					});
					if (!isFound) {
						var optionCount = new Object();
						optionCount.name = optionName;
						optionCount.count = 1;
						optionCounts.push(optionCount);
					}
					angular.forEach(optionCounts, function(optionCount, key) {
						if (optionCount.count > 1) {
							// disable save button if form is not valid
							vm.isValidForm=false;
							FlashService.Error(optionCount.name + " is duplicated. Either change option or clear.");
							return;
						}
					});
				}
			})	
			if(optionCounts.length == 0) {
				vm.isValidForm=true;
			}
		}		
		
		vm.validateOptionPrices = function() {	
			var isValid=true;		
			var priceMsg="Option price is required. Update price or clear.";			
			FlashService.clearFlashMessage();
			angular.forEach(vm.options, function(option, key) {				
				if(option.hasOwnProperty('optionType')){
					if (!option.optionType.hasOwnProperty('price')) {
						FlashService.Error(priceMsg);
						isValid=false;
					}
					if (typeof option.optionType.price == "undefined") {
						FlashService.Error(priceMsg);
						isValid=false;
					}
				}
			});
			return isValid;
		}
		
        vm.save = function() { 
        	if(vm.isValidForm) {        		
        		
        		// assign option id to selected option type
    			angular.forEach(vm.options, function(option, key1) {
        			angular.forEach(vm.optionTypes, function(optionType, key2) {
            			if(optionType.name == option.optionType.name) {
            				vm.options[key1].optionType.id = optionType.id;
            			}
            		});
        		});
        		
        		vm.vehicle.options = vm.options;
            	VehicleService.UpdateVehicle(angular.toJson( vm.vehicle )).then(function (vehicleRs) {
            		if(vehicleRs.success) {
            			alert("Saved");
    					$state.go('list');
    				}
            	});
        	}
        }
    }
})();