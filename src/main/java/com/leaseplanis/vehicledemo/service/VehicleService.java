package com.leaseplanis.vehicledemo.service;

import java.util.List;

import com.leaseplanis.vehicledemo.entity.Vehicle;

public interface VehicleService {
	public List<Vehicle> findAll();
	public Vehicle findById(long theId);
	public void save(Vehicle theVehicle);
	public void delete(Vehicle theVehicle);
}
