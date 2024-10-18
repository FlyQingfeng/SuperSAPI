import { ChatSendBeforeEvent, Entity, EntityDieAfterEvent, EntityHealthChangedAfterEvent, EntityHitBlockAfterEvent, EntityHitEntityAfterEvent, EntityHurtAfterEvent, EntityLoadAfterEvent, EntityRemoveAfterEvent, EntityRemoveBeforeEvent, EntitySpawnAfterEvent, ItemCompleteUseEvent, ItemReleaseUseAfterEvent, ItemStartUseAfterEvent, ItemStopUseOnAfterEvent, ItemUseAfterEvent, ItemUseBeforeEvent, ItemUseOnAfterEvent, ItemUseOnBeforeEvent, Player, PlayerBreakBlockAfterEvent, PlayerBreakBlockBeforeEvent, PlayerDimensionChangeAfterEvent, PlayerEmoteAfterEvent, PlayerGameModeChangeAfterEvent, PlayerGameModeChangeBeforeEvent, PlayerInputPermissionCategoryChangeAfterEvent, PlayerInteractWithBlockAfterEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityAfterEvent, PlayerInteractWithEntityBeforeEvent, PlayerJoinAfterEvent, PlayerLeaveAfterEvent, PlayerLeaveBeforeEvent, PlayerPlaceBlockAfterEvent, PlayerPlaceBlockBeforeEvent, PlayerSpawnAfterEvent, system, System, SystemAfterEvents, SystemBeforeEvents, World, world } from "@minecraft/server";
import { SuperWorld } from "./World/SuperWorld";
import { SuperPlayer } from "./Player/SuperPlayer";
import { SuperEntity } from "./Entity/SuperEntity";
import { CommandManager } from "./Command/CommandManager";
import { SuperItemStack } from "./Item/SuperItemStack";
import { Debug } from "./Public/Debug";
import { ItemStackManager } from "./Item/SuperItemManager";
import { cast, toJSON } from "./Public/Stdlib";


export enum NativeClassType {//可被替换的类和原型
    World,
    Player,
    Entity,
    ItemStack,
}
type _Class = new (...args: any[]) => any

export class ClassManager {
    static mclass = {
        [NativeClassType.World]: SuperWorld,
        [NativeClassType.Player]: SuperPlayer,
        [NativeClassType.Entity]: SuperEntity,
        [NativeClassType.ItemStack]: SuperItemStack,
    };
    constructor() {

    }
    static getClass(type: NativeClassType) {
        return this.mclass[type.toString()]
    }
    static replaceClass(type: NativeClassType, NewClass: _Class) {
        this.mclass[type.toString()] = NewClass;
    }
    static CreateInstance(type: NativeClassType, origin: any, ...args: any[]) {
        if (args) {
            return new (this.mclass[type.toString()])(origin, ...args)
        }
        return new (this.mclass[type.toString()])(origin)
    }
}

