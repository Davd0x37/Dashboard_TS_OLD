using System;
using System.Threading.Tasks;
using Api.NCore.Controllers;
using Newtonsoft.Json;

namespace Api.NCore.Model.User
{
    public class UserManager
    {
        public static async Task<bool> AddUser(User user)
        {
            if (!await UserExists(user.Login, user.Email)) return false;
            var res = await Db.Insert(user).RunAsync(Db.Con);
            return res.inserted == 1;
        }

        public static async Task<bool> UpdateCredentials(string id, object config)
        {
            var res = await Db.Update(id, config).RunAsync(Db.Con);
            return res.replaced == 1;
        }

        public static async Task<UserData> GetUser(string id)
        {
            try
            {
                var req = await Db.Get(id).RunAsync(Db.Con);
                UserData res = JsonConvert.DeserializeObject<UserData>(req.ToString());
                return res;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public static async Task<bool> UpdateDigitalOceanToken(string id, string token)
        {
            var config = new {AuthTokens = new {DigitalOcean = new {AccessToken = token}}};

            var req = await UpdateCredentials(id, config);
            return req;
        }

        private static async Task<bool> UserExists(string login, string email)
        {
            var usr = new {Login = login, Email = email};
            var res = await Db.Filter(usr).Count().RunAsync(Db.Con);
            return res < 1;
        }
    }
}