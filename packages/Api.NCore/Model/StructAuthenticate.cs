namespace Api.NCore.Model
{
    public struct AuthOptions
    {
        public string Url;
        public string ClientId;
        public string Scopes;
        public string Redirect;
        public bool State;
        public bool Nonce;
    }

    public struct GetAccessTokenParams
    {
        public string Code;
        public string State;
        public string Authorization;
        public string Url;
        public string RedirectUri;
        public string GrantType;

        public string GetFormString() =>
            new {code = Code, redirect_uri = RedirectUri, grant_type = GrantType}.ToString();

        public string GetAuthorizationString() => new {Authorization}.ToString();
    }

    public struct AuthForm
    {
        public struct Form
        {
            public string code;
            public string grant_type;
            public string refresh_token;
            public string redirect_uri;
        }

        public struct Headers
        {
            public string Authorization;
        }

        public string url;
        public Form form;
        public Headers headers;
        public bool json;
    }
}