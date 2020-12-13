import app from './app';
import database from './database';

database.sync({force: false});
console.log('database running at 3306')

app.listen(3001);
console.log('server running at 3000');













