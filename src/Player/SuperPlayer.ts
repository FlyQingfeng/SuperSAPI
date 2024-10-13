import { Player, Camera, PlayerInputPermissions, ScreenDisplay, ItemStack, GameMode, DimensionLocation, MusicOptions, PlayerSoundOptions, RawMessage, Vector3, MolangVariableMap, WorldBeforeEvents, WorldAfterEvents, PlayerBreakBlockBeforeEvent, PlayerPlaceBlockAfterEvent, PlayerBreakBlockAfterEvent, PlayerPlaceBlockBeforeEvent, ChatSendBeforeEvent, ItemCompleteUseEvent, ItemReleaseUseAfterEvent, ItemStartUseAfterEvent, ItemStopUseOnAfterEvent, ItemUseAfterEvent, ItemUseBeforeEvent, ItemUseOnAfterEvent, ItemUseOnBeforeEvent, PlayerDimensionChangeAfterEvent, PlayerEmoteAfterEvent, PlayerGameModeChangeAfterEvent, PlayerGameModeChangeBeforeEvent, PlayerInputPermissionCategoryChangeAfterEvent, PlayerInteractWithBlockAfterEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityAfterEvent, PlayerInteractWithEntityBeforeEvent, PlayerJoinAfterEvent, PlayerLeaveAfterEvent, PlayerLeaveBeforeEvent, PlayerSpawnAfterEvent, EntityComponentTypes, Container, EntityInventoryComponent, EquipmentSlot, EntityEquippableComponent } from "@minecraft/server";
import { SuperEntity } from "../Entity/SuperEntity";
import { registerAsSubscribable, Super } from "../Super/Super";
import { ComponentType, CustomComponentManager } from "../Component/CustomComponentManager";
import { enumKeyToString } from "../Public/stdlib";
import { PlayerSuperComponent } from "../Component/SuperPlayerComponent";
import { SuperWorld } from "../World/SuperWorld";
import { SuperItemStack } from "Item/SuperItemStack";

