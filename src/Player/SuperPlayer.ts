import * as mc from "@minecraft/server";
import { SuperEntity } from "../Entity/SuperEntity";
import { registerAsSubscribable, Super } from "../Super/Super";
import { ComponentType, CustomComponentManager } from "../Component/CustomComponentManager";
import { enumKeyToString } from "../Public/Stdlib";
import { PlayerSuperComponent } from "../Component/SuperPlayerComponent";
import { SuperWorld } from "../World/SuperWorld";
import { SuperItemStack } from "Item/SuperItemStack";

export class SuperPlayer extends SuperEntity {
    
    
    source_instance: mc.Player;
    last_selectedSlotIndex: number=0;
    constructor(source_instance: mc.Player,world:SuperWorld) {
        super(source_instance,world)
        this.source_instance = source_instance;
    };
    
    public get camera() : mc.Camera {
        return this.source_instance.camera
    }
    public get inputPermissions() : mc.PlayerInputPermissions {
        return this.source_instance.inputPermissions
    }
    public get isEmoting() : boolean {
        return this.source_instance.isEmoting
    }
    public get isFlying() : boolean {
        return this.source_instance.isFlying
    }
    public get isGliding() : boolean {
        return this.source_instance.isGliding
    }
    public get isJumping() : boolean {
        return this.source_instance.isJumping
    }
    public get level() : number {
        return this.source_instance.level
    }
    public get name() : string {
        return this.source_instance.name
    }
    public get onScreenDisplay() : mc.ScreenDisplay {
        return this.source_instance.onScreenDisplay
    }
    public get totalXpNeededForNextLevel() : number {
        return this.source_instance.totalXpNeededForNextLevel
    }
    public get xpEarnedAtCurrentLevel() : number {
        return this.source_instance.xpEarnedAtCurrentLevel
    }
    public get selectedSlotIndex() : number {
        return this.source_instance.selectedSlotIndex
    }
    onSwitchSelectedSlot() {
        
    }
    getInventory():mc.EntityInventoryComponent{
        return this.getComponent(mc.EntityComponentTypes.Inventory)
    }
    getInventoryContainer():mc.Container{
        return this.getInventory().container
    }
    getEquipment():mc.EntityEquippableComponent{
        return this.getComponent(mc.EntityComponentTypes.Equippable)
    }
    
    getHandItem():mc.ItemStack|undefined{
        let item=this.getInventoryContainer().getItem(this.selectedSlotIndex)
        return item
    }
    setSelectedSlotItem(slot: number, item: SuperItemStack) {
        let olditem=this.getInventoryContainer().getItem(slot)
        if (!olditem||!item) {
            return
        }
        let found=olditem.getDynamicPropertyIds().find(id=>{
            return id="uuid"
        })
        if (found) {
            let uuid=olditem.getDynamicProperty("uuid") as string
            if (uuid!==item.uuid) {
                this.getInventoryContainer().setItem(slot,item.getItem());
            }
        }else{
            this.getInventoryContainer().setItem(slot,item.getItem());
        }
    }
    setHandItem(item:SuperItemStack){
        let handitem=this.getHandItem();
        if (!handitem) {
            return
        }
        let found=handitem.getDynamicPropertyIds().find(id=>{
            return id="uuid"
        })
        if (found) {
            let uuid=handitem.getDynamicProperty("uuid") as string
            if (uuid!==item.uuid) {
                this.getInventoryContainer().setItem(this.selectedSlotIndex,item.getItem());
            }
        }else{
            this.getInventoryContainer().setItem(this.selectedSlotIndex,item.getItem());
        }
    }
    giveItem(item:SuperItemStack){
        let container=this.getComponent(mc.EntityComponentTypes.Inventory).container
        container.addItem(item.getItem())
    }
    readCustomComponent() {
        super.readCustomComponent();
        let data = this.getDynamicProperty("CustomComponent") as string;
        if (data) {
            let json = JSON.parse(data);
            for (let [id, cm_data] of Object.entries(json)) {
                let type = CustomComponentManager.GetType(id);
                if (type == ComponentType.PlayerComponentType) {
                    let com = CustomComponentManager.CreateComponentInstance<PlayerSuperComponent,SuperEntity>(id, this);
                    for (let [key, value] of Object.entries(json)) {
                        com[key] = value;
                    }
                    if(!this.custom_component.hasOwnProperty(id)){
                        com.onStart();
                        this.custom_component[id] = com;
                    }
                }
            }
        }
    }
    addCustomComponent(identifier: string,options?):boolean {
        let type=CustomComponentManager.GetType(identifier);
        if (type!=ComponentType.PlayerComponentType) {
            throw new Error(`Attempting to add ${enumKeyToString(ComponentType,ComponentType.PlayerComponentType)} components to player components`);
        }
        let com=CustomComponentManager.CreateComponentInstance<PlayerSuperComponent,SuperEntity>(identifier,this);
        if (!this.custom_component.hasOwnProperty(identifier)) {
            com.onStart();
            this.custom_component[identifier]=com;
            this.saveCustomComponent();
            return true
        }
        return false
    }

