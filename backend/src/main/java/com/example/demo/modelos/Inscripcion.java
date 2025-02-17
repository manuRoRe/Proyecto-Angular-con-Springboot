package com.example.demo.modelos;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;


/**
 * The persistent class for the inscripcion database table.
 * 
 */
@Entity
@NamedQuery(name="Inscripcion.findAll", query="SELECT i FROM Inscripcion i")
public class Inscripcion implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	

	@Temporal(TemporalType.DATE)
	@Column(name="fecha_inscripcion")
	private Date fechaInscripcion;

	//bi-directional many-to-one association to Curso
	@ManyToOne
	@JoinColumn(name="id_curso")
	private Curso curso;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="id_usuario")
	private Usuario usuario;

	public Inscripcion() {
	}
	public Inscripcion(Date fechaInscripcion, Curso curso, Usuario usuario) {
		super();
		this.fechaInscripcion = fechaInscripcion;
		this.curso = curso;
		this.usuario = usuario;
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getFechaInscripcion() {
		return this.fechaInscripcion;
	}

	public void setFechaInscripcion(Date fechaInscripcion) {
		this.fechaInscripcion = fechaInscripcion;
	}

	public Curso getCurso() {
		return this.curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}