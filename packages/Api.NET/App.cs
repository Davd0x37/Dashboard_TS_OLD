using System;
using System.Threading.Tasks;
using Api.NET.Controller;
using Api.NET.Model.User;

namespace Api.NET
{
    public class App
    {
        private readonly string _appName;

        public App(string appName)
        {
            var db = new Db();
            _appName = appName;
            WelcomeMessage();
        }

        private void WelcomeMessage()
        {
            Console.WriteLine($@"Hello in {_appName}");
        }

        public async Task<bool> Run()
        {
            var res = await User.UpdateDigitalOceanToken("a46a0cca-e3db-42f4-9360-27e958f1d8d5", "OMG");
            Console.Write(res);
            return true;
        }
    }
}