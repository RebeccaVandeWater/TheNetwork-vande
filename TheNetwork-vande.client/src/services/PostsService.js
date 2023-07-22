import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getPosts() {
    const res = await api.get('/api/posts')

    logger.log('Got Posts?', res.data)
    AppState.posts = res.data.posts.map(pojo => new Post(pojo))

    AppState.newerPage = res.data.newer

    AppState.olderPage = res.data.older
  }

  async getPostsByQuery(query) {
    const res = await api.get(`api/posts?query=${query}`)

    logger.log("Got posts by query?", res.data)
    AppState.posts = res.data.posts.map(pojo => new Post(pojo))

    AppState.newerPage = res.data.newer

    AppState.olderPage = res.data.older
  }

  async getPostsByProfile(profileId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId: profileId
      }
    })

    logger.log("Got Posts By Profile?", res.data)

    AppState.posts = res.data.posts.map(pojo => new Post(pojo))

    AppState.newerPage = res.data.newer

    AppState.olderPage = res.data.older
  }

  async createPost(postData) {
    const res = await api.post('/api/posts', postData)

    logger.log("Posted?", res.data)

    const newPost = new Post(res.data)

    AppState.posts.unshift(newPost)
  }

  async removePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)

    logger.log("Deleted post?", res.data)
    const postIndex = AppState.posts.findIndex(p => p.id == postId)

    AppState.posts.splice(postIndex, 1)
  }

  async likePost(postId) {
    const res = await api.post(`/api/posts/${postId}/like`)

    logger.log("Liked Post?", res.data)

    const postIndex = AppState.posts.findIndex(p => p.id == postId)

    const updatedPost = new Post(res.data)

    AppState.posts.splice(postIndex, 1, updatedPost)
  }

  async changePage(url) {
    const res = await api.get(url)

    logger.log('Got Posts?', res.data)
    AppState.posts = res.data.posts.map(pojo => new Post(pojo))

    AppState.newerPage = res.data.newer

    AppState.olderPage = res.data.older
  }


}

export const postsService = new PostsService()