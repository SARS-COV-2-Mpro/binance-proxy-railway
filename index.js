const express = require('express');
const axios = require('axios');
const app = express();

// This proxy talks DIRECTLY to Binance
app.all('/binance/*', async (req, res) => {
    const path = req.path.replace('/binance', '');
    
    try {
        const response = await axios({
            method: req.method,
            url: `https://api.binance.com${path}`,
            params: req.query,
            headers: { 
                'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || ''
            }
        });
        res.json(response.data);
    } catch (e) {
        res.status(e.response?.status || 500)
           .json(e.response?.data || { error: e.message });
    }
});

app.get('/', (req, res) => res.send('Proxy E alive'));

app.listen(process.env.PORT || 3000);
