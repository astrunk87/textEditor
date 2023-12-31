import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// *done*: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  try{
    if (content === null) {
      console.log('no data to save');
    } else {
  console.log('post to the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ Value: content});

  const result = await request;
  console.log('data saved to the database', result);
    }
  }catch (err) {
    console.log(err)
  }
};

// refrenced mini project and class work 

// *done*: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
  console.log('Getting from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;

  if (result.length === 0){
    console.log('no data');
  }else{
  console.log('Data', result);
  return result
  }
  return result;
}catch (err) {
  console.log(err)
  }
};

initdb();