export class SuperPlayer extends SuperEntity {
    source_instance: Player;
    constructor(source_instance: Player,world:SuperWorld) {
        super(source_instance,world)
        this.source_instance = source_instance;
        this.camera = source_instance.camera;
        this.inputPermissions = source_instance.inputPermissions;
        this.isEmoting = source_instance.isEmoting;
        this.isFlying = source_instance.isFlying;
        this.isGliding = source_instance.isGliding;
        this.isJumping = source_instance.isJumping;
        this.level = source_instance.level;
        this.name = source_instance.name;
        this.onScreenDisplay = source_instance.onScreenDisplay;
        this.selectedSlotIndex = source_instance.selectedSlotIndex;
        this.totalXpNeededForNextLevel = source_instance.totalXpNeededForNextLevel;
        this.xpEarnedAtCurrentLevel = source_instance.xpEarnedAtCurrentLevel;
    };
    getInventory():EntityInventoryComponent{
        return this.getComponent(EntityComponentTypes.Inventory)
    }
    getInventoryContainer():Container{
        return this.getInventory().container
    }
    getEquipment():EntityEquippableComponent{
        return this.getComponent(EntityComponentTypes.Equippable)
    }
    getHandItem():ItemStack|undefined{
        let item=this.getInventoryContainer().getItem(this.selectedSlotIndex)
        return item
    }
    setHandItem(item:SuperItemStack){
        this.getInventoryContainer().setItem(this.selectedSlotIndex,item.getItem());
    }
    giveItem(item:SuperItemStack){
        let container=this.getComponent(EntityComponentTypes.Inventory).container
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
    onItemStopUseOnAfterEvent(event: ItemStopUseOnAfterEvent) {
    }

    @registerAsSubscribable
    onItemStartUseAfterEvent(event: ItemStartUseAfterEvent) {
    }

    @registerAsSubscribable
    onItemReleaseAfterEvent(event: ItemReleaseUseAfterEvent) {
    }

    @registerAsSubscribable
    onItemCompleteAfterEvent(event: ItemCompleteUseEvent) {
    }

    @registerAsSubscribable
    onItemUseOnAfterEvent(event: ItemUseOnAfterEvent) {
    }

    @registerAsSubscribable
    onItemUseAfterEvent(event: ItemUseAfterEvent) {
    }

    @registerAsSubscribable
    onPlayerSpawnAfterEvent(event: PlayerSpawnAfterEvent) {
    }

    @registerAsSubscribable
    onPlaceBlockAfterEvent(event: PlayerPlaceBlockAfterEvent) {
    }

    @registerAsSubscribable
    onLeaveAfterEvent(event: PlayerLeaveAfterEvent) {
    }

    @registerAsSubscribable
    onJoinAfterEvent(event: PlayerJoinAfterEvent) {
    }

    @registerAsSubscribable
    onInteractWithEntityAfterEvent(event: PlayerInteractWithEntityAfterEvent) {
    }

    @registerAsSubscribable
    onInteractWithBlockAfterEvent(event: PlayerInteractWithBlockAfterEvent) {
    }

    @registerAsSubscribable
    onInputPermissionCategoryChangeAfterEvent(event: PlayerInputPermissionCategoryChangeAfterEvent) {
    }

    @registerAsSubscribable
    onGameModeChangeAfterEvent(event: PlayerGameModeChangeAfterEvent) {
    }

    @registerAsSubscribable
    onEmoteAfterEvent(event: PlayerEmoteAfterEvent) {
    }

    @registerAsSubscribable
    onDimensionChangeAfterEvent(event: PlayerDimensionChangeAfterEvent) {
    }

    @registerAsSubscribable
    onBreakBlockAfterEvent(event: PlayerBreakBlockAfterEvent) {
    }

    @registerAsSubscribable
    onLeaveBeforeEvent(event: PlayerLeaveBeforeEvent) {
    }

    @registerAsSubscribable
    onInteractWithEntityBeforeEvent(event: PlayerInteractWithEntityBeforeEvent) {
    }

    @registerAsSubscribable
    onInteractWithBlockBeforeEvent(event: PlayerInteractWithBlockBeforeEvent) {
    }

    @registerAsSubscribable
    onGameModeChangeBeforeEvent(event: PlayerGameModeChangeBeforeEvent) {
    }

    @registerAsSubscribable
    onItemUseOnBeforeEvent(event: ItemUseOnBeforeEvent) {
    }

    @registerAsSubscribable
    onItemUseBeforeEvent(event: ItemUseBeforeEvent) {
    }

    @registerAsSubscribable
    onChatSendBeforeEvent(event: ChatSendBeforeEvent) {
    }

    @registerAsSubscribable
    onPlaceBeforeEvent(event: PlayerPlaceBlockBeforeEvent) {
    }

    @registerAsSubscribable
    onBreakBlockBeforeEvent(event: PlayerBreakBlockBeforeEvent) {
    }
    /**
    * @remarks
    * The player's Camera.
    *
    * @throws This property can throw when used.
    */
    readonly camera: Camera;
    /**
    * @remarks
    * Input permissions of the player.
    *
    */
    readonly inputPermissions: PlayerInputPermissions;
    /**
    * @remarks
    * If true, the player is currently emoting.
    *
    * @throws This property can throw when used.
    */
    readonly isEmoting: boolean;
    /**
    * @remarks
    * Whether the player is flying. For example, in Creative or
    * Spectator mode.
    *
    * @throws This property can throw when used.
    */
    readonly isFlying: boolean;
    /**
    * @remarks
    * Whether the player is gliding with Elytra.
    *
    * @throws This property can throw when used.
    */
    readonly isGliding: boolean;
    /**
    * @remarks
    * Whether the player is jumping. This will remain true while
    * the player is holding the jump action.
    *
    * @throws This property can throw when used.
    */
    readonly isJumping: boolean;
    /**
    * @remarks
    * The current overall level for the player, based on their
    * experience.
    *
    * @throws This property can throw when used.
    */
    readonly level: number;
    /**
    * @remarks
    * Name of the player.
    *
    * @throws This property can throw when used.
    */
    readonly name: string;
    /**
    * @remarks
    * Contains methods for manipulating the on-screen display of a
    * Player.
    *
    * @throws This property can throw when used.
    */
    readonly onScreenDisplay: ScreenDisplay;
    /**
    * @remarks
    * This property can't be edited in read-only mode.
    *
    */
    selectedSlotIndex: number;
    /**
    * @remarks
    * The overall total set of experience needed to achieve the
    * next level for a player.
    *
    * @throws This property can throw when used.
    */
    readonly totalXpNeededForNextLevel: number;
    /**
    * @remarks
    * The current set of experience achieved for the player.
    *
    * @throws This property can throw when used.
    */
    readonly xpEarnedAtCurrentLevel: number;
    /**
    * @remarks
    * Adds/removes experience to/from the Player and returns the
    * current experience of the Player.
    *
    * This function can't be called in read-only mode.
    *
    * @param amount
    * Amount of experience to add. Note that this can be negative.
    * Min/max bounds at -2^24 ~ 2^24
    * @returns
    * Returns the current experience of the Player.
    * @throws This function can throw errors.
    */
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
    eatItem(itemStack: ItemStack): void {
        return this.source_instance.eatItem(itemStack);
    };
    /**
    * @remarks
    * Retrieves the active gamemode for this player, if specified.
    *
    * @throws This function can throw errors.
    */
    getGameMode(): GameMode {
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
    getSpawnPoint(): DimensionLocation | undefined {
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
    playMusic(trackId: string, musicOptions?: MusicOptions): void {
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
    playSound(soundId: string, soundOptions?: PlayerSoundOptions): void {
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
    queueMusic(trackId: string, musicOptions?: MusicOptions): void {
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
    sendMessage(message: (RawMessage | string)[] | RawMessage | string): void {
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
    setGameMode(gameMode?: GameMode): void {
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
    setSpawnPoint(spawnPoint?: DimensionLocation): void {
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
    spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void {
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