var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EntityComponentTypes } from "@minecraft/server";
import { SuperEntity } from "../Entity/SuperEntity";
import { registerAsSubscribable } from "../Super/Super";
import { ComponentType, CustomComponentManager } from "../Component/CustomComponentManager";
import { enumKeyToString } from "../Public/stdlib";
export class SuperPlayer extends SuperEntity {
    constructor(source_instance, world) {
        super(source_instance, world);
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
    }
    ;
    getInventory() {
        return this.getComponent(EntityComponentTypes.Inventory);
    }
    getInventoryContainer() {
        return this.getInventory().container;
    }
    getEquipment() {
        return this.getComponent(EntityComponentTypes.Equippable);
    }
    getHandItem() {
        let item = this.getInventoryContainer().getItem(this.selectedSlotIndex);
        return item;
    }
    setHandItem(item) {
        this.getInventoryContainer().setItem(this.selectedSlotIndex, item.getItem());
    }
    giveItem(item) {
        let container = this.getComponent(EntityComponentTypes.Inventory).container;
        container.addItem(item.getItem());
    }
    readCustomComponent() {
        super.readCustomComponent();
        let data = this.getDynamicProperty("CustomComponent");
        if (data) {
            let json = JSON.parse(data);
            for (let [id, cm_data] of Object.entries(json)) {
                let type = CustomComponentManager.GetType(id);
                if (type == ComponentType.PlayerComponentType) {
                    let com = CustomComponentManager.CreateComponentInstance(id, this);
                    for (let [key, value] of Object.entries(json)) {
                        com[key] = value;
                    }
                    if (!this.custom_component.hasOwnProperty(id)) {
                        com.onStart();
                        this.custom_component[id] = com;
                    }
                }
            }
        }
    }
    addCustomComponent(identifier, options) {
        let type = CustomComponentManager.GetType(identifier);
        if (type != ComponentType.PlayerComponentType) {
            throw new Error(`Attempting to add ${enumKeyToString(ComponentType, ComponentType.PlayerComponentType)} components to player components`);
        }
        let com = CustomComponentManager.CreateComponentInstance(identifier, this);
        if (!this.custom_component.hasOwnProperty(identifier)) {
            com.onStart();
            this.custom_component[identifier] = com;
            this.saveCustomComponent();
            return true;
        }
        return false;
    }
    onItemStopUseOnAfterEvent(event) {
    }
    onItemStartUseAfterEvent(event) {
    }
    onItemReleaseAfterEvent(event) {
    }
    onItemCompleteAfterEvent(event) {
    }
    onItemUseOnAfterEvent(event) {
    }
    onItemUseAfterEvent(event) {
    }
    onPlayerSpawnAfterEvent(event) {
    }
    onPlaceBlockAfterEvent(event) {
    }
    onLeaveAfterEvent(event) {
    }
    onJoinAfterEvent(event) {
    }
    onInteractWithEntityAfterEvent(event) {
    }
    onInteractWithBlockAfterEvent(event) {
    }
    onInputPermissionCategoryChangeAfterEvent(event) {
    }
    onGameModeChangeAfterEvent(event) {
    }
    onEmoteAfterEvent(event) {
    }
    onDimensionChangeAfterEvent(event) {
    }
    onBreakBlockAfterEvent(event) {
    }
    onLeaveBeforeEvent(event) {
    }
    onInteractWithEntityBeforeEvent(event) {
    }
    onInteractWithBlockBeforeEvent(event) {
    }
    onGameModeChangeBeforeEvent(event) {
    }
    onItemUseOnBeforeEvent(event) {
    }
    onItemUseBeforeEvent(event) {
    }
    onChatSendBeforeEvent(event) {
    }
    onPlaceBeforeEvent(event) {
    }
    onBreakBlockBeforeEvent(event) {
    }
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
    addExperience(amount) {
        return this.source_instance.addExperience(amount);
    }
    ;
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
    addLevels(amount) {
        return this.source_instance.addLevels(amount);
    }
    ;
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
    eatItem(itemStack) {
        return this.source_instance.eatItem(itemStack);
    }
    ;
    /**
    * @remarks
    * Retrieves the active gamemode for this player, if specified.
    *
    * @throws This function can throw errors.
    */
    getGameMode() {
        return this.source_instance.getGameMode();
    }
    ;
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
    getItemCooldown(cooldownCategory) {
        return this.source_instance.getItemCooldown(cooldownCategory);
    }
    ;
    /**
    * @remarks
    * Gets the current spawn point of the player.
    *
    * @throws This function can throw errors.
    */
    getSpawnPoint() {
        return this.source_instance.getSpawnPoint();
    }
    ;
    /**
    * @remarks
    *  Gets the total experience of the Player.
    *
    * @throws This function can throw errors.
    */
    getTotalXp() {
        return this.source_instance.getTotalXp();
    }
    ;
    /**
    * @beta
    * @remarks
    * Returns true if this player has operator-level permissions.
    *
    * @throws This function can throw errors.
    */
    isOp() {
        return this.source_instance.isOp();
    }
    ;
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
    playMusic(trackId, musicOptions) {
        return this.source_instance.playMusic(trackId, musicOptions);
    }
    ;
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
    playSound(soundId, soundOptions) {
        return this.source_instance.playSound(soundId, soundOptions);
    }
    ;
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
    postClientMessage(id, value) {
        return this.source_instance.postClientMessage(id, value);
    }
    ;
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
    queueMusic(trackId, musicOptions) {
        return this.source_instance.queueMusic(trackId, musicOptions);
    }
    ;
    /**
    * @remarks
    * Resets the level of the player.
    *
    * This function can't be called in read-only mode.
    *
    * @throws This function can throw errors.
    */
    resetLevel() {
        return this.source_instance.resetLevel();
    }
    ;
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
    sendMessage(message) {
        return this.source_instance.sendMessage(message);
    }
    ;
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
    setGameMode(gameMode) {
        return this.source_instance.setGameMode(gameMode);
    }
    ;
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
    setOp(isOp) {
        return this.source_instance.setOp(isOp);
    }
    ;
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
    setSpawnPoint(spawnPoint) {
        return this.source_instance.setSpawnPoint(spawnPoint);
    }
    ;
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
    spawnParticle(effectName, location, molangVariables) {
        return this.source_instance.spawnParticle(effectName, location, molangVariables);
    }
    ;
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
    startItemCooldown(cooldownCategory, tickDuration) {
        return this.source_instance.startItemCooldown(cooldownCategory, tickDuration);
    }
    ;
    /**
    * @remarks
    * Stops any music tracks from playing for this particular
    * player.
    *
    * This function can't be called in read-only mode.
    *
    * @throws This function can throw errors.
    */
    stopMusic() {
        return this.source_instance.stopMusic();
    }
    ;
}
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemStopUseOnAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemStartUseAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemReleaseAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemCompleteAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemUseOnAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemUseAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onPlayerSpawnAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onPlaceBlockAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onLeaveAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onJoinAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onInteractWithEntityAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onInteractWithBlockAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onInputPermissionCategoryChangeAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onGameModeChangeAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onEmoteAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onDimensionChangeAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onBreakBlockAfterEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onLeaveBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onInteractWithEntityBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onInteractWithBlockBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onGameModeChangeBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemUseOnBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onItemUseBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onChatSendBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onPlaceBeforeEvent", null);
__decorate([
    registerAsSubscribable
], SuperPlayer.prototype, "onBreakBlockBeforeEvent", null);
