package com.leaseplanis.vehicledemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leaseplanis.vehicledemo.dao.OptionTypeRepository;
import com.leaseplanis.vehicledemo.entity.OptionType;

@Service
public class OptionTypeServiceImpl implements OptionTypeService {

	@Autowired
	private OptionTypeRepository optionTypeRepository;

	@Override
	public List<OptionType> findAll() {
		return optionTypeRepository.findAll();
	}

	@Override
	public OptionType save(OptionType theOptionType) {
		return optionTypeRepository.save(theOptionType);
	}
}
