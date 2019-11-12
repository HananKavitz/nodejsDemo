
const express = require('express');
import { Response, Request, NextFunction } from "express";
var router = express.Router();
const fs = require('fs');
const path = require('path');
const os = require('os');
const {Storage} = require('@google-cloud/storage');

const bucketName = 'myfirstnodejsapp-238305.appspot.com';
 // Creates a client
 const storage = new Storage({
    projectId: 'myfirstnodejsapp-238305', 
    // keyFilename: 'path-to-the-private-key', // Replace with the path to the downloaded private key
  });
router.get('/images',(req: Request, res: Response, next: NextFunction) => {
    const staticLocation = 'static/outputs';
    const p = path.join(__dirname,'../', staticLocation);
   
    fs.readdir(p, (err: Error, files: string[]) => {
        if (err){
            console.log(err);
            next(err);
        }
        
        files = files.map((file: string): string => {
            return  path.join(staticLocation, file);
        } );
        res.status(200).send(files);

    })
    
});

const getPublicThumbnailUrlForItem = (fileName: string): string => {
    return `https://storage.googleapis.com/${bucketName}/${fileName}`
  }
  
router.get('/imagesInBucket',async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   
    
    // Lists files in the bucket
    try {
        let [files] = await storage.bucket(bucketName).getFiles();
        console.log(files);
        files = files.map((file: any): string => {
            return  getPublicThumbnailUrlForItem(file.name);
        } );
        res.status(200).send(files);
        
    } catch (err){
        console.error(err);
    }
        
})

router.post('/newImege', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const file = req.body.file;
    console.log(file);
    const filename: string = file.path;

    
    // Uploads a local file to the bucket
    try {
        await storage.bucket(bucketName).upload(filename, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'no-cache',
            },
        });
        res.status(200);
        console.log(`${filename} uploaded to ${bucketName}.`);
    } catch (err) {
        console.error(err);
    }
    
});

module.exports = router;