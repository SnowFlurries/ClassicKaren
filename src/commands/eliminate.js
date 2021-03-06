const Discord = require('discord.js');
const { createCanvas, loadImage, Image } = require('canvas')


module.exports = {
    name: 'eliminate',
    description: 'Eliminate a mentioned user, GTA style',
    async execute (msg, args, state) {
        var width, height;
        var member = msg.mentions.members.first();
        
        var img = new Image();
        img.onload = async function() {
            width = img.naturalWidth,
            height = img.naturalHeight

            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            const avatar = await loadImage(member.user.displayAvatarURL);
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

            const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

            ctx.putImageData(id, 0, 0)

            const wasted = await loadImage(__dirname + '/../assets/img/wasted.png');
            ctx.drawImage(wasted, 0, 0.35 * canvas.height, canvas.width, 0.5 * canvas.height);
    
            const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
            msg.channel.send(attachment)
        }
        img.src = member.user.displayAvatarURL;
        
        console.log(width + " + " + height)

       
    }
}