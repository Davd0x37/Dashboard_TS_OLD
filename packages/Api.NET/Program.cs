using System;
using System.Threading.Tasks;

namespace Api.NET
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            var app = new App("Dashboard");
            await app.Run();
        }
    }
}