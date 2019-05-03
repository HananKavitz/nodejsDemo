
const express = require('express');
import { Response, Request, NextFunction } from "express";
var router = express.Router();
const fs = require('fs');
const path = require('path');
const {Storage} = require('@google-cloud/storage');

const bucketName = 'myfirstnodejsapp-238305.appspot.com';

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
var getPublicThumbnailUrlForItem = (fileName: string): string => {
    return `https://storage.googleapis.com/${bucketName}/${fileName}`
  }
router.get('/imagesInBucket',async (req: Request, res: Response, next: NextFunction) => {
    // Creates a client
    const storage = new Storage({
        projectId: 'myfirstnodejsapp-238305', 
        // keyFilename: 'path-to-the-private-key', // Replace with the path to the downloaded private key
      });

    
    const staticLocation = 'https://console.cloud.google.com/storage/browser/nodejs-demo-238305/';
    // Lists files in the bucket
    try {
        let [files] = await storage.bucket(bucketName).getFiles();
       
        files = files.map((file: any): string => {
            return  getPublicThumbnailUrlForItem(file.name);
        } );
        res.status(200).send(files);
        
    } catch (err){
        console.error(err);
    }
        
})

module.exports = router;