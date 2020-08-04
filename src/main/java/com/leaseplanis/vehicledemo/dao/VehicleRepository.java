package com.leaseplanis.vehicledemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leaseplanis.vehicledemo.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}
