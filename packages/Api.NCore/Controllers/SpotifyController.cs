using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.NCore.Model;
using Api.NCore.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Api.NCore.Controllers
{
    [Route("/[controller]")]
    public class SpotifyController : ControllerBase
    {
        private const string ClientId = "5022d32a21ad45a3bfce0835142a3d2c";
        private const string ClientSecret = "1c385db25c474181841aabcc6385e457";
        private const string ServiceName = "Spotify";
        private const string RedirectUri = "https://localhost:5001/spotify/result";
        private const string TokenUri = "https://accounts.spotify.com/api/token";
        private const string AuthorizeUri = "https://accounts.spotify.com/authorize";
        private const string Scopes = "user-read-private+user-read-email";

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            var req = await Authenticate.AuthenticateAccount("7040cd50-be9b-44a3-b97d-4feedc8a504a", ServiceName,
                new AuthOptions
                {
                    State = true,
                    Redirect = RedirectUri,
                    Scopes = Scopes,
                    Url = AuthorizeUri,
                    ClientId = ClientId
                });
            return new RedirectResult(req);
        }

        [HttpGet("result")]
        public async Task Result([FromQuery(Name = "code")] string code, [FromQuery(Name = "state")] string state)
        {
            var req = await Authenticate.GetAccessToken("7040cd50-be9b-44a3-b97d-4feedc8a504a", ServiceName,
                new GetAccessTokenParams
                {
                    Code = code,
                    State = state,
                    Url = TokenUri,
                    RedirectUri = RedirectUri,
                    Authorization = Authenticate.GenerateBasicAuthorization(ClientId, ClientSecret)
                });
        }
    }
}