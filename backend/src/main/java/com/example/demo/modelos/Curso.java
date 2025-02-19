package com.example.demo.modelos;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the curso database table.
 * 
 */
@Entity
@NamedQuery(name="Curso.findAll", query="SELECT c FROM Curso c")
public class Curso implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String descripcion;

	@Column(name="id_centro")
	private int idCentro;

	@Lob
	private byte[] imagen;

	private String nombre;

	public Curso() {
	}
	
	public Curso(String descripcion, int idCentro, byte[] imagen, String nombre) {
		super();
		this.descripcion = descripcion;
		this.idCentro = idCentro;
		this.imagen = imagen;
		this.nombre = nombre;
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getIdCentro() {
		return this.idCentro;
	}

	public void setIdCentro(int idCentro) {
		this.idCentro = idCentro;
	}

	public byte[] getImagen() {
		return this.imagen;
	}

	public void setImagen(byte[] imagen) {
		this.imagen = imagen;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}