const columnify = require('columnify'); // Column formatting

module.exports = {
    name: 'help',
    description: 'Lists all of the bot\'s commands',
    execute(msg, args, state) {
        var helpData = {};
        for (var k of state.commands.keyArray()) {
            helpData[`${k}`] = state.commands.get(k).description
        }

        var helpColumns = columnify(helpData, {
            columns: ['Command', 'Description'],
            minWidth: 10
        })

        msg.channel.send('__**Commands:**__ (Remember to prefix any cmd with hey karen,)\`\`\`' + helpColumns + '\n\nTyping @ClassicKaren#5666 {msg here} -- is used to have a conversation with the chatbot side of karen\`\`\`')
    }
}