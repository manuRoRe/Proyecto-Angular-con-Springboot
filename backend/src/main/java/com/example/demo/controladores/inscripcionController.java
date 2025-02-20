package com.example.demo.controladores;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.controladores.usuarioController.DatosAltaUsuario;
import com.example.demo.modelos.Curso;
import com.example.demo.modelos.Inscripcion;
import com.example.demo.modelos.Usuario;
import com.example.demo.repositorios.cursoRepositorio;
import com.example.demo.repositorios.inscripcionRepositorio;
import com.example.demo.repositorios.usuarioRepositorio;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/inscripcion")
public class inscripcionController {

	@Autowired
	usuarioRepositorio usuRep;

	@Autowired
	cursoRepositorio curRep;

	@Autowired
	inscripcionRepositorio insRep;

	@GetMapping("/obtener")
	public List<DTO> getInscripciones() {
		List<DTO> listaInscripcionesDTO = new ArrayList<>();
		List<Inscripcion> inscripciones = insRep.findAll();
		for (Inscripcion u : inscripciones) {
			DTO dtoI = new DTO();
			dtoI.put("id", u.getId());
			dtoI.put("fecha_inscripcion", u.getFechaInscripcion().toString());
			dtoI.put("id_curso", u.getCurso().getId());
			dtoI.put("id_usuario", u.getUsuario().getId());

			listaInscripcionesDTO.add(dtoI);
		}
		return listaInscripcionesDTO;
	}

	@GetMapping(path = "/obtener/{id}")
	public DTO getInscripcion(@PathVariable int id) {
		DTO dtoI = new DTO();
		Inscripcion u = insRep.findById(id);
		dtoI.put("id", u.getId());
		dtoI.put("fecha_inscripcion", u.getFechaInscripcion().toString());
		dtoI.put("id_curso", u.getCurso().getId());
		dtoI.put("id_usuario", u.getUsuario().getId());
		return dtoI;
	}

	@GetMapping(path = "/usuario/{id}")
	public List<DTO> getInscripcionUser(@PathVariable long id) {
		List<DTO> listaInscripcionesDTO = new ArrayList<>();
		List<Inscripcion> inscripciones = insRep.findByUsuarioId(id);
		for (Inscripcion u : inscripciones) {
			DTO dtoI = new DTO();
			dtoI.put("id", u.getId());
			dtoI.put("fecha_inscripcion", u.getFechaInscripcion().toString());
			dtoI.put("id_curso", u.getCurso().getId());
			dtoI.put("id_usuario", u.getUsuario().getId());

			listaInscripcionesDTO.add(dtoI);
		}
		return listaInscripcionesDTO;
	}

	@GetMapping(path = "/curso/{id}")
	public List<DTO> getInscripcionCurso(@PathVariable long id) {
		List<DTO> listaInscripcionesDTO = new ArrayList<>();
		List<Inscripcion> inscripciones = insRep.findByCursoId(id);
		for (Inscripcion u : inscripciones) {
			DTO dtoI = new DTO();
			dtoI.put("id", u.getId());
			dtoI.put("fecha_inscripcion", u.getFechaInscripcion().toString());
			dtoI.put("id_curso", u.getCurso().getId());
			dtoI.put("id_usuario", u.getUsuario().getId());

			listaInscripcionesDTO.add(dtoI);
		}
		return listaInscripcionesDTO;
	}

	@PostMapping(path = "/crear")
	public void aniadirInscripcion(@RequestBody DatosAltaInscripcion i, HttpServletRequest request) {
		DTO dtoUsuaria = new DTO();
		Usuario u = usuRep.findById(i.id_usuario);
		Curso c = curRep.findById(i.id_curso);
		if (u != null && c != null) {
			insRep.save(new Inscripcion(i.fecha_inscripcion, c, u));
			dtoUsuaria.put("result", "succes");
		} else {
			dtoUsuaria.put("result", "No existe ese Usuario o Curso");
		}
		insRep.save(new Inscripcion(i.fecha_inscripcion, c, u));
	}

	@PutMapping("/actualizar/{id}")
	public DTO actualizarInscripcion(@PathVariable int id, @RequestBody DatosAltaInscripcion i) {
		DTO dtoUsuaria = new DTO();
		Inscripcion ins = insRep.findById(id);
		Usuario u = usuRep.findById(i.id_usuario);
		Curso c = curRep.findById(i.id_curso);
		if (u != null && c != null) {
			ins.setCurso(c);
			ins.setUsuario(u);
			ins.setFechaInscripcion(i.fecha_inscripcion);
			insRep.save(ins);
			dtoUsuaria.put("result", "succes");
		} else {
			dtoUsuaria.put("result", "No existe ese Usuario o Curso");
		}
		return dtoUsuaria;
	}

	@DeleteMapping("/eliminar/{id}")
	public DTO eliminarUsuario(@PathVariable int id) {
		DTO dtoIns = new DTO();
		Inscripcion ins = insRep.findById(id);
		if (ins != null) {
			insRep.delete(ins);
			dtoIns.put("result", true);
		} else {
			dtoIns.put("result", false);
		}
		return dtoIns;
	}

	public static class DatosAltaInscripcion {
		int id_usuario;
		int id_curso;
		Date fecha_inscripcion;

		public DatosAltaInscripcion(int id_usuario, int id_curso, Date fecha_inscripcion) {
			super();
			this.id_usuario = id_usuario;
			this.id_curso = id_curso;
			this.fecha_inscripcion = fecha_inscripcion;
		}
	}

}
