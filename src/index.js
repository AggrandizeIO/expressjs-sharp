import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import sharp from 'sharp';
import config from './config';

let app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

const getCustomerById = (customerId, db) => db[customerId] ? db[customerId] : 'https://localhost';

const download = url => axios({
  method: 'get',
  url,
  responseType: 'stream'
}).then(response => response.data);

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const transform = ({
  blur,
  cropMode,
  height,
  width,
  quality,
}) => {
  const sharpObj = sharp();
  // Width and height set...
  if (Number.isInteger(height) && Number.isInteger(width)) {
    sharpObj.resize(width, height);

  // Only width set...
  } else if (isNumeric(width)) {
    sharpObj.resize(width);

  // Only height set...
  } else if (isNumeric(height)){
    sharpObj.resize(null, height);
  }

  // Blur
  if (isNumeric(blur)) {
    // Clamp between 0.3 and 1000
    sharpObj.blur(Math.min(1000, Math.max(blur, 0.3)));
  }

  // Crop mode
  if (sharp.strategy[cropMode]) {
    sharpObj.crop(sharp.strategy[cropMode]);
  }

  // JPEG quality
  sharpObj.jpeg({
    quality: isNumeric(quality) ? Math.max(1, Math.min(100, quality)) : 80,
  });
  return sharpObj;
}

app.options(':customerId/:imagePath*', cors());
app.get('/:customerId/:imagePath*', (req, res) => {
	const cust = getCustomerById(req.params.customerId, config.customers);
	const {
    blur,
    crop,
		h,
		w,
    q,
	} = req.query;
	const imagePath = req.url.split('/').slice(2).join('/');

  // Ignore requests for favicons.
  if (imagePath === '/favicon.ico') { return res.status(404); }

  // Output format...
	res.type('image/jpeg');
	const url = `${cust.baseUrl}/${imagePath}`;

  // Download the image from the user's master image source.
  download(url).then(response => response.pipe(transform({
      blur: parseInt(blur, 10),
      height: parseInt(h, 10),
      width: parseInt(w, 10),
      quality: q && parseInt(q, 10),
      cropMode: crop,
    })).pipe(res)).catch(err => {
    res.status(404).send();
  });
});

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
