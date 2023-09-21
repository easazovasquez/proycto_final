export interface Task {
  title: string;
  Nombre: string;
  description: string;
  email: string;
  telefono: string; 
  direccion: string;
  NombreEmpresa: string;
  Nit: string;
  FechaIngreso: Date; 
  HoraIngreso: string; 
  FechaEgreso: Date; 
  HoraEgreso: string;
  DetalleVisita :string; 
  FechaPlanificacion: Date; 
  HoraPlanificacion: string;  
  EstadoPlanificacion: string;
  TecnicoAsignado :string;
  SupervisorAsignado :string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  NumeroIncidente: number; 
  EstadoVisita: string;
  EstadoCliente: string;
  done: boolean;
  _id: string;
  
} 
