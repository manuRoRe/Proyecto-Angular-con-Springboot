package com.example.demo.modelos;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;


/**
 * The persistent class for the usuario database table.
 * 
 */
@Entity
@NamedQuery(name="Usuario.findAll", query="SELECT u FROM Usuario u")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private byte admin;

	private String aficiones;

	private String apellidos;

	private String email;

	private String nombre;

	private String pais;

	private String password;

	private String sexo;

	//bi-directional many-to-one association to Inscripcion
	@OneToMany(mappedBy="usuario")
	private List<Inscripcion> inscripcions;

	public Usuario() {
	}
	
	

	public Usuario(byte admin, String aficiones, String apellidos, String email, String nombre, String pais,
			String password, String sexo) {
		super();
		this.admin = admin;
		this.aficiones = aficiones;
		this.apellidos = apellidos;
		this.email = email;
		this.nombre = nombre;
		this.pais = pais;
		this.password = password;
		this.sexo = sexo;
	}



	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getAdmin() {
		return this.admin;
	}

	public void setAdmin(byte admin) {
		this.admin = admin;
	}

	public String getAficiones() {
		return this.aficiones;
	}

	public void setAficiones(String aficiones) {
		this.aficiones = aficiones;
	}

	public String getApellidos() {
		return this.apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPais() {
		return this.pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSexo() {
		return this.sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public List<Inscripcion> getInscripcions() {
		return this.inscripcions;
	}

	public void setInscripcions(List<Inscripcion> inscripcions) {
		this.inscripcions = inscripcions;
	}

	public Inscripcion addInscripcion(Inscripcion inscripcion) {
		getInscripcions().add(inscripcion);
		inscripcion.setUsuario(this);

		return inscripcion;
	}

	public Inscripcion removeInscripcion(Inscripcion inscripcion) {
		getInscripcions().remove(inscripcion);
		inscripcion.setUsuario(null);

		return inscripcion;
	}

}