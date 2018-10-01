import rxdb from "rxdb";
// (async () => {
  const db = rxdb.create({
    name: 'heroesdb',           // <- name
    adapter: 'idb',          // <- storage-adapter
    password: 'myPassword',     // <- password (optional)
    multiInstance: true,         // <- multiInstance (optional, default: true)
    queryChangeDetection: false // <- queryChangeDetection (optional, default: false)
  });
  console.dir(db);
// })()