package com.vcube.teamexpensemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.teamexpensemanager.entity.Event;

import jakarta.persistence.Entity;


public interface EventRepository extends JpaRepository<Event,Long>{

}
