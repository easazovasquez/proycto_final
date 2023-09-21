import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  Nombre: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  NombreEmpresa: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  Nit: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  FechaIngreso: {
    type: Date, 
    required: false,
  },
  HoraIngreso: {
    type: String,
    trim: true, 
    required: false,
  },
  FechaEgreso: {
    type: Date, 
    required: false,
  },
  HoraEgreso: {
    type: String, 
    trim: true,
    required: false,
  },
  FechaPlanificacion: {
    type: Date, 
    required: false,
  },
  HoraPlanificacion: {
    type: String,
    trim: true, 
    required: false,
  },
  EstadoPlanificacion: {
    type: String,
    required: false,
    trim: true,
  },
  TecnicoAsignado: {
    type: String,
    required: false,
    trim: true,
  },
  SupervisorAsignado: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  DetalleVisita: {
    type: String,
    required: false,
    trim: true,
  },
  ubicacion: {
    type: String,
    required: false,
    trim: true,
  },
  latitud: {
    type: Number,
    required: false,
  },
  longitud: {
    type: Number,
    required: false,
  },
  NumeroIncidente: {
    type: Number,
    required: false,
  },
  EstadoVisita: {
    type: String,
    required: false, 
  },

  EstadoCliente: {
    type: String,
    required: false, 
  },

  done: {
    type: Boolean,
    default: false,
  },


}, {
  versionKey: false,
});

export default model('Task', taskSchema);
