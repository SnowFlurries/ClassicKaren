const Discord = require('discord.js');
const FFMPEG = require('ffmpeg')
const opus = require('node-opus')

module.exports = {
    name: 'serenade',
    description: 'Drag a mentioned user into a private channel and play some ...loud "music"',
    execute(msg, args, state) {
        var member = msg.mentions.members.first();
        var channel = member.voiceChannel;
        channel.join()
        .then(conn => {
            const dispatcher = conn.playFile(__dirname + '/../assets/audio/RelaxingSong.mp3');
            dispatcher.on("end", (end) => {
                setTimeout(function(){
                    channel.leave()
                }, 2000)
            })
        })
        .catch(err => console.log(err))
    }
}