const {
    ApplicationCommandOptionType: Options,
    PermissionsBitField: { Flags }
} = require('discord.js');

const { Server } = require('../main');
const lang = require('../lang');
const { getCommandDescription } = lang;
const utils = require('../utils');

const Ticket = require('../schemas/ticket');

module.exports = {
    info: {
        name: 'createticket',
        ...getCommandDescription('CREATETICKET_DESCRIPTION'),
        options: [
            {
                name: 'targetuser',
                ...getCommandDescription('CREATETICKET_TARGETUSER_DESCRIPTION'),
                type: Options.User,
                required: true
            },
            {
                name: 'title',
                ...getCommandDescription('CREATETICKET_TITLE_DESCRIPTION'),
                type: Options.String,
                required: true
            }
        ]
    },
    checkPermission: async interaction => {
        const forum = Server.channel.ticket;
        return utils.permissionChecker(interaction => forum.permissionsFor(interaction.member).has(Flags.SendMessages), '티켓')(interaction);
    },
    handler: async interaction => {
        await interaction.deferReply({
            ephemeral: true
        });

        const str = k => lang.langByLangName(user?.lang || 'en', k);

        const { options } = interaction;
        const user = options.getUser('targetuser');
        const title = options.getString('title');

        const ticket = await Ticket.findOne({
            user: user.id
        });
        if(ticket) return interaction.editReply(str('CREATETICKET_ALREADY_EXISTS'));

        await utils.createTicketChannel(user, title);
        try {
            await user.send(str('CREATETICKET_FROM_MOD_DM')
                .replace('{title}', title)
            );
        } catch(e) {}
        return interaction.editReply(str('CREATE_NEW_TICKET_SUCCESS'));
    }
}