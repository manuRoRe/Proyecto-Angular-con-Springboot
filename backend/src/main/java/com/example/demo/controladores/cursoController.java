package com.example.demo.controladores;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.demo.modelos.Usuario;
import com.example.demo.repositorios.cursoRepositorio;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/curso")
public class cursoController {
	@Autowired
    cursoRepositorio curRep;
	
	@GetMapping("/obtener")
    public List<DTO> getCursos() {
        List<DTO> listaCursosDTO = new ArrayList<>();
        List<Curso> cursos = curRep.findAll();
        for (Curso u : cursos) {
            DTO dtoCurso = new DTO();
            dtoCurso.put("id", u.getId());
            dtoCurso.put("nombre", u.getNombre());
            dtoCurso.put("descripcion", u.getDescripcion());
            listaCursosDTO.add(dtoCurso);
        }
        return listaCursosDTO;
    }
	
	@GetMapping("/obtener/{id}")
    public DTO getCursoById(@PathVariable int id) {
        Curso u= curRep.findById(id);
        DTO dtoCurso = new DTO();
        dtoCurso.put("id", u.getId());
        dtoCurso.put("nombre", u.getNombre());
        dtoCurso.put("descripcion", u.getDescripcion());
        return dtoCurso;        
    }
	
	@PostMapping(path = "/crear")
    public void aniadirUsuario(@RequestBody DatosAltaCurso d, HttpServletRequest request) {
        curRep.save(new Curso(d.nombre,d.descripcion));
    }
	
	@PutMapping("/actualizar/{id}")
    public void actualizarUsuario(@PathVariable int id, @RequestBody DatosAltaCurso d) {
        Curso c= curRep.findById(id);
        c.setNombre(d.nombre);
        c.setDescripcion(d.descripcion);
        curRep.save(c);
    }

    // Eliminar usuario
    @DeleteMapping("/eliminar/{id}")
    public void eliminarUsuario(@PathVariable int id) {
         Curso c=curRep.findById(id);
         curRep.delete(c);
    }
	
	public static class DatosAltaCurso {
        String nombre;
		String descripcion;
		public DatosAltaCurso(String nombre, String descripcion) {
			super();
			this.nombre = nombre;
			this.descripcion = descripcion;
		}
    }
	
}
