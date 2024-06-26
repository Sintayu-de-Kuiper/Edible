# Software Design Document

## Firestore Schema

```json
{
  "users": {
    "{userId}": {
      "displayName": "string",
      "imageUrl": "string",
      "email": "string",
      "createdAt": "timestamp",
      "followers": {
        "{followerId}": {
          "followedAt": "timestamp"
        }
      },
      "following": {
        "{followedUserId}": {
          "followedAt": "timestamp"
        }
      },
      "posts": {
        "{postId}": {
          "title": "string",
          "description": "string",
          "imageUrl": "string",
          "userId": "string",
          "createdAt": "timestamp",
          "likes": {
            "{userId}": {
              "userId": "string",
              "likedAt": "timestamp"
            }
          },
          "comments": {
            "{commentId}": {
              "userId": "string",
              "content": "string",
              "createdAt": "timestamp"
            }
          }
        }
      }
    }
  }
}

```

## Pages

### Home

Scroll through recommended posts and view profile from creators.

When logged in: see posts from followed profiles, like, comment on posts.

### Search

Search for posts and profiles.

### Own Profile

Must be logged in.

View display name, posts, followers, following.

Create and delete a post.

### Other Profile

View display name, posts, followers, following.

When logged in: Follow and unfollow.
