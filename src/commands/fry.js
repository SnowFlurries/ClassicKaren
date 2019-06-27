const Discord = require('discord.js');
var Jimp = require('jimp');
const { createCanvas, loadImage, Image } = require('canvas')


module.exports = {
    name: "fry",
    description: "Deepfries an image sent by a user",
    async execute(msg, args, state) {
        const url = msg.attachments.array()[0].url
        var dimensions = {
            width: 500,
            height: 500
        }

        await Jimp.read(url)
        .then((lenna) => {
            dimensions.width = lenna.bitmap.width;
            dimensions.height = lenna.bitmap.height;

            lenna.brightness(0.73)
            lenna.contrast(0.86)
            var buffer;
            lenna.getBuffer(Jimp.MIME_PNG, (err, result) => {
                buffer = result//.buffer
            })

            return buffer
            // return lenna
        })
        .then((imgBuffer) => {
            const canvas = createCanvas(dimensions.width, dimensions.height);
            const ctx = canvas.getContext('2d');

            const img = new Image()
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
            img.onerror = (err) => { throw err }
            img.src = imgBuffer
            
            //ctx.strokeStyle = '#74037b';
            // Draw a rectangle with the dimensions of the entire canvas
            //ctx.strokeRect(0, 0, canvas.width, canvas.height);

            /*const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const data = id.data;
            for (let i = 0; i < data.length; i+=4) {
                let r = data[i]
                let g = data[i + 1]
                let b = data[i + 2]
                let y = 0.299 * r + 0.587 * g + 0.114 * b;
                data[i] = y
                data[i + 1] = y;
	            data[i + 2] = y;
            }

            ctx.putImageData(id, 0, 0)*/
            const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

            msg.channel.send('You\'re welcome', attachment)
        })
        .catch(err => {
            console.error(err);
        });

        /*probe(url)
        .then(result => {
            dimensions.width = result.width,
        })*/        


        
    }
}