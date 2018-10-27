using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.NCore.Model.User;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Api.NCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public async Task<string> Get()
        {
//            var req = await UserManager.AddUser(new Spotify
//            {
//                Email = "OMGOMGOMGOM",
//                Username = "ASDASDASDASDA",
//                Type = "ASDASDASDALSDLASDKALSKDALKSDAD"
//            });
            var res = UserManager.GetUser("12345");
            
            var req = "LOELELdasdasdd";
            return req;
        }

//        // GET api/values/5
//        [HttpGet("{id}")]
//        public ActionResult<string> Get(int id)
//        {
//            return "value";
//        }
//
//        // POST api/values
//        [HttpPost]
//        public void Post([FromBody] string value)
//        {
//        }
//
//        // PUT api/values/5
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] string value)
//        {
//        }
//
//        // DELETE api/values/5
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//        }
    }
}