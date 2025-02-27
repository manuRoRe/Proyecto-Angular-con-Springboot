package com.example.demo.controladores;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.jwtSecurity.AutenticadorJWT;
import com.example.demo.modelos.Usuario;

import com.example.demo.repositorios.usuarioRepositorio;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.xml.bind.DatatypeConverter;

import org.springframework.web.bind.annotation.*;

// Habilita CORS para toda la clase desde el origen http://localhost:4200
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuario")
public class usuarioController {

    @Autowired
    usuarioRepositorio usuRep;

    @GetMapping("/obtener")
    public List<DTO> getUsuarios() {
        List<DTO> listaUsuariosDTO = new ArrayList<>();
        List<Usuario> usuarios = usuRep.findAll();
        for (Usuario u : usuarios) {
            DTO dtoUsuaria = new DTO();
            dtoUsuaria.put("id", u.getId());
            dtoUsuaria.put("nombre", u.getNombre());
            dtoUsuaria.put("apellidos", u.getApellidos());
            dtoUsuaria.put("email", u.getEmail());
            dtoUsuaria.put("password", u.getPassword());
            dtoUsuaria.put("pais", u.getPais());
            dtoUsuaria.put("sexo", u.getSexo());
            dtoUsuaria.put("admin", u.getAdmin());
            dtoUsuaria.put("aficiones", u.getAficiones());
            listaUsuariosDTO.add(dtoUsuaria);
        }
        return listaUsuariosDTO;
    }

    // Obtener usuario por ID
    @GetMapping("/obtener/{id}")
    public DTO getUsuarioById(@PathVariable int id) {
        Usuario u = usuRep.findById(id);
        DTO dtoUsuaria = new DTO();
        dtoUsuaria.put("id", u.getId());
        dtoUsuaria.put("nombre", u.getNombre());
        dtoUsuaria.put("apellidos", u.getApellidos());
        dtoUsuaria.put("email", u.getEmail());
        dtoUsuaria.put("password", u.getPassword());
        dtoUsuaria.put("pais", u.getPais());
        dtoUsuaria.put("sexo", u.getSexo());
        dtoUsuaria.put("Admin", u.getAdmin());
        dtoUsuaria.put("Aficiones", u.getAficiones());
        return dtoUsuaria;

    }

    // Crear usuario
    @PostMapping(path = "/crear")
    public void aniadirUsuario(@RequestBody DatosAltaUsuario u, HttpServletRequest request) {
        usuRep.save(new Usuario(u.admin, u.aficiones, u.apellidos, u.email, u.nombre, u.pais, u.password, u.sexo));
    }

    // Actualizar usuario
    @PutMapping("/actualizar/{id}")
    public void actualizarUsuario(@PathVariable int id, @RequestBody DatosAltaUsuario u) {
        Usuario usuario = usuRep.findById(id);
        usuario.setNombre(u.nombre);
        usuario.setApellidos(u.apellidos);
        usuario.setEmail(u.email);
        usuario.setPassword(u.password);
        usuario.setPais(u.pais);
        usuario.setSexo(u.sexo);
        usuario.setAdmin(u.admin);
        usuario.setAficiones(u.aficiones);
        usuRep.save(usuario);
    }

    // Eliminar usuario
    @DeleteMapping("/eliminar/{id}")
    public void eliminarUsuario(@PathVariable int id) {
        Usuario user = usuRep.findById(id);
        usuRep.delete(user);
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public DTO autenticaUsuario(@RequestBody DatosAutenticaUsuario datos, HttpServletRequest request,
            HttpServletResponse response) {
        DTO dto = new DTO();
        dto.put("result", "fail");
        Usuario uAutentificado = usuRep.findByEmailAndPassword(datos.email, datos.password);
        if (uAutentificado != null) {
            dto.clear();
            dto.put("result", "Succes");
            dto.put("jwt", AutenticadorJWT.codificaJWT(uAutentificado));
            Cookie cook = new Cookie("jwt", AutenticadorJWT.codificaJWT(uAutentificado));
            cook.setMaxAge(-1);
            response.addCookie(cook);
        }
        return dto;
    }

    @GetMapping(path = "/quieneres")
    public DTO quienSoy(HttpServletRequest request) {
        DTO dto = new DTO();
        dto.put("result", "fail");
        Cookie[] cs = request.getCookies();
        int idUserAutenticado = -1;
        for (Cookie cook : cs) {
            if (cook.getName().equals("jwt")) {
                idUserAutenticado = AutenticadorJWT.getIdUsuarioDesdeJWT(cook.getValue());
            }
        }
        Usuario u = usuRep.findById(idUserAutenticado);
        if (u != null) {
            dto.put("result", "succes");
            dto.put("id", u.getId());
            dto.put("nombre", u.getNombre());
            dto.put("username", u.getEmail());
            dto.put("pass", u.getPassword());
        }
        return dto;
    }

    public static class DatosAutenticaUsuario {
        String email;
        String password;

        public DatosAutenticaUsuario(String email, String password) {
            super();
            this.email = email;
            this.password = password;
        }
    }

    public static class DatosAltaUsuario {
        String email;
        String password;
        String nombre;
        String apellidos;
        String sexo;
        String pais;
        String aficiones;
        byte admin;

        public DatosAltaUsuario(String email, String password, String nombre, String apellidos, String sexo,
                String pais,
                String aficiones, byte admin) {
            super();

            this.email = email;
            this.password = password;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.sexo = sexo;
            this.pais = pais;
            this.aficiones = aficiones;
            this.admin = admin;
        }
    }
}
