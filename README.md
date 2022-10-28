# Reddit live

Listen for new posts on any subreddit

 - Typescript compatible

## Usage

```ts
import RedditLive from 'reddit-live';

const redditLive = new RedditLive(snoowrapOptions, ['therewasanatempt', 'funny', 'ATBGE'])

redditLive.stream.on('item', (post: Snoowrap.Submission) => {
    
    /*
        post : {
            title: String,
            author: { 
                name: String
            }
            preview: {
                images: [...]
            }
            subreddit_name_prefixed: String
            ...
        }
     */
    
})
```
