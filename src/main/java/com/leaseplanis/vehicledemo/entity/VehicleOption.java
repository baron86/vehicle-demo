package com.leaseplanis.vehicledemo.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="vehicle_option")
public class VehicleOption {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;

	@OneToOne()
	@JoinColumn(name="option_type_id")
	private OptionType optionType;
	
	@Column
	private double price;	
	
	@ManyToOne(cascade={	CascadeType.DETACH,
			CascadeType.MERGE,
			CascadeType.PERSIST,
			CascadeType.REFRESH})
	@JoinColumn(name="vehicle_id")
	@JsonBackReference
	private Vehicle vehicle;
	
	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}
	
	public VehicleOption() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public OptionType getOptionType() {
		return optionType;
	}

	public void setOptionType(OptionType optionType) {
		this.optionType = optionType;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
}
