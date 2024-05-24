const Dropbox = require('dropbox').Dropbox;
const fetch = require('node-fetch');

// Dropbox 연결
const dbx = new Dropbox({
    accessToken: `${process.env.DROPBOX_ACCESS_TOKEN}`,
    fetch: fetch,
});

async function uploadImage(req, res) {

    const file = req.file;

    const uniqueIdentifier = Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9-_.]/g, '');
    const newFilename = `${uniqueIdentifier}-${sanitizedFilename}`;

    const filePath = `/uploads/${newFilename}`;

    try {
        await dbx.filesUpload({
            path: filePath,
            contents: file.buffer,
        });

        const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
            path: filePath,
        });
        
        if (sharedLinkResponse.result && sharedLinkResponse.result.url) {
            const sharedLink = sharedLinkResponse.result;
            res.json({ url: sharedLink.url.replace('dl=0', 'raw=1') });
        } else {
            console.error(sharedLinkResponse.error);
            res.status(500).send('Error uploading file');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file');
    }
}

module.exports = {
    uploadImage,
};
