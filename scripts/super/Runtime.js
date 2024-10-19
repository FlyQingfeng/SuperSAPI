import { system, world } from "@minecraft/server";
import { SuperWorld } from "./World/SuperWorld";
import { SuperPlayer } from "./Player/SuperPlayer";
import { SuperEntity } from "./Entity/SuperEntity";
import { CommandManager } from "./Command/CommandManager";
import { SuperItemStack } from "./Item/SuperItemStack";
import { ItemStackManager } from "./Item/SuperItemManager";
import { cast } from "./Public/Stdlib";
import { CustomStaticComponentManager } from "./Component/CustomStaticComponentManager";
export var NativeClassType;
(function (NativeClassType) {
    NativeClassType[NativeClassType["World"] = 0] = "World";
    NativeClassType[NativeClassType["Player"] = 1] = "Player";
    NativeClassType[NativeClassType["Entity"] = 2] = "Entity";
    NativeClassType[NativeClassType["ItemStack"] = 3] = "ItemStack";
})(NativeClassType || (NativeClassType = {}));
export class ClassManager {
    constructor() {
    }
    static getClass(type) {
        return this.mclass[type.toString()];
    }
    static replaceClass(type, NewClass) {
        this.mclass[type.toString()] = NewClass;
    }
    static CreateInstance(type, origin, ...args) {
        if (args) {
            return new (this.mclass[type.toString()])(origin, ...args);
        }
        return new (this.mclass[type.toString()])(origin);
    }
}
ClassManager.mclass = {
    [NativeClassType.World]: SuperWorld,
    [NativeClassType.Player]: SuperPlayer,
    [NativeClassType.Entity]: SuperEntity,
    [NativeClassType.ItemStack]: SuperItemStack,
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
        SuperSystem.sp_world = ClassManager.CreateInstance(NativeClassType.World, world);
        //玩家事件
        //beforeEvents事件
        SuperSystem.sp_world.beforeEvents.playerBreakBlock.subscribe(this.PlayerBreakBlockBeforeEvent);
        SuperSystem.sp_world.beforeEvents.playerPlaceBlock.subscribe(this.PlayerPlaceBlockBeforeEvent);
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
        //entity
        SuperSystem.sp_world.afterEvents.entityDie.subscribe(this.EntityDieAfterEvent);
        SuperSystem.sp_world.afterEvents.entityHealthChanged.subscribe(this.EntityHealthChangedAfterEvent);
        SuperSystem.sp_world.afterEvents.entityHitBlock.subscribe(this.EntityHitBlockAfterEvent);
        SuperSystem.sp_world.afterEvents.entityHitEntity.subscribe(this.EntityHitEntityAfterEvent);
        SuperSystem.sp_world.afterEvents.entityHurt.subscribe(this.EntityHurtAfterEvent);
        SuperSystem.sp_world.afterEvents.entityLoad.subscribe(this.EntityLoadAfterEvent);
        SuperSystem.sp_world.afterEvents.entityRemove.subscribe(this.EntityRemoveAfterEvent);
        SuperSystem.sp_world.afterEvents.entitySpawn.subscribe(this.EntitySpawnAfterEvent);
        SuperSystem.sp_world.beforeEvents.entityRemove.subscribe(this.EntityRemoveBeforeEvent);
        //自定义指令
        SuperSystem.sp_world.beforeEvents.chatSend.subscribe(this.PlayerInputCommand);
        //world
        SuperSystem.sp_world.beforeEvents.worldInitialize.subscribe(SuperSystem.sp_world.onWorldInitializeBefore);
        SuperSystem.sp_world.afterEvents.worldInitialize.subscribe(SuperSystem.sp_world.onWorldInitializeAfter);
        //运行时管理world内的实体和玩家
        //重新加载实体
        SuperSystem.getWorld().ReloadEntitys();
        SuperSystem.sp_world.afterEvents.entitySpawn.subscribe((event) => {
            let spawn = this.runInterval(() => {
                let entity = world.getEntity(event.entity.id);
                if (entity) {
                    SuperSystem.getWorld().CreateEntityInstance(entity);
                    this.clearRun(spawn);
                }
            }, 10);
        });
        SuperSystem.sp_world.afterEvents.entityRemove.subscribe((event) => {
            let id = event.removedEntityId;
            SuperSystem.getWorld().RemoveEntitysForID(id);
        });
        SuperSystem.sp_world.afterEvents.entityDie.subscribe((event) => {
            SuperSystem.getWorld().RemoveFromEntitys(event.deadEntity);
        });
        //玩家
        SuperSystem.sp_world.afterEvents.playerSpawn.subscribe((event) => {
            SuperSystem.getWorld().CreateEntityInstance(event.player);
        });
        system.runInterval(() => {
            this.runTick(1);
        }, 1);
        this.ready = true;
    }
    static async waitUntil(condition_fun) {
        return new Promise((resolve, reject) => {
            let spawn = system.runInterval(() => {
                if (condition_fun()) {
                    system.clearRun(spawn);
                    resolve();
                }
            }, 1);
        });
    }
    runTick(t) {
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
                if (entity.isValid()) { //实体落到方块上判断
                    if (entity.last_isFalling && !entity.isFalling) {
                        let block = entity.dimension.getBlockBelow(entity.location, { maxDistance: 2 });
                        if (block && CustomStaticComponentManager.HasBlockCustomComponent(block.typeId)) {
                            entity.last_isFalling = false;
                            let blockCom = CustomStaticComponentManager.GetBlockCustomComponent(block.typeId);
                            blockCom.onEntityFallOn(block, entity, entity.FallingTime);
                            entity.fallOn(block);
                            entity.FallingTime = 0;
                        }
                    }
                    if (entity.isFalling) {
                        entity.FallingTime++;
                    }
                    entity.last_isFalling = entity.isFalling;
                }
                if (entity instanceof SuperPlayer && entity.isValid()) {
                    let player = cast(entity);
                    if (player.last_selectedSlotIndex != player.selectedSlotIndex) {
                        player.onSwitchSelectedSlot();
                        this.onPlayerSwitchSelectedSlot(player, player.last_selectedSlotIndex, player.selectedSlotIndex);
                    }
                    player.last_selectedSlotIndex = player.selectedSlotIndex;
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
    EntityDieAfterEvent(event) {
        let entity = SuperSystem.getWorld().getEntity(event.deadEntity.id);
        if (entity == undefined) {
            return;
        }
        entity.onDieAfterEvent(event);
        if (CustomStaticComponentManager.HasEntityCustomComponent(entity.typeId)) {
            let entityCom = CustomStaticComponentManager.GetEntityCustomComponent(entity.typeId);
            entityCom.onDie(entity);
        }
    }
    EntityHealthChangedAfterEvent(event) {
        let entity = SuperSystem.getWorld().getEntity(event.entity.id);
        if (entity == undefined) {
            return;
        }
        entity.onHealthChangedAfterEvent(event);
        if (CustomStaticComponentManager.HasEntityCustomComponent(entity.typeId)) {
            let entityCom = CustomStaticComponentManager.GetEntityCustomComponent(entity.typeId);
            entityCom.onHealthChanged(entity);
        }
    }
    EntityHitBlockAfterEvent(event) {
        let entity = SuperSystem.getWorld().getEntity(event.damagingEntity.id);
        if (entity == undefined) {
            return;
        }
        entity.onHitBlockAfterEvent(event);
    }
    EntityHitEntityAfterEvent(event) {
        let damagingEntity = SuperSystem.getWorld().getEntity(event.damagingEntity.id);
        let hitEntity = SuperSystem.getWorld().getEntity(event.hitEntity.id);
        if (damagingEntity == undefined) {
            return;
        }
        damagingEntity.onHitEntityAfterEvent(event);
        if (damagingEntity instanceof SuperPlayer) { //玩家攻击
            let player = cast(damagingEntity);
            let item = ItemStackManager.CreateItem(player.getHandItem());
            if (item) {
                player.setHandItem(item);
                let hitEntity = SuperSystem.getWorld().getEntity(event.hitEntity.id);
                item.onAttack(player, hitEntity);
            }
        }
        if (hitEntity == undefined) {
            return;
        }
        if (CustomStaticComponentManager.HasEntityCustomComponent(damagingEntity.typeId)) {
            let entityCom = CustomStaticComponentManager.GetEntityCustomComponent(damagingEntity.typeId);
            entityCom.onHitEntity(damagingEntity, hitEntity);
        }
    }
    EntityHurtAfterEvent(event) {
        let entity = SuperSystem.getWorld().getEntity(event.hurtEntity.id);
        if (entity == undefined) {
            return;
        }
        entity.onHurtAfterEvent(event);
        if (CustomStaticComponentManager.HasEntityCustomComponent(entity.typeId)) {
            let entityCom = CustomStaticComponentManager.GetEntityCustomComponent(entity.typeId);
            let { damage, damageSource } = event;
            entityCom.onHurt(entity, damage, damageSource);
        }
    }
    EntityLoadAfterEvent(event) {
        let entity = SuperSystem.getWorld().getEntity(event.entity.id);
        if (entity == undefined) {
            return;
        }
        entity.onLoadAfterEvent(event);
        if (CustomStaticComponentManager.HasEntityCustomComponent(entity.typeId)) {
            let entityCom = CustomStaticComponentManager.GetEntityCustomComponent(entity.typeId);
            entityCom.onLoad(entity);
        }
    }
    EntityRemoveAfterEvent(event) {
        let entity = SuperSystem.getWorld().getEntity(event.removedEntityId);
        if (entity == undefined) {
            return;
        }
        entity.onRemoveAfterEvent(event);
        if (CustomStaticComponentManager.HasEntityCustomComponent(entity.typeId)) {
            let entityCom = CustomStaticComponentManager.GetEntityCustomComponent(entity.typeId);
            entityCom.onRemove(entity);
        }
    }
    EntitySpawnAfterEvent(event) {
        SuperSystem.waitUntil(() => {
            let entity = SuperSystem.getWorld().getEntity(event.entity.id);
            if (entity != undefined) {
                return true;
            }
            return false;
        }).then(() => {
            let entity = SuperSystem.getWorld().getEntity(event.entity.id);
            entity.onEntitySpawnAfterEvent(event);
            if (CustomStaticComponentManager.HasEntityCustomComponent(entity.typeId)) {
                let entityCom = CustomStaticComponentManager.GetEntityCustomComponent(entity.typeId);
                entityCom.onSpawn(entity, event.cause);
            }
        });
    }
    EntityRemoveBeforeEvent(event) {
        let entity = SuperSystem.getWorld().getEntity(event.removedEntity.id);
        if (entity == undefined) {
            return;
        }
        entity.onRemoveBeforeEvent(event);
    }
    //玩家
    onPlayerSwitchSelectedSlot(player, oldSlot, newSlot) {
        let olditem = player.getInventoryContainer().getItem(oldSlot);
        let newitem = player.getInventoryContainer().getItem(newSlot);
        let sp_olditem = ItemStackManager.CreateItem(olditem);
        let sp_newitem = ItemStackManager.CreateItem(newitem);
        player.setSelectedSlotItem(oldSlot, sp_olditem);
        player.setSelectedSlotItem(newSlot, sp_newitem);
        if (sp_olditem) {
            sp_olditem.onSwitchOut(player);
        }
        if (sp_newitem) {
            sp_newitem.onSwitchIn(player);
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
        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            let { block } = event;
            item.onStopUse(player, block);
        }
    }
    PlayerItemStartUseAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemStartUseAfterEvent(event);
        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            let { useDuration } = event;
            item.onStartUse(player, useDuration);
        }
    }
    PlayerItemReleaseUseAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemReleaseAfterEvent(event);
        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            let { useDuration } = event;
            item.onItemRelease(player, useDuration);
            if (CustomStaticComponentManager.HasItemCustomComponent(item.typeId)) {
                let itemCom = CustomStaticComponentManager.GetItemCustomComponent(item.typeId);
                itemCom.onItemRelease(item, player);
            }
        }
    }
    PlayerItemCompleteAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemCompleteAfterEvent(event);
        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            item.onItemComplete(player);
            if (CustomStaticComponentManager.HasItemCustomComponent(item.typeId)) {
                let itemCom = CustomStaticComponentManager.GetItemCustomComponent(item.typeId);
                itemCom.onItemComplete(item, player);
            }
        }
    }
    PlayerItemUseOnAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemUseOnAfterEvent(event);
        let item = ItemStackManager.CreateItem(player.getHandItem());
        let { block, blockFace, faceLocation, isFirstEvent } = event;
        if (item) {
            player.setHandItem(item);
            item.onUseOn(player, block, blockFace, faceLocation, isFirstEvent);
            if (CustomStaticComponentManager.HasItemCustomComponent(item.typeId)) {
                let itemCom = CustomStaticComponentManager.GetItemCustomComponent(item.typeId);
                itemCom.onUseOn(item, player, block, blockFace, faceLocation, isFirstEvent);
            }
        }
    }
    PlayerItemUseAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.source.name })[0];
        if (player == undefined) {
            return;
        }
        player.onItemUseAfterEvent(event);
        let item = ItemStackManager.CreateItem(player.getHandItem());
        if (item) {
            player.setHandItem(item);
            item.onUse(player);
            if (CustomStaticComponentManager.HasItemCustomComponent(item.typeId)) {
                let itemCom = CustomStaticComponentManager.GetItemCustomComponent(item.typeId);
                itemCom.onUse(item, player);
            }
        }
    }
    PlayerSpawnAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onPlayerSpawnAfterEvent(event);
    }
    PlayerPlaceBlockAfterEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onPlaceBlockAfterEvent(event);
        if (CustomStaticComponentManager.HasBlockCustomComponent(event.block.typeId)) {
            let blockCom = CustomStaticComponentManager.GetBlockCustomComponent(event.block.typeId);
            const { block, dimension } = event;
            blockCom.onPlayerPlace(player, block, dimension);
        }
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
            // let newplayer=SuperWorld.CreateEntityInstance<SuperPlayer>(player);
            // newplayer.onJoinAfterEvent(event)
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
        if (CustomStaticComponentManager.HasBlockCustomComponent(event.block.typeId)) {
            let blockCom = CustomStaticComponentManager.GetBlockCustomComponent(event.block.typeId);
            const { beforeItemStack, block, blockFace, faceLocation, isFirstEvent, itemStack } = event;
            blockCom.onPlayerInteract(player, beforeItemStack, block, blockFace, faceLocation, isFirstEvent, itemStack);
        }
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
        player.onBreakBlockAfterEvent(event);
        let typeId = event.brokenBlockPermutation.type.id;
        if (CustomStaticComponentManager.HasBlockCustomComponent(typeId)) {
            let blockCom = CustomStaticComponentManager.GetBlockCustomComponent(typeId);
            const { block, brokenBlockPermutation, dimension, itemStackAfterBreak, itemStackBeforeBreak } = event;
            blockCom.onPlayerDestroy(player, block, brokenBlockPermutation, dimension, itemStackAfterBreak, itemStackBeforeBreak);
        }
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
    PlayerPlaceBlockBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onPlaceBlockBeforeEvent(event);
        let typeId = event.permutationBeingPlaced.type.id;
        if (CustomStaticComponentManager.HasBlockCustomComponent(typeId)) {
            let blockCom = CustomStaticComponentManager.GetBlockCustomComponent(typeId);
            blockCom.beforeOnPlayerPlace(player, event);
        }
    }
    PlayerBreakBlockBeforeEvent(event) {
        let player = SuperSystem.getWorld().getPlayers({ name: event.player.name })[0];
        if (player == undefined) {
            return;
        }
        player.onBreakBlockBeforeEvent(event);
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
