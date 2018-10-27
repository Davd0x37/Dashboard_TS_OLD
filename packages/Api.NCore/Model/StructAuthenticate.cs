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
}