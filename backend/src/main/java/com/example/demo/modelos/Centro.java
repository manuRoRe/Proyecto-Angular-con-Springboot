package com.example.demo.modelos;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the centro database table.
 * 
 */
@Entity
@NamedQuery(name="Centro.findAll", query="SELECT c FROM Centro c")
public class Centro implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String direccion;

	@Lob
	private byte[] imagen;

	public Centro(String direccion, byte[] imagen, String nombre, String sitioWeb) {
		super();
		this.direccion = direccion;
		this.imagen = imagen;
		this.nombre = nombre;
		this.sitioWeb = sitioWeb;
	}

	private String nombre;

	@Column(name="sitio_web")
	private String sitioWeb;

	public Centro() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDireccion() {
		return this.direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
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

	public String getSitioWeb() {
		return this.sitioWeb;
	}

	public void setSitioWeb(String sitioWeb) {
		this.sitioWeb = sitioWeb;
	}

}