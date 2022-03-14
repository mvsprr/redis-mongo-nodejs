# redis-mongo-nodejs
Redis as MongoDB cache

Let’s build a simple web service application that exposes an API to read data from the MongoDB database.

Note: nodeJS and npm, redis and mongodb and dev tools are pre-requisites.

Let’s start a fresh project.

mkdir Cache
Then run this command to create a Node project.

npm init --y
Let’s download the dependencies.

npm i --S redis express mongodb
Let's test the code.

node index.js
In a live environment, we can observe big difference in response time when data is fetched from Redis.
