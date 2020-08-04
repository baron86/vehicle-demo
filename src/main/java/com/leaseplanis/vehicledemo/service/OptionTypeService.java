package com.leaseplanis.vehicledemo.service;

import java.util.List;

import com.leaseplanis.vehicledemo.entity.OptionType;

public interface OptionTypeService {
	public List<OptionType> findAll();
	public OptionType save(OptionType theOptionType);
}
