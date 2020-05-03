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
export { client }

/*
 * Get multiple hashes
 * @param {keys} hash keys
 * @param {callback} callback function
*/
export const m_hgetall = (keys, callback) => {
  let uniqueKeys = [...new Set(keys)];
  let multiClient = client.multi();

  uniqueKeys.forEach(function(key){
    multiClient.hgetall(key);
  });

  multiClient.exec(function(err, res){
    callback(err, res);
  });
}
