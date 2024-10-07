export class CommandManager {
    constructor() {
    }
    // 注册指令
    static registerCommand(name, description, callback = (player, args) => { }, isOpOnly = false) {
        if (typeof callback === 'function') {
            CommandManager.commands[name] = {
                description: description,
                callback: callback,
                isOpOnly: isOpOnly
            };
            console.log(`Command "${name}" registration successfully.`);
        }
        else {
            console.error(`Registration of directive ${name} failed. Callback functions are not valid functions.`);
        }
    }
    // 注册子指令
    static registerSubCommand(father, name, description, callback = (player, args) => { }, isOpOnly = false) {
        if (typeof callback === 'function') {
            if (CommandManager.commands.hasOwnProperty(father)) {
                var fcmd = CommandManager.commands[father];
                if (!fcmd.hasOwnProperty("subCommands")) {
                    fcmd.subCommands = {};
                }
                var subcmd = fcmd.subCommands;
                subcmd[name] = {
                    description: description,
                    callback: callback,
                    isOpOnly: isOpOnly
                };
            }
            else {
                console.error(`Registration of sub-directive ${name} of directive ${father} failed. ${father} parent instruction is not registered.`);
            }
        }
        else {
            console.error(`Registration of sub-directive ${name} of directive ${father} failed. Callback functions are not valid functions.`);
        }
    }
    static Input(player, event) {
        var msg = event.message;
        if (msg.includes("#")) {
            event.cancel = true;
            var cmds = msg.split(" ");
            var cmd = cmds[0].slice(1, cmds[0].length);
            var args = cmds.slice(1, cmds.length);
            CommandManager.executeCommand(player, cmd, args);
        }
    }
    // 执行指令
    static executeCommand(player, name, args) {
        if (CommandManager.commands.hasOwnProperty(name)) {
            const command = CommandManager.commands[name];
            // console.log(`执行指令: ${name}`);
            command.callback(player, args);
        }
        else {
            console.error(`指令 ${name} 未注册.`);
            // player.sendMessage(`指令 ${name} 未注册.`);
        }
    }
    static executeSubCommand(player, father, name, args) {
        if (CommandManager.commands.hasOwnProperty(father)) {
            var fathercmd = CommandManager.commands[father];
            if (fathercmd.subCommands.hasOwnProperty(name)) {
                const command = fathercmd.subCommands[name];
                // console.log(`执行指令:${father} ${name}`);
                command.callback(player, args);
            }
            else {
                // console.error(`指令 ${father} ${name} 未注册.`);
                player.sendMessage(`指令 ${father} ${name} 未注册.`);
            }
        }
    }
    // 打印帮助信息
    static showHelp(player) {
        player.sendMessage('§2可用指令列表:');
        for (const [name, { description, subCommands }] of Object.entries(CommandManager.commands)) {
            if (subCommands !== undefined) { //包含子指令
                player.sendMessage(`§2#${name} ${description}`);
                for (const [subname, { description }] of Object.entries(subCommands)) {
                    player.sendMessage(`§2#${name} ${subname} ${description}`);
                }
            }
            else {
                player.sendMessage(`§2#${name} ${description}`);
            }
        }
    }
    static parseCommand(command) {
        const parts = command.match(/(?:[^\s,"]|"(?:\\.|[^"])*")+/g);
        let result = [];
        let currentPart = '';
        parts.forEach(part => {
            if (part.startsWith('"') && part.endsWith('"')) {
                currentPart = part.slice(1, -1).replace(/\\"/g, '"');
            }
            else {
                if (currentPart) {
                    result.push(currentPart);
                    currentPart = part;
                }
                else {
                    currentPart = part;
                }
            }
        });
        if (currentPart) {
            result.push(currentPart);
        }
        return result;
    }
}
CommandManager.commands = {};
// 注册一个指令,默认注册帮助文档
CommandManager.registerCommand('help', '§3指令帮助文档', (player, args) => {
    CommandManager.showHelp(player);
});
// commandManager.registerCommand('setOP', '<玩家名字> <bool>      §3设置插件OP', (player: any,args: any[]) => {
//     commandManager.showHelp(player);
// });
