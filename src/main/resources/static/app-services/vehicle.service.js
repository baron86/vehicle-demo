
(function () {
    'use strict';

    angular
        .module('app')
        .factory('VehicleService', VehicleService);

    VehicleService.$inject = ['$http'];
    function VehicleService($http) {
        var service = {};

        service.GetVehicles = GetVehicles;
        service.GetVehicle = GetVehicle;
        service.GetOptionTypes=GetOptionTypes;
        service.DeleteVehicle=DeleteVehicle;
        service.SaveVehicle=SaveVehicle;
        service.UpdateVehicle=UpdateVehicle;
        service.SaveOptionType=SaveOptionType;
        service.ExportCSV=ExportCSV;
        return service;        
        
        function GetVehicles() {
            return $http.get('/api/v1/vehicles').then(handleSuccess, handleError);
        }
        
        function GetVehicle(vehicleId) {
            return $http.get('/api/v1/vehicles/'+vehicleId).then(handleSuccess, handleError);
        }
        
        function UpdateVehicle(vehicle) {
            return $http.put('/api/v1/vehicles',vehicle).then(handleSuccess, handleError);
        }
        
        function DeleteVehicle(vehicleId) {
            return $http.delete('/api/v1/vehicles/'+vehicleId).then(handleSuccess, handleError);
        }
        
        function SaveVehicle(vehicle) {
            return $http.post('/api/v1/vehicles',vehicle).then(handleSuccess, handleError);
        }
        
        function GetOptionTypes() {
            return $http.get('/api/v1/vehicles/optionTypes').then(handleSuccess, handleError);
        }
        
        function SaveOptionType(optionType) {
            return $http.post('/api/v1/vehicles/optionTypes',optionType).then(handleSuccess, handleError);
        }
        
        function ExportCSV() {
        	location.href='/api/v1/vehicles/export-vehicles';
        }

        function handleSuccess(res) {
        	return { success: true, response:res.data,status: res.status };
        }

        function handleError(error) {
        	return { success: false, message: error.statusText,status: error.status };
        }
    }

})();
