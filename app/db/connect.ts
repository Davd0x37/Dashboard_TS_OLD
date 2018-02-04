import rethink from "rethinkdb"

const prom = rethink
  .connect({
    host: "localhost",
    port: 28015,
    db: "dashboard",
  })
  .then(con => {
    rethink
      .table("user")
      .run(con)
      .then(d => console.log("maasdl"))
  })

export default () => {}
