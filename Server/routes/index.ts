import { Router } from 'express';
import Task from '../models/Task';
import bcrypt from 'bcrypt';
import User from '../models/User';



const router = Router();

router.get("/tasks", async (req,res)=>{
    const tasks = await Task.find();
    console.log(tasks);
    res.send(tasks);
});

router.post("/tasks", async (req, res) => {
    const {
      title,
      Nombre,
      description,
      email,
      telefono,
      direccion,
      NombreEmpresa,
      Nit,
      FechaIngreso,
      HoraIngreso,
      FechaEgreso,
      HoraEgreso,
      DetalleVisita,
      FechaPlanificacion,
      HoraPlanificacion,
      EstadoPlanificacion,
      TecnicoAsignado,
      SupervisorAsignado,
      ubicacion,
      EstadoVisita,
      EstadoCliente,
      NumeroIncidente,
      latitud,
      longitud,
    } = req.body;

    const task = new Task({
      title,
      Nombre,
      description,
      email,
      telefono,
      direccion,
      NombreEmpresa,
      Nit,
      FechaIngreso,
      HoraIngreso,
      FechaEgreso,
      HoraEgreso,
      DetalleVisita,
      FechaPlanificacion,
      HoraPlanificacion,
      EstadoPlanificacion,
      TecnicoAsignado,
      SupervisorAsignado,
      ubicacion,
      EstadoVisita,
      EstadoCliente,
      NumeroIncidente,
      latitud,
      longitud,
    });
  
    try {
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el Cliente" });
    }
  });

router.get("/tasks/:id", async (req,res)=>{
    try {
const task = await Task.findById(req.params.id);
   if(!task) return res.status(404).json({ message: "Client not found"});
    res.send(task);
} catch(error){
           return res.status(500).send(error);


            }
});

router.delete("/tasks/:id",async (req,res)=>{
    try {
        const task = await  Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(400).json({ message: "Client not found"});
        res.json(task);
    
    } catch (error) {
        return res.status(500).send(error);
    }

});

router.put("/tasks/:id", async (req,res)=>{
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body,{
   new: true,
});
res.json(updatedTask)
});

const nodemailer = require('nodemailer');

const enviarMail = async (correoContenido: string) => {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: 'sazovasquezedyalexander@gmail.com',
      pass: 'lmvsfvljtrskwsiz'
    }
  }

  const mensaje = {
    from: 'sazovasquezedyalexander@gmail.com',
    to: 'sazovasquezedyalexander@gmail.com',
    subject: 'Detalle Visita a Cliente',
    text: correoContenido, // Utiliza el contenido dinámico que pasaste como parámetro
  }

  const transport = nodemailer.createTransport(config);

  // No es necesario el bloque try/catch aquí si no manejas errores específicos
  const info = await transport.sendMail(mensaje);
  console.log(info);
}

router.post('/enviar-correo', async (req, res) => {
  try {
    const { contenido } = req.body; // Obtiene el contenido desde Vue.js
    await enviarMail(contenido); // Pasa el contenido a la función enviarMail
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
});


router.post('/register', async (req, res) => {
  try {
    const { username, password,rol } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      password: hashedPassword,
      rol,
      //email,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});


let isAuthenticated = false;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password || '', user.password || '');

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    isAuthenticated = true;

    // Inicio de sesión exitoso
    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }

  
});


router.post('/logout', (req, res) => {
  try {
    // Aquí puedes realizar cualquier tarea de limpieza necesaria para cerrar sesión.
    isAuthenticated = false;

    // Redirige al usuario a la página de inicio de sesión o a donde desees después del cierre de sesión.
    //res.redirect('/login'); // Cambia '/login' por la URL a la que quieras redirigir.
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
});
 

router.get("/users", async (req,res)=>{
  const users = await User.find();
  console.log(users);
  res.send(users);
});



router.get("/users/:id", async (req,res)=>{
  try {
const user = await User.findById(req.params.id);
 if(!user) return res.status(404).json({ message: "User not found"});
  res.send(user);
} catch(error){
         return res.status(500).send(error);


          }
});

router.delete("/users/:id",async (req,res)=>{
  try {
      const user = await  User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(400).json({ message: "Client not found"});
      res.json(user);
  
  } catch (error) {
      return res.status(500).send(error);
  }

});

router.put("/users/:id", async (req,res)=>{
  const updatedUser = await Task.findByIdAndUpdate(req.params.id, req.body,{
 new: true,
});
res.json(updatedUser)
});

export default router