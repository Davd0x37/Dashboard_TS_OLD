using System;
using System.Collections.Generic;
using System.Net.Http;
using Api.NCore.Controllers;
using Api.NCore.Model;

namespace Api.NCore.Utils
{
    public static class Generate
    {
        public static string GenerateRandomString(int length, bool onlyNumbers = false)
        {
            var text = "";
            const string possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const string numbers = "0123456789";
            var rnd = new Random();
            if (onlyNumbers)
            {
                for (var i = 0; i < length; i++)
                {
                    text += numbers[rnd.Next(numbers.Length)].ToString();
                }
            }
            else
            {
                for (var i = 0; i < length; i++)
                {
                    text += possible[rnd.Next(possible.Length)].ToString();
                }
            }

            return text;
        }

        public static HttpRequestMessage GenerateAuthForm(GetAccessTokenParams param)
        {
            var dict = new Dictionary<string, string>
            {
                {"form", param.GetFormString()},
                {"headers", param.GetAuthorizationString()},
                {"json", "true"}
            };
            var req = new HttpRequestMessage(HttpMethod.Post, param.Url)
            {
                Content = new FormUrlEncodedContent(dict)
            };
            return req;
        }
    }
}