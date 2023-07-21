export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
    this.bio = data.bio
    this.linkedin = data.linkedin
    this.github = data.github
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
    this.coverImg = data.coverImg
  }
}
