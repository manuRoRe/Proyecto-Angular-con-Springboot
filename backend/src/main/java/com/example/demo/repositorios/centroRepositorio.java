package com.example.demo.repositorios;

import java.io.Serializable;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.modelos.Centro;

public interface centroRepositorio extends JpaRepository<Centro, Serializable> {
	@SuppressWarnings("null")
	@Bean
	public abstract List<Centro> findAll();

	public abstract Centro findById(int id);

	@SuppressWarnings("null")
	@Transactional
	public abstract void delete(Centro u);

	@SuppressWarnings({ "null", "unchecked" })
	@Transactional
	public abstract Centro save(Centro u);

	@Transactional
	public abstract void deleteById(int id);
}
