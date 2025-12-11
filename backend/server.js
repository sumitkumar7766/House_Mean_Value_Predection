const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch data from external API
app.post('/api/predict', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8000/predict', req.body, { timeout: 5000 });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching prediction:', error.message);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from prediction server' });
        } else {
            res.status(500).json({ error: 'Failed to fetch prediction' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
