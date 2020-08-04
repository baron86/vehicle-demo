(function() {
	'use strict';

	angular.module('app').controller('AddController', AddController);

	AddController.$inject = [ "VehicleService", 'FlashService',"$state" ];
	function AddController(VehicleService, FlashService, $state) {
		
		var vm = this;
		vm.vehicle = null;
		vm.options = [ {} ];
		vm.optionTypes = [ {} ];
		vm.isValidForm = false;
		initController();
		
		function initController() {
			loadOptionTypes();
		}
		
		function loadOptionTypes() {
			
			// get vehicle option types from database
			VehicleService.GetOptionTypes().then(function(OptionTypesRs) {
				if (OptionTypesRs.success) {					
					// vehicle option types
					vm.optionTypes = OptionTypesRs.response;
				}
			})
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

			// Always keep one option form in view.
			if (vm.options.length == 0) {
				vm.addOption();
			}
			
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
			return true;
		}

		vm.validateOptions = function() {
			vm.isValidForm=validateVehicleForm();
			FlashService.clearFlashMessage();
			var optionCounts = new Array();
			angular.forEach(vm.options, function(option, key) {
				var isFound = false;
				if (option.hasOwnProperty('selectedOption')) {
					var optionName = option.selectedOption.optionType.name;
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
		}		
		
		vm.validateOptionPrices = function() {	
			var isValid=true;		
			var priceMsg="Option price is required. Update price or clear.";			
			FlashService.clearFlashMessage();
			angular.forEach(vm.options, function(option, key) {				
				if(option.hasOwnProperty('selectedOption')){
					if (!option.selectedOption.hasOwnProperty('price')) {
						FlashService.Error(priceMsg);
						isValid=false;
					}
					if (typeof option.selectedOption.price == "undefined") {
						FlashService.Error(priceMsg);
						isValid=false;
					}
				}
			});
			return isValid;
		}
		
		vm.save = function() {
			if(vm.validateOptionPrices() && vm.isValidForm) {
				
				var selectedOptions = new Array();						
				angular.forEach(vm.options, function(option, key) {								
					if(option.hasOwnProperty('selectedOption')){								
						selectedOptions.push(option.selectedOption);
					}
				});	
				
				// add selected options to vehicle
				vm.vehicle.options=selectedOptions;
				
				VehicleService.SaveVehicle(angular.toJson( vm.vehicle )).then(function(vehicleRs) {
					if (vehicleRs.success) {
						alert("Saved");
						$state.go('list');
					}
				})
			}
		}
	}
})();