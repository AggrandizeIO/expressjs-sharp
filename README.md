Express.js + Sharp Tutorial
==================================

This is a simplified example of an image manipulation service using Express and Sharp.

- ES6 support via [babel](https://babeljs.io)
- Image Manipulation via [sharp](https://github.com/lovell/sharp)
- HTTP Server via [express](https://expressjs.com/)

Getting Started
---------------

```sh
# clone it
git clone git@github.com:AggrandizeIO/expressjs-sharp.git
cd expressjs-sharp

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```

Docker Support
------

```sh
cd expressjs-sharp

# Build your docker
docker build -t aggrandize/express-sharp .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 aggrandize/express-sharp
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   
```

Usage Example
-------

This example code comes pre-configured with an [Unsplash](https://unsplash.com) `basePath` entry right out of the box. You can request an Unsplash image if you have the full path to the original image.

For instance, take a URL like `https://images.unsplash.com/photo-1506153456649-ed4ed08d1e0c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d631d4911c05368cf6699b828116473d&auto=format&fit=crop&w=2850&q=80`.

Extract from that the image path `photo-1506153456649-ed4ed08d1e0c`, add it onto the end of your hostname `http://localhost:8080` plus the customer account name `unsplash`.

```
http://localhost:8080/unsplash/photo-1506153456649-ed4ed08d1e0c?w=500
```

License
-------

MIT
