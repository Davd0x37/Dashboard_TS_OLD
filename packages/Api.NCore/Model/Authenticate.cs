using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Api.NCore.Utils;
using Api.NCore.Model.User;

namespace Api.NCore.Model
{
    public static class Authenticate
    {
        private static readonly HttpClient Client = new HttpClient();

        /**
         * Create state key, store in user database and return generated url for redirection
         */
        public static async Task<string> AuthenticateAccount(string id, string service, AuthOptions options)
        {
            var stateKey = Generate.GenerateRandomString(64);
            await UpdateTokens(id, service, new {StateKey = stateKey});
            var url = GenerateUrl(options, stateKey);
            return url;
        }

        /**
         * Method fired after redirect from service
         */
        public static async Task<bool> GetAccessToken(string id, string service, GetAccessTokenParams param)
        {
            var stateKey = await GetStateKey(id, service);
            if (param.State != stateKey || param.State == null) return false;

            // Update user tokens - Code and reset StateKey to ""
//            await UpdateTokens(id, service, new {param.Code, StateKey = ""});
            // Create form for post request
            var form = Generate.GenerateAuthForm(param);
            var req = await Client.SendAsync(form);

            Console.WriteLine("CONTENT = {0}", await req.Content.ReadAsStringAsync());
            return true;
        }

        public static string GenerateBasicAuthorization(string clientId, string clientSecret)
        {
            var encode =
                Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}:{1}", clientId, clientSecret)));
            return $"Basic {encode}";
        }

        /**
         * Update tokens
         */
        private static async Task UpdateTokens(string id, string serviceName, object tokens)
        {
            var service = new Dictionary<string, object> {[serviceName] = tokens};
            await UserManager.UpdateCredentials(id, new
            {
                AuthTokens = service
            });
        }

        /**
         * Return user state key
         */
        private static async Task<string> GetStateKey(string id, string serviceName)
        {
            var key = await UserManager.GetUser(id);
            return key.AuthTokens[serviceName].StateKey;
        }

        /**
         * Generate url for redirect
         */
        private static string GenerateUrl(AuthOptions options, string stateKey)
        {
            return
                $"{options.Url}?client_id={options.ClientId}&response_type=code&scope={Uri.EscapeUriString(options.Scopes)}&redirect_uri={Uri.EscapeUriString(options.Redirect)}{(options.State ? "&state=" + stateKey : "")}{(options.Nonce ? "&nonce=" + stateKey : "")}";
        }
    }
}