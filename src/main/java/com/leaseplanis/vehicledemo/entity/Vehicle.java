package com.leaseplanis.vehicledemo.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="vehicle")
public class Vehicle {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column
	private String make;
	
	@Column
	private String model;
	
	@Column
	private String edition;
	
	@Column
	private double price;
	
	@OneToMany(mappedBy="vehicle", fetch=FetchType.EAGER,
			cascade={CascadeType.ALL},orphanRemoval=true)
	@JsonManagedReference
	private List<VehicleOption> options;
	
	public Vehicle() {
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getMake() {
		return make;
	}
	
	public void setMake(String make) {
		this.make = make;
	}
	
	public String getModel() {
		return model;
	}
	
	public void setModel(String model) {
		this.model = model;
	}
	
	public String getEdition() {
		return edition;
	}
	
	public void setEdition(String edition) {
		this.edition = edition;
	}
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public List<VehicleOption> getOptions() {
		return options;
	}
	
	public void setOptions(List<VehicleOption> options) {
		this.options = options;
	}
	
	public void add(VehicleOption tempVehicleOption) {
		if(options==null) {
			options=new ArrayList<>();
		}
		options.add(tempVehicleOption);
		tempVehicleOption.setVehicle(this);		
	}
}
