using RethinkDb.Driver;
using RethinkDb.Driver.Ast;
using RethinkDb.Driver.Net;

namespace Api.NCore.Model
{
    public class Db
    {
        private static readonly RethinkDB R = RethinkDB.R;
        public static IConnection Con;
        private static readonly Table General = R.Table("general");

        public Db()
        {
            Con = R.Connection()
                .Hostname("127.0.0.1")
                .Db("users")
                .Port(RethinkDBConstants.DefaultPort)
                .Connect();
        }

        public static Get Get(string id) => General.Get(id);
        public static Update Update(string id, object obj) => Get(id).Update(obj);
        public static Insert Insert(object obj) => General.Insert(obj);
        public static Filter Filter(object obj) => General.Filter(obj);
    }
}