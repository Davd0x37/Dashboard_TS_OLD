using System;
using System.Threading.Tasks;
using Api.NCore.Controllers;
using Api.NCore.Model;

namespace Api.NCore
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
            return true;
        }
    }
}