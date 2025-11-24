const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Simple API route
app.get('/api/data', (req, res) => {
	res.json({ message: 'Hi welcome to trybXP', timestamp: Date.now() });
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});