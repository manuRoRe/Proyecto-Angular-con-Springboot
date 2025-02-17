package com.example.demo.repositorios;
import java.io.Serializable;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.modelos.Inscripcion;


public interface inscripcionRepositorio extends JpaRepository<Inscripcion, Serializable> {
		@Bean
		public abstract List<Inscripcion> findAll();
		public abstract Inscripcion findById(int id);
		
		@Transactional
		public abstract void delete (Inscripcion u);	
		
		@Transactional
		public abstract void deleteById (int id);
		
		List<Inscripcion> findByUsuarioId(Long idUsuario);
		
		List<Inscripcion> findByCursoId(Long idCurso);
}
