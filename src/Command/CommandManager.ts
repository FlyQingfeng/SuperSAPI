import { ChatSendBeforeEvent, system, world } from "@minecraft/server";
import { SuperPlayer } from "Player/SuperPlayer";

interface ICommand {
    description: string;
    callback: (player: any, args: any[]) => void;
    isOpOnly: boolean;
    subCommands?: { [key: string]: ICommand };
}

export class CommandManager {
    private static commands: { [key: string]: ICommand } = {};

    constructor() {
    }

    // 注册指令
    static registerCommand(name: string, description: string, callback: (player: SuperPlayer, args: string[]) => void = (player: SuperPlayer, args: string[]) => { }, isOpOnly: boolean = false): void {
        if (typeof callback === 'function') {
            CommandManager.commands[name] = {
                description: description,
                callback: callback,
                isOpOnly: isOpOnly
            };
            console.log(`Command "${name}" registration successfully.`);
        } else {
            console.error(`Registration of directive ${name} failed. Callback functions are not valid functions.`);
        }
    }

    // 注册子指令
    static registerSubCommand(father: string, name: string, description: string, callback: (player: SuperPlayer, args: string[]) => void = (player: SuperPlayer, args: string[]) => { }, isOpOnly: boolean = false): void {
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
            } else {
                console.error(`Registration of sub-directive ${name} of directive ${father} failed. ${father} parent instruction is not registered.`);
            }
        } else {
            console.error(`Registration of sub-directive ${name} of directive ${father} failed. Callback functions are not valid functions.`);
        }
    }
    static Input(player:SuperPlayer,event:ChatSendBeforeEvent) {
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
    static executeCommand(player: SuperPlayer, name: string, args: string[]): void {
        if (CommandManager.commands.hasOwnProperty(name)) {
            const command = CommandManager.commands[name];
            // console.log(`执行指令: ${name}`);
            system.run(()=>{
                command.callback(player, args);
            })
        } else {
            console.error(`指令 ${name} 未注册.`);
            // player.sendMessage(`指令 ${name} 未注册.`);
        }
    }

    static executeSubCommand(player: SuperPlayer, father: string, name: string, args: string[]): void {
        if (CommandManager.commands.hasOwnProperty(father)) {
            var fathercmd = CommandManager.commands[father];
            if (fathercmd.subCommands.hasOwnProperty(name)) {
                const command = fathercmd.subCommands[name];
                // console.log(`执行指令:${father} ${name}`);
                system.run(()=>{
                    command.callback(player, args);
                })
            } else {
                // console.error(`指令 ${father} ${name} 未注册.`);
                player.sendMessage(`指令 ${father} ${name} 未注册.`);
            }
        }
    }

    // 打印帮助信息
    static showHelp(player: SuperPlayer): void {
        player.sendMessage('§2可用指令列表:');
        for (const [name, { description, subCommands }] of Object.entries(CommandManager.commands)) {
            if (subCommands !== undefined) { //包含子指令
                player.sendMessage(`§2#${name} ${description}`);
                for (const [subname, { description }] of Object.entries(subCommands)) {
                    player.sendMessage(`§2#${name} ${subname} ${description}`);
                }
            } else {
                player.sendMessage(`§2#${name} ${description}`);
            }
        }
    }

    static parseCommand(command: string): string[] {
        const parts = command.match(/(?:[^\s,"]|"(?:\\.|[^"])*")+/g);
        let result: string[] = [];
        let currentPart = '';

        parts.forEach(part => {
            if (part.startsWith('"') && part.endsWith('"')) {
                currentPart = part.slice(1, -1).replace(/\\"/g, '"');
            } else {
                if (currentPart) {
                    result.push(currentPart);
                    currentPart = part;
                } else {
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

// 注册一个指令,默认注册帮助文档
CommandManager.registerCommand('help', '§3指令帮助文档', (player: SuperPlayer, args: string[]) => {
    CommandManager.showHelp(player);
});

// commandManager.registerCommand('setOP', '<玩家名字> <bool>      §3设置插件OP', (player: any,args: any[]) => {
//     commandManager.showHelp(player);
// });
