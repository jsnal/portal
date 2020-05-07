import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => console.log('REDIS: Connection Successful'));

// Be sure to select the first database
client.select(0, function(err, res) {
  if (err) return err;
});

/*
 * Return raw redis client
 */
export default {
  client: client,

  /*
   * Get all keys
   * @param {pattern} key pattern
   */
  keys(pattern) {
    return new Promise((resolve, reject) => {
      client.keys(pattern, (err, keys) => {
        resolve(keys ? keys : err);
      });
    })
  },

  /*
   * Get key
   * @param {key} key-value key
   */
  get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        resolve(reply ? reply : err);
      });
    })
  },

  /*
   * Get multiple hashes
   * @param {keys} hash keys
   * @param {callback} callback function
   */
  hgetall(keys, callback) {
    let uniqueKeys = [...new Set(keys)];
    let multiClient = client.multi();

    uniqueKeys.forEach(function(key){
      multiClient.hgetall(key);
    });

    multiClient.exec(function(err, res){
      callback(err, res);
    });
  }
}
