using System.Threading.Tasks;
using Api.NET.Controller;
using Newtonsoft.Json;
using static Api.NET.Controller.Db;

namespace Api.NET.Model.User
{
    public static class User
    {
        private static async Task<bool> UserExists(string login, string email)
        {
            var usr = new {Login = login, Email = email};
            var res = await Filter(usr).Count().RunAsync(Con);
            return res < 1;
        }

        public static async Task<bool> AddUser(UserData user)
        {
            if (!await UserExists(user.Login, user.Email)) return false;
            var res = await Insert(user.GetObject()).RunAsync(Con);
            return res.inserted == 1;
        }

        public static async Task<bool> UpdateCredentials(string id, object config)
        {
            var res = await Update(id, config).RunAsync(Con);
            return res.replaced == 1;
        }

        public static async Task<UserData> GetUser(string id)
        {
            var req = await Get(id).RunAsync(Con);
            UserData res = JsonConvert.DeserializeObject<UserData>(req.ToString());
            return res;
        }

        public static async Task<bool> UpdateDigitalOceanToken(string id, string token)
        {
            var config = new {AuthTokens = new {DigitalOcean = new {AccessToken = token}}};

            var req = await Update(id, config).RunAsync(Con);
            return req.inserted == 1 || req.replaced == 1;
        }
    }
}