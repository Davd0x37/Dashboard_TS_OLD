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
        private const string ServiceName = "Spotify";
        private const string ClientId = "";
        private const string ClientSecret = "";
        private const string RedirectUri = "https://localhost:5001/spotify/result";
        private const string TokenUri = "https://accounts.spotify.com/api/token";
        private const string AuthorizeUri = "https://accounts.spotify.com/authorize";
        private const string Scopes = "user-read-private+user-read-email";

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            var req = await Authenticate.AuthenticateAccount("12345", ServiceName,
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
            var req = await Authenticate.GetAccessToken("12345", ServiceName,
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