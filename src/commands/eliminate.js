const Discord = require('discord.js');
const { createCanvas, loadImage, Image } = require('canvas')


module.exports = {
    name: 'eliminate',
    description: 'Eliminate the mentioned user',
    async execute (msg, args, state) {
        var width, height;
        var member = msg.mentions.members.first();
        
        img = new Image();
        img.onload = async function() {
            console.log("Loaded img")
            width = img.naturalWidth,
            height = img.naturalHeight

            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            const avatar = await loadImage(member.user.displayAvatarURL);
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

            const wasted = await loadImage(__dirname + '\\..\\assets\\img\\wasted.png');
            ctx.drawImage(wasted, 0, 0.35 * canvas.height, canvas.width, 0.5 * canvas.height);
    
            const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
            msg.channel.send(attachment)
        }
        img.src = member.user.displayAvatarURL;
        
        console.log(width + " + " + height)

       
    }
}