    @registerAsSubscribable
    onItemStopUseOnAfterEvent(event: mc.ItemStopUseOnAfterEvent) {
    }

    @registerAsSubscribable
    onItemStartUseAfterEvent(event: mc.ItemStartUseAfterEvent) {
    }

    @registerAsSubscribable
    onItemReleaseAfterEvent(event: mc.ItemReleaseUseAfterEvent) {
    }

    @registerAsSubscribable
    onItemCompleteAfterEvent(event: mc.ItemCompleteUseEvent) {
    }

    @registerAsSubscribable
    onItemUseOnAfterEvent(event: mc.ItemUseOnAfterEvent) {
    }

    @registerAsSubscribable
    onItemUseAfterEvent(event: mc.ItemUseAfterEvent) {
    }

    @registerAsSubscribable
    onPlayerSpawnAfterEvent(event: mc.PlayerSpawnAfterEvent) {
    }

    @registerAsSubscribable
    onPlaceBlockAfterEvent(event: mc.PlayerPlaceBlockAfterEvent) {
    }

    @registerAsSubscribable
    onLeaveAfterEvent(event: mc.PlayerLeaveAfterEvent) {
    }

    @registerAsSubscribable
    onJoinAfterEvent(event: mc.PlayerJoinAfterEvent) {
    }

    @registerAsSubscribable
    onInteractWithEntityAfterEvent(event: mc.PlayerInteractWithEntityAfterEvent) {
    }

    @registerAsSubscribable
    onInteractWithBlockAfterEvent(event: mc.PlayerInteractWithBlockAfterEvent) {
    }

    @registerAsSubscribable
    onInputPermissionCategoryChangeAfterEvent(event: mc.PlayerInputPermissionCategoryChangeAfterEvent) {
    }

    @registerAsSubscribable
    onGameModeChangeAfterEvent(event: mc.PlayerGameModeChangeAfterEvent) {
    }

    @registerAsSubscribable
    onEmoteAfterEvent(event: mc.PlayerEmoteAfterEvent) {
    }

    @registerAsSubscribable
    onDimensionChangeAfterEvent(event: mc.PlayerDimensionChangeAfterEvent) {
    }

    @registerAsSubscribable
    onBreakBlockAfterEvent(event: mc.PlayerBreakBlockAfterEvent) {
    }

    @registerAsSubscribable
    onLeaveBeforeEvent(event: mc.PlayerLeaveBeforeEvent) {
    }

    @registerAsSubscribable
    onInteractWithEntityBeforeEvent(event: mc.PlayerInteractWithEntityBeforeEvent) {
    }

    @registerAsSubscribable
    onInteractWithBlockBeforeEvent(event: mc.PlayerInteractWithBlockBeforeEvent) {
    }

    @registerAsSubscribable
    onGameModeChangeBeforeEvent(event: mc.PlayerGameModeChangeBeforeEvent) {
    }

    @registerAsSubscribable
    onItemUseOnBeforeEvent(event: mc.ItemUseOnBeforeEvent) {
    }

    @registerAsSubscribable
    onItemUseBeforeEvent(event: mc.ItemUseBeforeEvent) {
    }

    @registerAsSubscribable
    onChatSendBeforeEvent(event: mc.ChatSendBeforeEvent) {
    }

    @registerAsSubscribable
    onPlaceBeforeEvent(event: mc.PlayerPlaceBlockBeforeEvent) {
    }

    @registerAsSubscribable
    onBreakBlockBeforeEvent(event: mc.PlayerBreakBlockBeforeEvent) {
    }

