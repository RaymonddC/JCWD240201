module.exports = {
  apps: [
    {
      name: 'JCWD-2402-01', // Format JCWD-{batchcode}-{groupnumber}
      script: './projects/server/src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8241,
      },
      time: true,
    },
  ],
};