export class SuperSystem {
    source_instance: System;
    static sp_world: SuperWorld;
    ready: boolean = false;
    constructor(source_instance: System) {
        this.source_instance = source_instance;
        this.afterEvents = source_instance.afterEvents;
        this.beforeEvents = source_instance.beforeEvents;
        this.currentTick = source_instance.currentTick;
    };
    //初始化运行时函数
    init() {
        SuperSystem.sp_world = ClassManager.CreateInstance(NativeClassType.World, world);
        //玩家事件
        //beforeEvents事件
        SuperSystem.sp_world.beforeEvents.playerBreakBlock.subscribe(this.PlayerBreakBlockBeforeEvent)
        SuperSystem.sp_world.beforeEvents.playerPlaceBlock.subscribe(this.PlayerBreakPlaceBeforeEvent)
        SuperSystem.sp_world.beforeEvents.chatSend.subscribe(this.PlayerChatSendBeforeEvent)
        SuperSystem.sp_world.beforeEvents.itemUse.subscribe(this.PlayerItemUseBeforeEvent)
        SuperSystem.sp_world.beforeEvents.itemUseOn.subscribe(this.PlayerItemUseOnBeforeEvent)
        SuperSystem.sp_world.beforeEvents.playerGameModeChange.subscribe(this.PlayerGameModeChangeBeforeEvent)
        SuperSystem.sp_world.beforeEvents.playerInteractWithBlock.subscribe(this.PlayerInteractWithBlockBeforeEvent)
        SuperSystem.sp_world.beforeEvents.playerInteractWithEntity.subscribe(this.PlayerInteractWithEntityBeforeEvent)
        SuperSystem.sp_world.beforeEvents.playerLeave.subscribe(this.PlayerLeaveBeforeEvent)
        //afterEvents事件
        SuperSystem.sp_world.afterEvents.playerBreakBlock.subscribe(this.PlayerBreakBlockAfterEvent)
        SuperSystem.sp_world.afterEvents.playerDimensionChange.subscribe(this.PlayerDimensionChangeAfterEvent)
        SuperSystem.sp_world.afterEvents.playerEmote.subscribe(this.PlayerEmoteAfterEvent)
        SuperSystem.sp_world.afterEvents.playerGameModeChange.subscribe(this.PlayerGameModeChangeAfterEvent)
        SuperSystem.sp_world.afterEvents.playerInputPermissionCategoryChange.subscribe(this.PlayerInputPermissionCategoryChangeAfterEvent)
        SuperSystem.sp_world.afterEvents.playerInteractWithBlock.subscribe(this.PlayerInteractWithBlockAfterEvent)
        SuperSystem.sp_world.afterEvents.playerInteractWithEntity.subscribe(this.PlayerInteractWithEntityAfterEvent)
        SuperSystem.sp_world.afterEvents.playerJoin.subscribe(this.PlayerJoinAfterEvent)
        SuperSystem.sp_world.afterEvents.playerLeave.subscribe(this.PlayerLeaveAfterEvent)
        SuperSystem.sp_world.afterEvents.playerPlaceBlock.subscribe(this.PlayerPlaceBlockAfterEvent)
        SuperSystem.sp_world.afterEvents.playerSpawn.subscribe(this.PlayerSpawnAfterEvent)
        SuperSystem.sp_world.afterEvents.itemUse.subscribe(this.PlayerItemUseAfterEvent)
        SuperSystem.sp_world.afterEvents.itemUseOn.subscribe(this.PlayerItemUseOnAfterEvent)
        SuperSystem.sp_world.afterEvents.itemCompleteUse.subscribe(this.PlayerItemCompleteAfterEvent)
        SuperSystem.sp_world.afterEvents.itemReleaseUse.subscribe(this.PlayerItemReleaseUseAfterEvent)
        SuperSystem.sp_world.afterEvents.itemStartUse.subscribe(this.PlayerItemStartUseAfterEvent)
        SuperSystem.sp_world.afterEvents.itemStopUseOn.subscribe(this.PlayerItemStopUseOnAfterEvent)

        //entity
        SuperSystem.sp_world.afterEvents.entityDie.subscribe(this.EntityDieAfterEvent)
        SuperSystem.sp_world.afterEvents.entityHealthChanged.subscribe(this.EntityHealthChangedAfterEvent)
        SuperSystem.sp_world.afterEvents.entityHitBlock.subscribe(this.EntityHitBlockAfterEvent)
        SuperSystem.sp_world.afterEvents.entityHitEntity.subscribe(this.EntityHitEntityAfterEvent)
        SuperSystem.sp_world.afterEvents.entityHurt.subscribe(this.EntityHurtAfterEvent)
        SuperSystem.sp_world.afterEvents.entityLoad.subscribe(this.EntityLoadAfterEvent)
        SuperSystem.sp_world.afterEvents.entityRemove.subscribe(this.EntityRemoveAfterEvent)
        SuperSystem.sp_world.afterEvents.entitySpawn.subscribe(this.EntitySpawnAfterEvent)

        SuperSystem.sp_world.beforeEvents.entityRemove.subscribe(this.EntityRemoveBeforeEvent)


        //自定义指令
        SuperSystem.sp_world.beforeEvents.chatSend.subscribe(this.PlayerInputCommand)

        //world
        SuperSystem.sp_world.beforeEvents.worldInitialize.subscribe(SuperSystem.sp_world.onWorldInitializeBefore)
        SuperSystem.sp_world.afterEvents.worldInitialize.subscribe(SuperSystem.sp_world.onWorldInitializeAfter)

        //运行时管理world内的实体和玩家
        //重新加载实体
        SuperSystem.getWorld().ReloadEntitys();
        SuperSystem.sp_world.afterEvents.entitySpawn.subscribe((event) => {
            let spawn=this.runInterval(()=>{
                let entity=world.getEntity(event.entity.id)
                if (entity) {
                    SuperSystem.getWorld().CreateEntityInstance(entity);
                    this.clearRun(spawn);
                }
            },10)
        })
        SuperSystem.sp_world.afterEvents.entityRemove.subscribe((event) => {
            let id = event.removedEntityId;
            SuperSystem.getWorld().RemoveEntitysForID(id);
        })
        SuperSystem.sp_world.afterEvents.entityDie.subscribe((event) => {
            SuperSystem.getWorld().RemoveFromEntitys(event.deadEntity);
        })
        //玩家
        SuperSystem.sp_world.afterEvents.playerSpawn.subscribe((event) => {
            SuperSystem.getWorld().CreateEntityInstance(event.player);
        })


        system.runInterval(() => {
            this.runTick(1);
        }, 1);
        this.ready = true;
    }
    private runTick(t: number) {
        if (this.ready) {
            for (const entity of SuperSystem.getWorld().getAllEntitys()) {
                if (entity.enable_tick) {
                    entity.tick(t);
                }
                for (const sp_com of entity.getCustomComponents()) {
                    if (sp_com.enable_tick) {
                        sp_com.tick(t);
                    }
                }
                if (entity instanceof SuperPlayer) {
                    let player = cast<SuperPlayer>(entity)
                    if (player.last_selectedSlotIndex != player.selectedSlotIndex) {
                        player.onSwitchSelectedSlot();
                        this.onPlayerSwitchSelectedSlot(player, player.last_selectedSlotIndex, player.selectedSlotIndex);
                    }
                    player.last_selectedSlotIndex = player.selectedSlotIndex
                }
            }
            for (const item of Object.values(ItemStackManager.getItems())) {
                for (const item_com of item.getCustomComponents()) {
                    if (item_com.enable_tick) {
                        item_com.tick(t);
                    }
                }
            }
        }
    }
    //实体
    private EntityDieAfterEvent(event: EntityDieAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.deadEntity.id)
        if (entity == undefined) {
            return
        }
    }
    private EntityHealthChangedAfterEvent(event: EntityHealthChangedAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.entity.id);
        if (entity == undefined) {
            return
        }
        entity.onHealthChangedAfterEvent(event)
    }
    private EntityHitBlockAfterEvent(event: EntityHitBlockAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.damagingEntity.id);
        if (entity == undefined) {
            return
        }
        entity.onHitBlockAfterEvent(event)
    }
    private EntityHitEntityAfterEvent(event: EntityHitEntityAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.damagingEntity.id);
        if (entity == undefined) {
            return
        }
        entity.onHitEntityAfterEvent(event)
        if (entity instanceof SuperPlayer) {
            let player = cast<SuperPlayer>(entity)
            let item = ItemStackManager.CreateItem(player.getHandItem());
            if (item) {
                player.setHandItem(item);
                let hitEntity = SuperSystem.getWorld().getEntity(event.hitEntity.id);
                item.onAttack(player, hitEntity);
            }
        }
    }
    private EntityHurtAfterEvent(event: EntityHurtAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.hurtEntity.id);
        if (entity == undefined) {
            return
        }
        entity.onHurtAfterEvent(event)
    }
    private EntityLoadAfterEvent(event: EntityLoadAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.entity.id);
        if (entity == undefined) {
            return
        }
        entity.onLoadAfterEvent(event)
    }
    private EntityRemoveAfterEvent(event: EntityRemoveAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.removedEntityId);
        if (entity == undefined) {
            return
        }
        entity.onRemoveAfterEvent(event)
    }
    private EntitySpawnAfterEvent(event: EntitySpawnAfterEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.entity.id);
        if (entity == undefined) {
            return
        }
        entity.onEntitySpawnAfterEvent(event)
    }
    private EntityRemoveBeforeEvent(event: EntityRemoveBeforeEvent) {
        let entity = SuperSystem.getWorld().getEntity(event.removedEntity.id);
        if (entity == undefined) {
            return
        }
        entity.onRemoveBeforeEvent(event)
    }
    //玩家
    onPlayerSwitchSelectedSlot(player: SuperPlayer, oldSlot: number, newSlot: number) {
        let olditem = player.getInventoryContainer().getItem(oldSlot)
        let newitem = player.getInventoryContainer().getItem(newSlot)
        let sp_olditem = ItemStackManager.CreateItem(olditem);
        let sp_newitem = ItemStackManager.CreateItem(newitem);
        player.setSelectedSlotItem(oldSlot,sp_olditem);
        player.setSelectedSlotItem(newSlot,sp_newitem);
        if (sp_olditem) {
            sp_olditem.onSwitchOut(player);
        }
        if (sp_newitem) {
            sp_newitem.onSwitchIn(player);
        }
    }
    private PlayerInputCommand(event: ChatSendBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.sender.name })[0]
        if (player == undefined) {
            return
        }
        CommandManager.Input(player, event);
    }
    private PlayerItemStopUseOnAfterEvent(event: ItemStopUseOnAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemStopUseOnAfterEvent(event)

        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            let { block } = event;
            item.onStopUse(player, block);
        }
    }
    private PlayerItemStartUseAfterEvent(event: ItemStartUseAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemStartUseAfterEvent(event)

        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            let { useDuration } = event;
            item.onStartUse(player, useDuration);
        }
    }
    private PlayerItemReleaseUseAfterEvent(event: ItemReleaseUseAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemReleaseAfterEvent(event)

        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            let { useDuration } = event;
            item.onItemRelease(player, useDuration);
        }
    }
    private PlayerItemCompleteAfterEvent(event: ItemCompleteUseEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemCompleteAfterEvent(event)

        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            item.onItemComplete(player);
        }
    }
    private PlayerItemUseOnAfterEvent(event: ItemUseOnAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemUseOnAfterEvent(event)

        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            let { block, blockFace, faceLocation, isFirstEvent } = event;
            item.onUseOn(player, block, blockFace, faceLocation, isFirstEvent);
        }
    }
    private PlayerItemUseAfterEvent(event: ItemUseAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemUseAfterEvent(event)
        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            item.onUse(player);
        }
    }
    private PlayerSpawnAfterEvent(event: PlayerSpawnAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onPlayerSpawnAfterEvent(event)
    }
    private PlayerPlaceBlockAfterEvent(event: PlayerPlaceBlockAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onPlaceBlockAfterEvent(event)
    }
    private PlayerLeaveAfterEvent(event: PlayerLeaveAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.playerName })[0]
        if (player == undefined) {
            return
        }
        player.onLeaveAfterEvent(event)
    }
    private PlayerJoinAfterEvent(event: PlayerJoinAfterEvent) {
        let run = system.runInterval(() => {
            let player = world.getPlayers({ name: event.playerName })[0]
            if (player == undefined) {
                return
            }
            system.clearRun(run)
            // let newplayer=SuperWorld.CreateEntityInstance<SuperPlayer>(player);
            // newplayer.onJoinAfterEvent(event)
        }, 10)
    }
    private PlayerInteractWithEntityAfterEvent(event: PlayerInteractWithEntityAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onInteractWithEntityAfterEvent(event)
    }
    private PlayerInteractWithBlockAfterEvent(event: PlayerInteractWithBlockAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onInteractWithBlockAfterEvent(event)
    }
    private PlayerInputPermissionCategoryChangeAfterEvent(event: PlayerInputPermissionCategoryChangeAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onInputPermissionCategoryChangeAfterEvent(event)
    }
    private PlayerGameModeChangeAfterEvent(event: PlayerGameModeChangeAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        if (player) {
            player.onGameModeChangeAfterEvent(event)
        }
    }
    private PlayerEmoteAfterEvent(event: PlayerEmoteAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onEmoteAfterEvent(event)
    }
    private PlayerDimensionChangeAfterEvent(event: PlayerDimensionChangeAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onDimensionChangeAfterEvent(event)
    }
    private PlayerBreakBlockAfterEvent(event: PlayerBreakBlockAfterEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onBreakBlockAfterEvent(event)
    }

    private PlayerLeaveBeforeEvent(event: PlayerLeaveBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onLeaveBeforeEvent(event)
    }
    private PlayerInteractWithEntityBeforeEvent(event: PlayerInteractWithEntityBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onInteractWithEntityBeforeEvent(event)
    }
    private PlayerInteractWithBlockBeforeEvent(event: PlayerInteractWithBlockBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onInteractWithBlockBeforeEvent(event)
    }
    private PlayerGameModeChangeBeforeEvent(event: PlayerGameModeChangeBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onGameModeChangeBeforeEvent(event)
    }
    private PlayerItemUseOnBeforeEvent(event: ItemUseOnBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemUseOnBeforeEvent(event)
    }
    private PlayerItemUseBeforeEvent(event: ItemUseBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0]
        if (player == undefined) {
            return
        }
        player.onItemUseBeforeEvent(event)
    }
    private PlayerChatSendBeforeEvent(event: ChatSendBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.sender.name })[0]
        if (player == undefined) {
            return
        }
        player.onChatSendBeforeEvent(event)
    }
    private PlayerBreakPlaceBeforeEvent(event: PlayerPlaceBlockBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onPlaceBeforeEvent(event)
    }
    private PlayerBreakBlockBeforeEvent(event: PlayerBreakBlockBeforeEvent) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0]
        if (player == undefined) {
            return
        }
        player.onBreakBlockBeforeEvent(event)
    }


    static getWorld(): SuperWorld {
        return SuperSystem.sp_world
    }

    /**
     * @remarks
     * Returns a collection of after-events for system-level
     * operations.
     *
     */
    readonly afterEvents: SystemAfterEvents;
    /**
     * @beta
     * @remarks
     * Returns a collection of before-events for system-level
     * operations.
     *
     */
    readonly beforeEvents: SystemBeforeEvents;
    /**
     * @remarks
     * Represents the current world tick of the server.
     *
     */
    readonly currentTick: number;
    /**
     * @remarks
     * Cancels the execution of a job queued via {@link
     * System.runJob}.
     *
     * @param jobId
     * The job ID returned from {@link System.runJob}.
     */
    clearJob(jobId: number): void {
        return this.source_instance.clearJob(jobId);
    };
    /**
     * @remarks
     * Cancels the execution of a function run that was previously
     * scheduled via {@link System.run}.
     *
     */
    clearRun(runId: number): void {
        return this.source_instance.clearRun(runId);
    };
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
    run(callback: () => void): number {
        return this.source_instance.run(callback);
    };
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
    runInterval(callback: () => void, tickInterval?: number): number {
        return this.source_instance.runInterval(callback);
    };
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
    runJob(generator: Generator<void, void, void>): number {
        return this.source_instance.runJob(generator);
    };
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
    runTimeout(callback: () => void, tickDelay?: number): number {
        return this.source_instance.runTimeout(callback);
    };
    /**
     * @throws This function can throw errors.
     *
     * {@link minecraftcommon.EngineError}
     */
    waitTicks(ticks: number): Promise<void> {
        return this.source_instance.waitTicks(ticks);
    };
}

export let runtime = new SuperSystem(system)