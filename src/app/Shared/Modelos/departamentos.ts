export interface IDepartamento {
  id?: string;
  nombre: string;
}

export interface IMunicipio {
  id?: string;
  nombre: string;
  idDepar?: string;
}
