import rethink from 'rethinkdb'

class Database {
  private db: any

  public connect() {
    this.db = rethink.connect({
      host: "localhost",
      port: 28015,
      db: "dashboard",
    })
  }

  
}
export default Database