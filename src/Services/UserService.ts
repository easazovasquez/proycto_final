import axios from './axios';
import {AxiosResponse} from 'axios';
import { User } from '@/interfaces/User'; 

export const getUsers = async (): Promise<AxiosResponse<User[]>>  => 
await axios.get("/users");

export const getUser = async (id: string ): Promise<AxiosResponse<User>>  => 
await axios.get("/users/"+ id);

export const updateUser = async (id: string, user: User ) =>
await axios.put("/users/"+ id,user);

export const deleteUser = async (id: string ): Promise<AxiosResponse<User>>  => 
await axios.delete("/users/"+ id);

export const createUser = async (user: User) => 
await axios.post("/register",user);


export const loginUser = async (user: User) => 
await axios.post("/login",user);

export const logoutUser = async (user: User) => 
await axios.post("/logout",user);









 