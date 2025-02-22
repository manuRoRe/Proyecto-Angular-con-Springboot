package com.example.demo.controladores;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelos.Centro;
import com.example.demo.repositorios.centroRepositorio;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.xml.bind.DatatypeConverter;

@RestController
@RequestMapping("/centro")
public class centroController {

	@Autowired
	centroRepositorio cenRep;

	@GetMapping("/obtener")
	public List<DTO> getCentros() {
		List<DTO> listaCentrosDTO = new ArrayList<>();
		List<Centro> centros = cenRep.findAll();
		for (Centro u : centros) {
			DTO dtoI = new DTO();
			dtoI.put("id", u.getId());
			dtoI.put("direccion", u.getDireccion());
			dtoI.put("nombre", u.getNombre());
			dtoI.put("sitio_web", u.getSitioWeb());
			if (u.getImagen() != null) {
				String base64Image = Base64.getEncoder().encodeToString(u.getImagen());
				dtoI.put("imagen", base64Image);
			} else {
				dtoI.put("imagen", null); // Si no hay imagen
			}

			listaCentrosDTO.add(dtoI);
		}
		return listaCentrosDTO;
	}

	@GetMapping("/obtener/{id}")
	public DTO getCentro(@PathVariable int id) {
		Centro centro = cenRep.findById(id);
		DTO dtoI = new DTO();
		if (centro != null) {
			dtoI.put("id", centro.getId());
			dtoI.put("direccion", centro.getDireccion());
			dtoI.put("nombre", centro.getNombre());
			dtoI.put("sitio_web", centro.getSitioWeb());
			if (centro.getImagen() != null) {
				String base64Image = Base64.getEncoder().encodeToString(centro.getImagen());
				dtoI.put("imagen", base64Image);
			} else {
				dtoI.put("imagen", null); // Si no hay imagen
			}

		} else {
			dtoI.put("result", false);
		}
		return dtoI;
	}

	@PostMapping(path = "/crear")
	public void aniadirUsuario(@RequestBody DatosAltaCentro d, HttpServletRequest request) {
		cenRep.save(new Centro(d.direccion, DatatypeConverter.parseBase64Binary(d.imagen), d.nombre, d.sitio_web));
	}

	@PutMapping("/actualizar/{id}")
	public DTO actualizarUsuario(@PathVariable int id, @RequestBody DatosAltaCentro d) {
		DTO dtoI = new DTO();
		Centro c = cenRep.findById(id);
		if (c != null) {
			c.setNombre(d.nombre);
			c.setDireccion(d.direccion);
			c.setImagen(DatatypeConverter.parseBase64Binary(d.imagen));
			c.setSitioWeb(d.sitio_web);
			cenRep.save(c);
			dtoI.put("result", true);
		} else {
			dtoI.put("result", false);
		}
		return dtoI;
	}

	// Eliminar usuario
	@DeleteMapping("/eliminar/{id}")
	public DTO eliminarUsuario(@PathVariable int id) {
		DTO dtoI = new DTO();
		Centro c = cenRep.findById(id);
		if (c != null) {
			cenRep.delete(c);
			dtoI.put("result", true);
		} else {
			dtoI.put("result", false);
		}
		return dtoI;

	}

	public static class DatosAltaCentro {
		String nombre;
		String sitio_web;
		String imagen;
		String direccion;

		public DatosAltaCentro(String nombre, String sitio_web, String imagen, String direccion) {
			super();
			this.nombre = nombre;
			this.sitio_web = sitio_web;
			this.imagen = imagen;
			this.direccion = direccion;
		}
	}
}
