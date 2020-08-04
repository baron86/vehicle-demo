package com.leaseplanis.vehicledemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leaseplanis.vehicledemo.entity.OptionType;

public interface OptionTypeRepository extends JpaRepository<OptionType, Integer> {

}