    addExperience(amount: number): number {
        return this.source_instance.addExperience(amount);
    };
    /**
    * @remarks
    * Adds/removes level to/from the Player and returns the
    * current level of the Player.
    *
    * This function can't be called in read-only mode.
    *
    * @param amount
    * Amount to add to the player. Min/max bounds at -2^24 ~ 2^24
    * @returns
    * Returns the current level of the Player.
    * @throws This function can throw errors.
    */
    addLevels(amount: number): number {
        return this.source_instance.addLevels(amount);
    };
    /**
    * @beta
    * @remarks
    * Eats an item, providing the item's hunger and saturation
    * effects to the player. Can only be used on food items.
    *
    * This function can't be called in read-only mode.
    *
    * @param itemStack
    * The item to eat.
    * @throws
    * Throws if the item is not a food item.
    */
    eatItem(itemStack: mc.ItemStack): void {
        return this.source_instance.eatItem(itemStack);
    };
    /**
    * @remarks
    * Retrieves the active gamemode for this player, if specified.
    *
    * @throws This function can throw errors.
    */
    getGameMode(): mc.GameMode {
        return this.source_instance.getGameMode();
    };
    /**
    * @remarks
    * Gets the current item cooldown time for a particular
    * cooldown category.
    *
    * @param cooldownCategory
    * Specifies the cooldown category to retrieve the current
    * cooldown for.
    * @throws This function can throw errors.
    */
    getItemCooldown(cooldownCategory: string): number {
        return this.source_instance.getItemCooldown(cooldownCategory);
    };
    /**
    * @remarks
    * Gets the current spawn point of the player.
    *
    * @throws This function can throw errors.
    */
    getSpawnPoint(): mc.DimensionLocation | undefined {
        return this.source_instance.getSpawnPoint();
    };
    /**
    * @remarks
    *  Gets the total experience of the Player.
    *
    * @throws This function can throw errors.
    */
    getTotalXp(): number {
        return this.source_instance.getTotalXp();
    };
    /**
    * @beta
    * @remarks
    * Returns true if this player has operator-level permissions.
    *
    * @throws This function can throw errors.
    */
    isOp(): boolean {
        return this.source_instance.isOp();
    };
    /**
    * @remarks
    * Plays a music track that only this particular player can
    * hear.
    *
    * This function can't be called in read-only mode.
    *
    * @param trackId
    * Identifier of the music track to play.
    * @param musicOptions
    * Additional options for the music track.
    * @throws This function can throw errors.
    */
    playMusic(trackId: string, musicOptions?: mc.MusicOptions): void {
        return this.source_instance.playMusic(trackId, musicOptions);
    };
    /**
    * @remarks
    * Plays a sound that only this particular player can hear.
    *
    * This function can't be called in read-only mode.
    *
    * @param soundOptions
    * Additional optional options for the sound.
    * @throws This function can throw errors.
    */
    playSound(soundId: string, soundOptions?: mc.PlayerSoundOptions): void {
        return this.source_instance.playSound(soundId, soundOptions);
    };
    /**
    * @beta
    * @remarks
    * This is an internal-facing method for posting a system
    * message to downstream clients.
    *
    * This function can't be called in read-only mode.
    *
    * @throws This function can throw errors.
    */
    postClientMessage(id: string, value: string): void {
        return this.source_instance.postClientMessage(id, value);
    };
    /**
    * @remarks
    * Queues an additional music track that only this particular
    * player can hear. If a track is not playing, a music track
    * will play.
    *
    * This function can't be called in read-only mode.
    *
    * @param trackId
    * Identifier of the music track to play.
    * @param musicOptions
    * Additional options for the music track.
    * @throws
    * An error will be thrown if volume is less than 0.0.
    * An error will be thrown if fade is less than 0.0.
    *
    */
    queueMusic(trackId: string, musicOptions?: mc.MusicOptions): void {
        return this.source_instance.queueMusic(trackId, musicOptions);
    };
    /**
    * @remarks
    * Resets the level of the player.
    *
    * This function can't be called in read-only mode.
    *
    * @throws This function can throw errors.
    */
    resetLevel(): void {
        return this.source_instance.resetLevel();
    };
    /**
    * @remarks
    * Sends a message to the player.
    *
    * @param message
    * The message to be displayed.
    * @throws
    * This method can throw if the provided {@link RawMessage} is
    * in an invalid format. For example, if an empty `name` string
    * is provided to `score`.
    * @example sendMessagesToPlayer.ts
    * ```typescript
    * import { Player } from "@minecraft/server";
    *
    * function sendPlayerMessages(player: Player) {
    *     // Displays "First or Second"
    *     const rawMessage = { translate: 'accessibility.list.or.two', with: ['First', 'Second'] };
    *     player.sendMessage(rawMessage);
    *
    *     // Displays "Hello, world!"
    *     player.sendMessage('Hello, world!');
    *
    *     // Displays "Welcome, Amazing Player 1!"
    *     player.sendMessage({ translate: 'authentication.welcome', with: ['Amazing Player 1'] });
    *
    *     // Displays the player's score for objective "obj". Each player will see their own score.
    *     const rawMessageWithScore = { score: { name: '*', objective: 'obj' } };
    *     player.sendMessage(rawMessageWithScore);
    *
    *     // Displays "Apple or Coal"
    *     const rawMessageWithNestedTranslations = {
    *         translate: 'accessibility.list.or.two',
    *         with: { rawtext: [{ translate: 'item.apple.name' }, { translate: 'item.coal.name' }] },
    *     };
    *     player.sendMessage(rawMessageWithNestedTranslations);
    * }
    * ```
    */
    sendMessage(message: (mc.RawMessage | string)[] | mc.RawMessage | string): void {
        return this.source_instance.sendMessage(message);
    };
    /**
    * @remarks
    * Sets a gamemode override for this player.
    *
    * This function can't be called in read-only mode.
    *
    * @param gameMode
    * Active gamemode.
    * @throws This function can throw errors.
    */
    setGameMode(gameMode?: mc.GameMode): void {
        return this.source_instance.setGameMode(gameMode);
    };
    /**
    * @beta
    * @remarks
    * Will change the specified players permissions, and whether
    * they are operator or not.
    *
    * This function can't be called in read-only mode.
    *
    * @throws This function can throw errors.
    */
    setOp(isOp: boolean): void {
        return this.source_instance.setOp(isOp);
    };
    /**
    * @remarks
    * Sets the current starting spawn point for this particular
    * player.
    *
    * This function can't be called in read-only mode.
    *
    * @throws This function can throw errors.
    *
    * {@link Error}
    *
    * {@link LocationOutOfWorldBoundariesError}
    */
    setSpawnPoint(spawnPoint?: mc.DimensionLocation): void {
        return this.source_instance.setSpawnPoint(spawnPoint);
    };
    /**
    * @beta
    * @remarks
    * Creates a new particle emitter at a specified location in
    * the world. Only visible to the target player.
    *
    * This function can't be called in read-only mode.
    *
    * @param effectName
    * Identifier of the particle to create.
    * @param location
    * The location at which to create the particle emitter.
    * @param molangVariables
    * A set of optional, customizable variables that can be
    * adjusted for this particle.
    * @throws This function can throw errors.
    *
    * {@link Error}
    *
    * {@link LocationInUnloadedChunkError}
    *
    * {@link LocationOutOfWorldBoundariesError}
    * @example spawnParticle.ts
    * ```typescript
    * import { world, MolangVariableMap, Vector3 } from '@minecraft/server';
    *
    * world.afterEvents.playerSpawn.subscribe(event => {
    *     const targetLocation = event.player.location;
    *     for (let i = 0; i < 100; i++) {
    *         const molang = new MolangVariableMap();
    *
    *         molang.setColorRGB('variable.color', {
    *             red: Math.random(),
    *             green: Math.random(),
    *             blue: Math.random()
    *         });
    *
    *         const newLocation: Vector3 = {
    *             x: targetLocation.x + Math.floor(Math.random() * 8) - 4,
    *             y: targetLocation.y + Math.floor(Math.random() * 8) - 4,
    *             z: targetLocation.z + Math.floor(Math.random() * 8) - 4,
    *         };
    *         event.player.spawnParticle('minecraft:colored_flame_particle', newLocation, molang);
    *     }
    * });
    * ```
    */
    spawnParticle(effectName: string, location: mc.Vector3, molangVariables?: mc.MolangVariableMap): void {
        return this.source_instance.spawnParticle(effectName, location, molangVariables);
    };
    /**
    * @remarks
    * Sets the item cooldown time for a particular cooldown
    * category.
    *
    * This function can't be called in read-only mode.
    *
    * @param cooldownCategory
    * Specifies the cooldown category to retrieve the current
    * cooldown for.
    * @param tickDuration
    * Duration in ticks of the item cooldown.
    * @throws This function can throw errors.
    */
    startItemCooldown(cooldownCategory: string, tickDuration: number): void {
        return this.source_instance.startItemCooldown(cooldownCategory, tickDuration);
    };
    /**
    * @remarks
    * Stops any music tracks from playing for this particular
    * player.
    *
    * This function can't be called in read-only mode.
    *
    * @throws This function can throw errors.
    */
    stopMusic(): void {
        return this.source_instance.stopMusic();
    };
}