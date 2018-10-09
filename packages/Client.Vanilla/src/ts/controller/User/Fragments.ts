export const Services = `
fragment Services on User {
  Spotify {
    email
    username
    type
  }
  DigitalOcean {
    email
    total
    dropletLimit
    lastCreatedDroplet
  }
  Paypal {
    username
    email
    phone
    verified
    country
    zoneinfo
  }
}
`