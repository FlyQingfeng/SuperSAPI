import { system, world } from "@minecraft/server";
import { SuperWorld } from "./World/SuperWorld";
import { SuperPlayer } from "./Player/SuperPlayer";
import { SuperEntity } from "./Entity/SuperEntity";
import { CommandManager } from "./Command/CommandManager";
function isClass(fn) {
    try {
        return typeof fn === 'function' &&
            fn.prototype &&
            fn.prototype.constructor &&
            fn.prototype.constructor.name === fn.name;
    }
    catch (error) {
        return false;
    }
}
export var NativeClassType;
(function (NativeClassType) {
    NativeClassType["World"] = "World";
    NativeClassType["Player"] = "Player";
    NativeClassType["Entity"] = "Entity";
})(NativeClassType || (NativeClassType = {}));
export class ClassManager {
    constructor() {
    }
    static getClass(type) {
        return this.mclass[type.toString()];
    }
    static replaceClass(type, NewClass) {
        if (isClass(NewClass)) {
            this.mclass[type] = NewClass;
        }
    }
}
ClassManager.mclass = {
    World: SuperWorld,
    Player: SuperPlayer,
    Entity: SuperEntity,
};
export class SuperSystem {
    constructor(source_instance) {
        this.ready = false;
        this.source_instance = source_instance;
        this.afterEvents = source_instance.afterEvents;
        this.beforeEvents = source_instance.beforeEvents;
        this.currentTick = source_instance.currentTick;
    }
    ;
    //初始化运行时函数
    init() {
        SuperSystem.sp_world = new (ClassManager.getClass(NativeClassType.World))(world);
        //玩家事件
        //beforeEvents事件
        SuperSystem.sp_world.beforeEvents.playerBreakBlock.subscribe(this.PlayerBreakBlockBeforeEvent);
        SuperSystem.sp_world.beforeEvents.playerPlaceBlock.subscribe(this.PlayerBreakPlaceBeforeEvent);
        SuperSystem.sp_world.beforeEvents.chatSend.subscribe(this.PlayerChatSendBeforeEvent);
        SuperSystem.sp_world.beforeEvents.itemUse.subscribe(this.PlayerItemUseBeforeEvent);
        SuperSystem.sp_world.beforeEvents.itemUseOn.subscribe(this.PlayerItemUseOnBeforeEvent);
        SuperSystem.sp_world.beforeEvents.playerGameModeChange.subscribe(this.PlayerGameModeChangeBeforeEvent);
        SuperSystem.sp_world.beforeEvents.playerInteractWithBlock.subscribe(this.PlayerInteractWithBlockBeforeEvent);
        SuperSystem.sp_world.beforeEvents.playerInteractWithEntity.subscribe(this.PlayerInteractWithEntityBeforeEvent);
        SuperSystem.sp_world.beforeEvents.playerLeave.subscribe(this.PlayerLeaveBeforeEvent);
        //afterEvents事件
        SuperSystem.sp_world.afterEvents.playerBreakBlock.subscribe(this.PlayerBreakBlockAfterEvent);
        SuperSystem.sp_world.afterEvents.playerDimensionChange.subscribe(this.PlayerDimensionChangeAfterEvent);
        SuperSystem.sp_world.afterEvents.playerEmote.subscribe(this.PlayerEmoteAfterEvent);
        SuperSystem.sp_world.afterEvents.playerGameModeChange.subscribe(this.PlayerGameModeChangeAfterEvent);
        SuperSystem.sp_world.afterEvents.playerInputPermissionCategoryChange.subscribe(this.PlayerInputPermissionCategoryChangeAfterEvent);
        SuperSystem.sp_world.afterEvents.playerInteractWithBlock.subscribe(this.PlayerInteractWithBlockAfterEvent);
        SuperSystem.sp_world.afterEvents.playerInteractWithEntity.subscribe(this.PlayerInteractWithEntityAfterEvent);
        SuperSystem.sp_world.afterEvents.playerJoin.subscribe(this.PlayerJoinAfterEvent);
        SuperSystem.sp_world.afterEvents.playerLeave.subscribe(this.PlayerLeaveAfterEvent);
        SuperSystem.sp_world.afterEvents.playerPlaceBlock.subscribe(this.PlayerPlaceBlockAfterEvent);
        SuperSystem.sp_world.afterEvents.playerSpawn.subscribe(this.PlayerSpawnAfterEvent);
        SuperSystem.sp_world.afterEvents.itemUse.subscribe(this.PlayerItemUseAfterEvent);
        SuperSystem.sp_world.afterEvents.itemUseOn.subscribe(this.PlayerItemUseOnAfterEvent);
        SuperSystem.sp_world.afterEvents.itemCompleteUse.subscribe(this.PlayerItemCompleteAfterEvent);
        SuperSystem.sp_world.afterEvents.itemReleaseUse.subscribe(this.PlayerItemReleaseUseAfterEvent);
        SuperSystem.sp_world.afterEvents.itemStartUse.subscribe(this.PlayerItemStartUseAfterEvent);
        SuperSystem.sp_world.afterEvents.itemStopUseOn.subscribe(this.PlayerItemStopUseOnAfterEvent);
        //自定义指令
        SuperSystem.sp_world.beforeEvents.chatSend.subscribe(this.PlayerInputCommand);
        //运行时管理world内的实体和玩家
        SuperWorld.Players = SuperSystem.getWorld().toSuperPlayers(world.getAllPlayers());
        SuperSystem.sp_world.afterEvents.entitySpawn.subscribe((event) => {
            let sp_entity = new (ClassManager.getClass(NativeClassType.Entity))(event.entity);
            SuperWorld.Entitys.push(sp_entity);
        });
        SuperSystem.sp_world.afterEvents.entityDie.subscribe((event) => {
            let sp_entity = new (ClassManager.getClass(NativeClassType.Entity))(event.deadEntity);
            SuperWorld.Entitys = SuperWorld.Entitys.filter((e) => {
                return e.id != sp_entity.id;
            });
        });
        SuperSystem.sp_world.afterEvents.playerSpawn.subscribe((event) => {
            let sp_player = new (ClassManager.getClass(NativeClassType.Player))(event.player);
            SuperWorld.Players = SuperWorld.Players.filter((p) => {
                return p.name != sp_player.name;
            });
            SuperWorld.Players.push(sp_player);
        });
        SuperSystem.sp_world.afterEvents.playerLeave.subscribe((event) => {
            let name = event.playerName;
            SuperWorld.Players = SuperWorld.Players.filter((p) => {
                return p.name != name;
            });
        });
        system.runInterval(() => {
            this.runTick(1);
        }, 1);
        this.ready = true;
    }
    runTick(t) {
        if (this.ready) {
            for (let entity of SuperSystem.getWorld().getAllEntitys()) {
                if (entity.enable_tick) {
                    entity.tick(t);
                }
            }
            for (let player of SuperSystem.getWorld().getPlayers()) {
                if (player.enable_tick) {
                    player.tick(t);
                }
            }
        }
    }
    PlayerInputCommand(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.sender.name })[0];
        if (player == undefined) {
            return;
        }
        CommandManager.Input(player, event);
    }
    PlayerItemStopUseOnAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemStopUseOnAfterEvent(event);
    }
    PlayerItemStartUseAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemStartUseAfterEvent(event);
    }
    PlayerItemReleaseUseAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemReleaseAfterEvent(event);
    }
    PlayerItemCompleteAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemCompleteAfterEvent(event);
    }
    PlayerItemUseOnAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemUseOnAfterEvent(event);
    }
    PlayerItemUseAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemUseAfterEvent(event);
    }
    PlayerSpawnAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onSpawnAfterEvent(event);
    }
    PlayerPlaceBlockAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onPlaceBlockAfterEvent(event);
    }
    PlayerLeaveAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.playerName })[0];
        if (player == undefined) {
            return;
        }
        player.onLeaveAfterEvent(event);
    }
    PlayerJoinAfterEvent(event) {
        let run = system.runInterval(() => {
            let player = world.getPlayers({ name: event.playerName })[0];
            if (player == undefined) {
                return;
            }
            system.clearRun(run);
            let newplayer = new SuperPlayer(player);
            SuperWorld.Players.push(newplayer);
            newplayer.onJoinAfterEvent(event);
        }, 10);
    }
    PlayerInteractWithEntityAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onInteractWithEntityAfterEvent(event);
    }
    PlayerInteractWithBlockAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onInteractWithBlockAfterEvent(event);
    }
    PlayerInputPermissionCategoryChangeAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onInputPermissionCategoryChangeAfterEvent(event);
    }
    PlayerGameModeChangeAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        if (player) {
            player.onGameModeChangeAfterEvent(event);
        }
    }
    PlayerEmoteAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onEmoteAfterEvent(event);
    }
    PlayerDimensionChangeAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onDimensionChangeAfterEvent(event);
    }
    PlayerBreakBlockAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onAfterBreakBlockEvent(event);
    }
    PlayerLeaveBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onLeaveBeforeEvent(event);
    }
    PlayerInteractWithEntityBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onInteractWithEntityBeforeEvent(event);
    }
    PlayerInteractWithBlockBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onInteractWithBlockBeforeEvent(event);
    }
    PlayerGameModeChangeBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onGameModeChangeBeforeEvent(event);
    }
    PlayerItemUseOnBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemUseOnBeforeEvent(event);
    }
    PlayerItemUseBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemUseBeforeEvent(event);
    }
    PlayerChatSendBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.sender.name })[0];
        if (player == undefined) {
            return;
        }
        player.onChatSendBeforeEvent(event);
    }
    PlayerBreakPlaceBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onBreakPlaceBeforeEvent(event);
    }
    PlayerBreakBlockBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onBeforeBreakBlockEvent(event);
    }
    static getWorld() {
        return SuperSystem.sp_world;
    }
    /**
     * @remarks
     * Cancels the execution of a job queued via {@link
     * System.runJob}.
     *
     * @param jobId
     * The job ID returned from {@link System.runJob}.
     */
    clearJob(jobId) {
        return this.source_instance.clearJob(jobId);
    }
    ;
    /**
     * @remarks
     * Cancels the execution of a function run that was previously
     * scheduled via {@link System.run}.
     *
     */
    clearRun(runId) {
        return this.source_instance.clearRun(runId);
    }
    ;
    /**
     * @remarks
     * Runs a specified function at the next available future time.
     * This is frequently used to implement delayed behaviors and
     * game loops. When run within the context of an event handler,
     * this will generally run the code at the end of the same tick
     * where the event occurred. When run in other code (a
     * system.run callout), this will run the function in the next
     * tick. Note, however, that depending on load on the system,
     * running in the same or next tick is not guaranteed.
     *
     * @param callback
     * Function callback to run at the next game tick.
     * @returns
     * An opaque identifier that can be used with the `clearRun`
     * function to cancel the execution of this run.
     * @example trapTick.ts
     * ```typescript
     * import { system, world } from '@minecraft/server';
     *
     * function printEveryMinute() {
     *     try {
     *         // Minecraft runs at 20 ticks per second.
     *         if (system.currentTick % 1200 === 0) {
     *             world.sendMessage('Another minute passes...');
     *         }
     *     } catch (e) {
     *         console.warn('Error: ' + e);
     *     }
     *
     *     system.run(printEveryMinute);
     * }
     *
     * printEveryMinute();
     * ```
     */
    run(callback) {
        return this.source_instance.run(callback);
    }
    ;
    /**
     * @remarks
     * Runs a set of code on an interval.
     *
     * @param callback
     * Functional code that will run when this interval occurs.
     * @param tickInterval
     * An interval of every N ticks that the callback will be
     * called upon.
     * @returns
     * An opaque handle that can be used with the clearRun method
     * to stop the run of this function on an interval.
     * @example every30Seconds.ts
     * ```typescript
     * import { system, world } from '@minecraft/server';
     *
     * const intervalRunIdentifier = Math.floor(Math.random() * 10000);
     *
     * system.runInterval(() => {
     *     world.sendMessage('This is an interval run ' + intervalRunIdentifier + ' sending a message every 30 seconds.');
     * }, 600);
     * ```
     */
    runInterval(callback, tickInterval) {
        return this.source_instance.runInterval(callback);
    }
    ;
    /**
     * @remarks
     * Queues a generator to run until completion.  The generator
     * will be given a time slice each tick, and will be run until
     * it yields or completes.
     *
     * @param generator
     * The instance of the generator to run.
     * @returns
     * An opaque handle that can be used with {@link
     * System.clearJob} to stop the run of this generator.
     * @example cubeGenerator.ts
     * ```typescript
     * import { BlockPermutation, DimensionLocation, world, ButtonPushAfterEvent, system } from '@minecraft/server';
     *
     * // A simple generator that places blocks in a cube at a specific location
     * // with a specific size, yielding after every block place.
     * function* blockPlacingGenerator(blockPerm: BlockPermutation, startingLocation: DimensionLocation, size: number) {
     *     for (let x = startingLocation.x; x < startingLocation.x + size; x++) {
     *         for (let y = startingLocation.y; y < startingLocation.y + size; y++) {
     *             for (let z = startingLocation.z; z < startingLocation.z + size; z++) {
     *                 const block = startingLocation.dimension.getBlock({ x: x, y: y, z: z });
     *                 if (block) {
     *                     block.setPermutation(blockPerm);
     *                 }
     *                 yield;
     *             }
     *         }
     *     }
     * }
     *
     * // When a button is pushed, we will place a 15x15x15 cube of cobblestone 10 blocks above it
     * world.afterEvents.buttonPush.subscribe((buttonPushEvent: ButtonPushAfterEvent) => {
     *     const cubePos = buttonPushEvent.block.location;
     *     cubePos.y += 10;
     *
     *     const blockPerm = BlockPermutation.resolve('minecraft:cobblestone');
     *
     *     system.runJob(blockPlacingGenerator(blockPerm, { dimension: buttonPushEvent.dimension, ...cubePos }, 15));
     * });
     * ```
     */
    runJob(generator) {
        return this.source_instance.runJob(generator);
    }
    ;
    /**
     * @remarks
     * Runs a set of code at a future time specified by tickDelay.
     *
     * @param callback
     * Functional code that will run when this timeout occurs.
     * @param tickDelay
     * Amount of time, in ticks, before the interval will be
     * called.
     * @returns
     * An opaque handle that can be used with the clearRun method
     * to stop the run of this function on an interval.
     */
    runTimeout(callback, tickDelay) {
        return this.source_instance.runTimeout(callback);
    }
    ;
    /**
     * @throws This function can throw errors.
     *
     * {@link minecraftcommon.EngineError}
     */
    waitTicks(ticks) {
        return this.source_instance.waitTicks(ticks);
    }
    ;
}
export let runtime = new SuperSystem(system);
