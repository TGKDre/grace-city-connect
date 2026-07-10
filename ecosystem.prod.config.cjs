{
  "apps": [
    {
      "name": "grace-city",
      "cwd": "/home/ubuntu/grace-city-connect",
      "script": "node_modules/.bin/vite",
      "args": "preview --port 5175 --host 0.0.0.0",
      "env": { "NODE_ENV": "production" },
      "max_restarts": 10,
      "restart_delay": 5000
    }
  ]
}
