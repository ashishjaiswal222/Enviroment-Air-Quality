const http = require('http');
   const app = require('./app');
   const dotenv = require('dotenv');
   const WebSocketService = require('./services/webSocketService');

   // Load environment variables
   dotenv.config();

   const PORT = process.env.PORT || 5000;

   // Create HTTP server
   const server = http.createServer(app);

   // Initialize WebSocket
   new WebSocketService(server);

   server.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
   });