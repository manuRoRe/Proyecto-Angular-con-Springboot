package com.example.demo.repositorios;
import java.io.Serializable;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.modelos.Curso;


public interface cursoRepositorio extends JpaRepository<Curso, Serializable> {
		@Bean
		public abstract List<Curso> findAll();
		public abstract Curso findById(int id);
		
		@Transactional
		public abstract void delete (Curso u);
		
		@Transactional
		public abstract Curso save (Curso u);
		
		@Transactional
		public abstract void deleteById (int id);
}
