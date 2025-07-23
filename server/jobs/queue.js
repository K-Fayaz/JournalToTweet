const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null
}); 

const tweetQueue = new Queue('tweet-suggestions', { connection });

// QueueScheduler is no longer needed in BullMQ v3+
// Delayed jobs are handled automatically by the Queue itself

module.exports = { tweetQueue, Worker, connection };