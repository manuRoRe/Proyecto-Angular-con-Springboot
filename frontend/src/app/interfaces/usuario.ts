export interface Usuario {
  id: number;
  email: String;
  nombre?: String | null;
  apellidos?: String | null;
  sexo?: string | null;
  password: string;
  aficiones?: string | null;
  pais?: string | null;
  admin?: number | null;
}
