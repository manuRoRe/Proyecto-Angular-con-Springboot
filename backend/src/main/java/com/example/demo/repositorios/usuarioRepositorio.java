package com.example.demo.repositorios;

import java.io.Serializable;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.modelos.Usuario;

public interface usuarioRepositorio extends JpaRepository<Usuario, Serializable> {
	@SuppressWarnings("null")
	@Bean
	public abstract List<Usuario> findAll();

	public abstract Usuario findById(int id);

	public abstract Usuario findByEmail(String email);

	public abstract Usuario findByEmailAndPassword(String email, String password);

	@SuppressWarnings("null")
	@Transactional
	public abstract void delete(Usuario u);

	@SuppressWarnings({ "unchecked", "null" })
	@Transactional
	public abstract Usuario save(Usuario u);

	@Transactional
	public abstract void deleteById(int id);
}
