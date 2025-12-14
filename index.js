const express = require('express');
const axios = require('axios');
const app = express();

// YOUR DENO URL ⬇️
const NEXT_PROXY = 'https://healthy-whale-82.deno.dev';

app.all('/*', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${NEXT_PROXY}${req.path}`,
            params: req.query,
            headers: {
                'x-mbx-apikey': req.headers['x-mbx-apikey'] || ''
            }
        });
        res.json(response.data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/', (req, res) => res.send('Northflank Proxy - Alive'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
