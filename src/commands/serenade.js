const Discord = require('discord.js');
const FFMPEG = require('ffmpeg')


module.exports = {
    name: 'serenade',
    description: 'Drag a mentioned user into a private channel and play some ...loud "music"',
    execute(msg, args, state) {
        var member = msg.mentions.members.first();
        var server = msg.guild;

        server.createChannel("Relaxing noises", "voice");
        let channel = server.channels.find('name', 'Relaxing noises')
        console.log(server.channels)
        channel.join()
        .then(conn => {
            const dispatcher = conn.playFile(__dirname + '\\..\\assets\\audio\\RelaxingSong.mp3');
            dispatcher.on("end", () => {
                channel.leave()
            })
        })
        .catch(err => console.log(err))
    }
}