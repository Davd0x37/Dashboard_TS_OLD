namespace Api.NET.Model.User
{
    public struct Spotify
    {
        public string Username;
        public string Email;
        public string Type;

        public object GetObject() => new {Username, Email, Type};
    }

    public struct DigitalOcean
    {
        public string Email;
        public int LastCreatedDroplet;
        public int DropletLimit;
        public int Total;

        public object GetObject() => new {Email, LastCreatedDroplet, DropletLimit, Total};
    }

    public struct Paypal
    {
        public string Username;
        public string Email;
        public string Phone;
        public string Country;
        public string Verified;
        public string Zoneinfo;

        public object GetObject() => new {Username, Email, Phone, Country, Verified, Zoneinfo};
    }

    public class UserData
    {
        public string Id;
        public string Avatar;
        public string Email;
        public string Login;
        public string Password;
        public Spotify Spotify;
        public DigitalOcean DigitalOcean;
        public Paypal Paypal;

        public object GetObject()
        {
            return new
            {
                Id,
                Avatar,
                Email,
                Login,
                Password,
                Spotify = Spotify.GetObject(),
                DigitalOcean = DigitalOcean.GetObject(),
                Paypal = Paypal.GetObject()
            };
        }
    }
}