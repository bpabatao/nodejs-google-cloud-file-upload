# Node.js upload File to Google Cloud Storage

Google Cloud Storage located at:
```
google-cloud-key.json

Note: I will be removing this .json file after 3 days.
```

PORT: localhost:8080

API Routes:
```
POST /upload : upload file to Google Cloud Storage
GET /files : get files lits details from Google Cloud Storage
GET /files/:publicKey : get file details by publicKey from Google Cloud Storage
DELETE /files/:privateKey : delete file by privateKey from Google Cloud Storage
```

SAMPLE test files in the Google Cloud Storage:
```
[
    {
        "name": "1093c913ab538241eb10b20b95668abc.jpeg",
        "id": "1093c913ab538241eb10b20b95668abc.jpeg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/1093c913ab538241eb10b20b95668abc.jpeg"
    },
    {
        "name": "189ea1aad727e31803bda27502a4bd80.jpg",
        "id": "189ea1aad727e31803bda27502a4bd80.jpg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/189ea1aad727e31803bda27502a4bd80.jpg"
    },
    {
        "name": "1a6db9183a82d037a57660265b6dfc9e.jpeg",
        "id": "1a6db9183a82d037a57660265b6dfc9e.jpeg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/1a6db9183a82d037a57660265b6dfc9e.jpeg"
    },
    {
        "name": "5eb8d5ed47018d5388d58988084287bb.jpeg",
        "id": "5eb8d5ed47018d5388d58988084287bb.jpeg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/5eb8d5ed47018d5388d58988084287bb.jpeg"
    },
    {
        "name": "8ab8ee9823dbd496188b24f262dc5883.jpg",
        "id": "8ab8ee9823dbd496188b24f262dc5883.jpg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/8ab8ee9823dbd496188b24f262dc5883.jpg"
    },
    {
        "name": "8d2a314cabae97fc2d11a96ebbfc9c10",
        "id": "8d2a314cabae97fc2d11a96ebbfc9c10",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/8d2a314cabae97fc2d11a96ebbfc9c10"
    },
    {
        "name": "a5346ef87ce38c9d398bf74904bc1b88jpeg",
        "id": "a5346ef87ce38c9d398bf74904bc1b88jpeg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/a5346ef87ce38c9d398bf74904bc1b88jpeg"
    },
    {
        "name": "b018350e61891358fe91743795beaa32.jpeg",
        "id": "b018350e61891358fe91743795beaa32.jpeg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/b018350e61891358fe91743795beaa32.jpeg"
    },
    {
        "name": "c724a3697f36ae2df542615da3f84de8.gif",
        "id": "c724a3697f36ae2df542615da3f84de8.gif",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/c724a3697f36ae2df542615da3f84de8.gif"
    },
    {
        "name": "d7b05476ae38086dbd6e617071bd467f.jpeg",
        "id": "d7b05476ae38086dbd6e617071bd467f.jpeg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/d7b05476ae38086dbd6e617071bd467f.jpeg"
    },
    {
        "name": "e052193ad32bc21d7b39abe7277f707c.jpg",
        "id": "e052193ad32bc21d7b39abe7277f707c.jpg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/e052193ad32bc21d7b39abe7277f707c.jpg"
    },
    {
        "name": "e07f03b484a436e508b5bc4e1f237c20.jpg",
        "id": "e07f03b484a436e508b5bc4e1f237c20.jpg",
        "publicUrl": "https://storage.googleapis.com/file_sharing_bucket_sample/e07f03b484a436e508b5bc4e1f237c20.jpg"
    },
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
