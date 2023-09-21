import { connect } from 'mongoose';

export const StartConnection = async () => {
    try {

        const db = await connect('mongodb://127.0.0.1/ProyectoDB');
        console.log(db.connection.name);
    }catch(error){
     console.error(error);

    }
};