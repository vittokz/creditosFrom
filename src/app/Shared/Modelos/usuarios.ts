export class Usuario {
  idUsuario?: string;
  tipo: string;
  identidad: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  email: string;
  celular: string;
  genero: string;
  pais: string;
  departamento: string;
  municipio: string;
  tipoUsuario: string;
  estado: string;
  usuarioRegistra?: string;
  fechaRegistro?: string;
}

export class Login {
  identidad: string;
  password: string;
}
