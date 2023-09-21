
import app from './app';
import { StartConnection } from './database';


StartConnection();
app.listen(3000);
console.log('server is running on port 3000');