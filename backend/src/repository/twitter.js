import { constants } from "../shared/constant.js";
import { TwitterApi } from 'twitter-api-v2';

export default class TwitterClient {
  static sinceId = null;
  static client = new TwitterApi({
    appKey: constants.TWITTER_CONSUMER_KEY,
    appSecret: constants.TWITTER_CONSUMER_SECRET,
    accessToken: constants.TWITTER_ACCESS_TOKEN,
    accessSecret: constants.TWITTER_ACCESS_SECRET,
  });

  async findUserByUsername(username) {
    const userSearch = await TwitterClient.client.v2.userByUsername(username);
    return userSearch.data;
  }

  async reply(content, tweetId) {
    const reply = await TwitterClient.client.v2.tweet({
      text: content,
      reply: {
        in_reply_to_tweet_id: tweetId
      }
    });
    return reply.data;
  }

  async userMentionTimeline(maxResults = 5) {
    const user = await TwitterClient.client.v2.me();
    const opts = {
      'user.fields': ['username', 'name', 'profile_image_url'],
      'tweet.fields': ['author_id', 'created_at'],
      max_results: maxResults,
    };
    if (TwitterClient.sinceId) {
      Object.assign(opts, { since_id: TwitterClient.sinceId });
    }
    const mentions = await TwitterClient.client.v2.userMentionTimeline(user.data.id, opts);
    if ((mentions.meta?.result_count ?? 0) === 0) return null;
    TwitterClient.sinceId = mentions.meta?.newest_id ?? null;
    return mentions.data ?? null;
  }
}
