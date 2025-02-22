package com.example.demo.repositorios;

import java.io.Serializable;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.modelos.Curso;

public interface cursoRepositorio extends JpaRepository<Curso, Serializable> {
	@SuppressWarnings("null")
	@Bean
	public abstract List<Curso> findAll();

	public abstract Curso findById(int id);

	@SuppressWarnings("null")
	@Transactional
	public abstract void delete(Curso u);

	@SuppressWarnings({ "unchecked", "null" })
	@Transactional
	public abstract Curso save(Curso u);

	@Transactional
	public abstract void deleteById(int id);
}
