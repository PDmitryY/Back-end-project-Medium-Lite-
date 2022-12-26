import * as sqlite from 'sqlite3';
import crypto from 'crypto';
import util from 'util'

const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database(':memory:')

const promisifyRun = util.promisify(db.run.bind(db));

export async function initDb () {
  await promisifyRun(`CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  );`
  );
  
  const salt = 'ksgdkfb';
  const user1 = 'admin';
  const user1HashedPassword = crypto.pbkdf2Sync('123',  
    salt, 1000, 64, 'sha512').toString('hex');
  const user2 = 'user;'
  const user2HashedPassword = crypto.pbkdf2Sync('456',  
    salt, 1000, 64, 'sha512').toString('hex'); 

  await promisifyRun(`INSERT INTO users(email, password) VALUES(?, ?)`, [user1, user1HashedPassword]);
  await promisifyRun(`INSERT INTO users(email, password) VALUES(?, ?)`, [user2, user2HashedPassword]);
  
  await promisifyRun(`CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL
  );`
  )
}


export default db;