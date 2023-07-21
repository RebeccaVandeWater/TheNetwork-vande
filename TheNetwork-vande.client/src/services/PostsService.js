import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getPosts() {
    const res = await api.get('/api/posts')

    logger.log('Got Posts?', res.data)
    AppState.posts = res.data.posts.map(pojo => new Post(pojo))
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)

    logger.log("Posted?", res.data)

    const newPost = new Post(res.data)

    AppState.posts.unshift(newPost)
  }

  selectPost() {
    // AppState.selectedPost = 
  }

}

export const postsService = new PostsService