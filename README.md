# Node.js upload File to Google Cloud Storage
```

## Project setup
```
npm install
```

### Run
```
node server.js

or

npx nodemon server.js
```


Google Cloud Storage located at:
```
google-cloud-key.json
```
Note: 
1. I will be removing this .json file after 3 days.
2. All files that will be uploaded has public URL, so they are all accessible by everyone for a certain time.

PORT: 8080

API Routes:
```
POST /upload : upload file to Google Cloud Storage
GET /files : get files lits details from Google Cloud Storage
GET /files/:publicKey : get file details by publicKey from Google Cloud Storage
DELETE /files/:privateKey : delete file by privateKey from Google Cloud Storage
```

Test data files in the Google Cloud Storage:
```
[
    {
        "name": "pexels-aleksandar-pasaric-325185.jpg",
        "id": "pexels-aleksandar-pasaric-325185.jpg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/pexels-aleksandar-pasaric-325185.jpg"
    },
    {
        "name": "pexels-andreas-barth-1131774.jpg",
        "id": "pexels-andreas-barth-1131774.jpg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/pexels-andreas-barth-1131774.jpg"
    }
]
```
