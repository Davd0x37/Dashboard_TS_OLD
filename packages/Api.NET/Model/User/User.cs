using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using static Api.NET.Controller.DB;

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
            try
            {
                if (!await UserExists(user.Login, user.Email)) return false;
                await Insert(user.GetObject()).RunAsync(Con);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public static async Task<bool> UpdateCredentials(string id, object config) =>
            (await Update(id, config).RunAsync(Con)).replaced == 1;

        public static async Task<UserData> GetUser(string id)
        {
            var req = await Get(id).RunAsync(Con);
            UserData res = JsonConvert.DeserializeObject<UserData>(req.ToString());
            return res;
        }
    }
}