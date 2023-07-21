export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.likes = data.likes
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
  }
}