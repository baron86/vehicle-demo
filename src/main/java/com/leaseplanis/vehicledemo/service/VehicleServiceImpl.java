package com.leaseplanis.vehicledemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leaseplanis.vehicledemo.dao.VehicleRepository;
import com.leaseplanis.vehicledemo.entity.Vehicle;


@Service
public class VehicleServiceImpl implements VehicleService {
	
	@Autowired
	private VehicleRepository vehicleRepository;

	@Override
	public List<Vehicle> findAll() {		
		return vehicleRepository.findAll();
	}

	@Override
	public Vehicle findById(long theId) {		
		Optional<Vehicle> result = vehicleRepository.findById(theId);
		Vehicle theVehicle = null;
		if (result.isPresent()) {
			theVehicle = result.get();
		} else {
			// we didnt find the vehicle
			throw new RuntimeException("Did not find vehicle id - " + theId);
		}
		return theVehicle;
	}

	@Override
	public void save(Vehicle theVehicle) {
		vehicleRepository.save(theVehicle);
	}

	@Override
	public void delete(Vehicle theVehicle) {
		vehicleRepository.delete(theVehicle);
	}

}
