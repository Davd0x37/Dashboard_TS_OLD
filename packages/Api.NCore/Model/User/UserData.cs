namespace Api.NCore.Model.User
{
    public struct Spotify
    {
        public string Username;
        public string Email;
        public string Type;
    }

    public struct DigitalOcean
    {
        public string Email;
        public int LastCreatedDroplet;
        public int DropletLimit;
        public int Total;
    }

    public struct Paypal
    {
        public string Username;
        public string Email;
        public string Phone;
        public string Country;
        public string Verified;
        public string Zoneinfo;
    }

    public class User
    {
        public string Avatar;
        public string Email;
        public string Login;
        public string Password;
    }

    public class UserData : User
    {
        public string id;
        public Spotify Spotify;
        public DigitalOcean DigitalOcean;
        public Paypal Paypal;
        public dynamic AuthTokens;
    }
}