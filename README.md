Express.js + Sharp Tutorial
==================================

This is a simplified example of an image manipulation service using Express and Sharp.

- ES6 support via [babel](https://babeljs.io)
- Image Manipulation via [sharp](https://github.com/lovell/sharp)
- HTTP Server via [express](https://expressjs.com/)

Tutorial
-------------

You can find the tutorial here.

https://aggrandize.io/blog/how-to-build-an-image-processing-service-with-expressjs-and-sharp


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

Query Parameters
-------

This example only scratches the surface of what is possible. Here is a list of available commands.

| Parameter | Description  | Values         |
| --------- | ------------ | -------------- |
| blur      | Blur         | 0.3 - 1000     |
| crop      | Crop         | A string of `north`, `northeast`, `east`, `southeast`, `south`, `southwest`, `west`, `northwest`, `center`, `centre`, `entropy`, or `attention` [Sharp Cropping] |
| h         | Height       | 0 - Infinity   |
| w         | Width        | 0 - Infinity   |
| q         | JPEG Quality | 0 - 100        |

Usage Example
-------

This example code comes pre-configured with an [Unsplash](https://unsplash.com) `baseUrl` entry right out of the box. You can request an Unsplash image if you have the full path to the original image.

For instance, take a URL like `https://images.unsplash.com/photo-1506153456649-ed4ed08d1e0c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d631d4911c05368cf6699b828116473d&auto=format&fit=crop&w=2850&q=80`. You can find an Unsplash image path by navigating to an image from their website using Chrome `https://unsplash.com/photos/FkJ3aNGeFMY`. When you've found an image you like, just right-click the image and `Copy Image Address`.

Extract from that the image path `photo-1506153456649-ed4ed08d1e0c`, add it onto the end of your hostname `http://localhost:8080` plus the customer account name `unsplash`.

```
http://localhost:8080/unsplash/photo-1506153456649-ed4ed08d1e0c?w=500
```

If you have your own image storage location like an S3 Bucket or Google Cloud Storage bucket, you can add a new customer entry with a `baseUrl` to `config.js`.

```
customers: {
  unsplash: {
    baseUrl: 'https://images.unsplash.com'
  },
  aws-bucket: {
    baseUrl: 'https://s3-eu-west-1.amazonaws.com/bucket'
  }
}
```

Restart the server when you change this file. Your bucket images can now be addressed by the customer name.

```
https://localhost:8080/aws-bucket/my-image.jpg?w=320
```

License
-------

MIT

[Sharp Cropping]: http://sharp.pixelplumbing.com/en/stable/api-resize/#crop
