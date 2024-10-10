import { Player } from "@minecraft/server";
import { ClassManager, NativeClassType } from "../Runtime";
import { Super } from "../Super/Super";
export class SuperWorld extends Super {
    constructor(source_instance) {
        super();
        this.source_instance = source_instance;
        this.afterEvents = source_instance.afterEvents;
        this.beforeEvents = source_instance.beforeEvents;
        this.gameRules = source_instance.gameRules;
        this.isHardcore = source_instance.isHardcore;
        this.scoreboard = source_instance.scoreboard;
        this.structureManager = source_instance.structureManager;
    }
    ;
    toSuperEntitys(entitys) {
        let mentitys = [];
        for (let entity of entitys) {
            let newentity = new (ClassManager.getClass(NativeClassType.Entity))(entity);
            mentitys.push(newentity);
        }
        return mentitys;
    }
    toSuperPlayers(players) {
        let mplayers = [];
        for (let player of players) {
            let newplayer = new (ClassManager.getClass(NativeClassType.Player))(player);
            mplayers.push(newplayer);
        }
        return mplayers;
    }
    getAllEntitys() {
        return SuperWorld.Entitys;
    }
    onWorldInitializeBefore(event) {
    }
    onWorldInitializeAfter(event) {
    }
    /**
     * @beta
     * @remarks
     * A method that is internal-only, used for broadcasting
     * specific messages between client and server.
     *
     * This function can't be called in read-only mode.
     *
     * @param id
     * The message identifier.
     * @param value
     * The message.
     */
    broadcastClientMessage(id, value) {
        return this.source_instance.broadcastClientMessage(id, value);
    }
    ;
    /**
     * @remarks
     * Clears the set of dynamic properties declared for this
     * behavior pack within the world.
     *
     */
    clearDynamicProperties() {
        return this.source_instance.clearDynamicProperties();
    }
    ;
    /**
     * @remarks
     * Returns the absolute time since the start of the world.
     *
     */
    getAbsoluteTime() {
        return this.source_instance.getAbsoluteTime();
    }
    ;
    /**
     * @remarks
     * Returns an array of all active players within the world.
     *
     * @throws This function can throw errors.
     */
    getAllPlayers() {
        return SuperWorld.Players;
    }
    ;
    /**
     * @remarks
     * Returns the current day.
     *
     * @returns
     * The current day, determined by the world time divided by the
     * number of ticks per day. New worlds start at day 0.
     */
    getDay() {
        return this.source_instance.getDay();
    }
    ;
    /**
     * @remarks
     * Returns the default Overworld spawn location.
     *
     * @returns
     * The default Overworld spawn location. By default, the Y
     * coordinate is 32767, indicating a player's spawn height is
     * not fixed and will be determined by surrounding blocks.
     */
    getDefaultSpawnLocation() {
        return this.source_instance.getDefaultSpawnLocation();
    }
    ;
    /**
     * @remarks
     * Returns a dimension object.
     *
     * @param dimensionId
     * The name of the dimension. For example, "overworld",
     * "nether" or "the_end".
     * @returns
     * The requested dimension
     * @throws
     * Throws if the given dimension name is invalid
     */
    getDimension(dimensionId) {
        return this.source_instance.getDimension(dimensionId);
    }
    ;
    /**
     * @remarks
     * Returns a property value.
     *
     * @param identifier
     * The property identifier.
     * @returns
     * Returns the value for the property, or undefined if the
     * property has not been set.
     * @throws
     * Throws if the given dynamic property identifier is not
     * defined.
     * @example incrementDynamicProperty.ts
     * ```typescript
     * import * as mc from '@minecraft/server';
     *
     * function incrementProperty(propertyName: string): boolean {
     *     let number = mc.world.getDynamicProperty(propertyName);
     *
     *     console.warn('Current value is: ' + number);
     *
     *     if (number === undefined) {
     *         number = 0;
     *     }
     *
     *     if (typeof number !== 'number') {
     *         console.warn('Number is of an unexpected type.');
     *         return false;
     *     }
     *
     *     mc.world.setDynamicProperty(propertyName, number + 1);
     *     return true;
     * }
     *
     * incrementProperty('samplelibrary:number');
     * ```
     * @example incrementDynamicPropertyInJsonBlob.ts
     * ```typescript
     * import * as mc from '@minecraft/server';
     *
     * function updateWorldProperty(propertyName: string): boolean {
     *     let paintStr = mc.world.getDynamicProperty(propertyName);
     *     let paint: { color: string; intensity: number } | undefined = undefined;
     *
     *     console.log('Current value is: ' + paintStr);
     *
     *     if (paintStr === undefined) {
     *         paint = {
     *             color: 'purple',
     *             intensity: 0,
     *         };
     *     } else {
     *         if (typeof paintStr !== 'string') {
     *             console.warn('Paint is of an unexpected type.');
     *             return false;
     *         }
     *
     *         try {
     *             paint = JSON.parse(paintStr);
     *         } catch (e) {
     *             console.warn('Error parsing serialized struct.');
     *             return false;
     *         }
     *     }
     *
     *     if (!paint) {
     *         console.warn('Error parsing serialized struct.');
     *         return false;
     *     }
     *
     *     paint.intensity++;
     *     paintStr = JSON.stringify(paint); // be very careful to ensure your serialized JSON str cannot exceed limits
     *     mc.world.setDynamicProperty(propertyName, paintStr);
     *
     *     return true;
     * }
     *
     * updateWorldProperty('samplelibrary:longerjson');
     * ```
     */
    getDynamicProperty(identifier) {
        return this.source_instance.getDynamicProperty(identifier);
    }
    ;
    /**
     * @remarks
     * Gets a set of dynamic property identifiers that have been
     * set in this world.
     *
     * @returns
     * A string array of active dynamic property identifiers.
     */
    getDynamicPropertyIds() {
        return this.source_instance.getDynamicPropertyIds();
    }
    ;
    /**
     * @remarks
     * Gets the total byte count of dynamic properties. This could
     * potentially be used for your own analytics to ensure you're
     * not storing gigantic sets of dynamic properties.
     *
     */
    getDynamicPropertyTotalByteCount() {
        return this.source_instance.getDynamicPropertyTotalByteCount();
    }
    ;
    /**
     * @remarks
     * Returns an entity based on the provided id.
     *
     * @param id
     * The id of the entity.
     * @returns
     * The requested entity object.
     * @throws
     * Throws if the given entity id is invalid.
     */
    getEntity(id) {
        let entity = this.source_instance.getEntity(id);
        if (!entity) {
            return undefined;
        }
        if (entity instanceof Player) {
            let sp_player = SuperWorld.Players.find((e) => {
                return id = entity.id;
            });
            return sp_player;
        }
        let sp_entity = SuperWorld.Entitys.find((e) => {
            return id = entity.id;
        });
        return sp_entity;
    }
    ;
    /**
     * @remarks
     * Returns the MoonPhase for the current time.
     *
     */
    getMoonPhase() {
        return this.source_instance.getMoonPhase();
    }
    ;
    /**
     * @remarks
     * Returns a set of players based on a set of conditions
     * defined via the EntityQueryOptions set of filter criteria.
     *
     * @param options
     * Additional options that can be used to filter the set of
     * players returned.
     * @returns
     * A player array.
     * @throws
     * Throws if the provided EntityQueryOptions are invalid.
     */
    getPlayers(options) {
        let players = SuperWorld.Players.filter((sp) => {
            const player = this.source_instance.getPlayers(options);
            let found = player.find((p) => {
                return sp.name == p.name;
            });
            return found != undefined;
        });
        return players;
    }
    ;
    /**
     * @remarks
     * Returns the time of day.
     *
     * @returns
     * The time of day, in ticks, between 0 and 24000.
     */
    getTimeOfDay() {
        return this.source_instance.getTimeOfDay();
    }
    ;
    /**
     * @remarks
     * Plays a particular music track for all players.
     *
     * This function can't be called in read-only mode.
     *
     * @throws This function can throw errors.
     * @example playMusicAndSound.ts
     * ```typescript
     * import { world, MusicOptions, WorldSoundOptions, PlayerSoundOptions, Vector3 } from '@minecraft/server';
     * import { MinecraftDimensionTypes } from '@minecraft/vanilla-data';
     *
     * const players = world.getPlayers();
     * const targetLocation: Vector3 = {
     *     x: 0,
     *     y: 0,
     *     z: 0,
     * };
     *
     * const musicOptions: MusicOptions = {
     *     fade: 0.5,
     *     loop: true,
     *     volume: 1.0,
     * };
     * world.playMusic('music.menu', musicOptions);
     *
     * const worldSoundOptions: WorldSoundOptions = {
     *     pitch: 0.5,
     *     volume: 4.0,
     * };
     * const overworld = world.getDimension(MinecraftDimensionTypes.Overworld);
     * overworld.playSound('ambient.weather.thunder', targetLocation, worldSoundOptions);
     *
     * const playerSoundOptions: PlayerSoundOptions = {
     *     pitch: 1.0,
     *     volume: 1.0,
     * };
     *
     * players[0].playSound('bucket.fill_water', playerSoundOptions);
     * ```
     */
    playMusic(trackId, musicOptions) {
        return this.source_instance.playMusic(trackId, musicOptions);
    }
    ;
    /**
     * @remarks
     * Plays a sound for all players. DEPRECATED: Use
     * Dimension.playSound.
     *
     * This function can't be called in read-only mode.
     *
     * @throws
     * An error will be thrown if volume is less than 0.0.
     * An error will be thrown if fade is less than 0.0.
     * An error will be thrown if pitch is less than 0.01.
     * An error will be thrown if volume is less than 0.0.
     * @example playMusicAndSound.ts
     * ```typescript
     * import { world, MusicOptions, WorldSoundOptions, PlayerSoundOptions, Vector3 } from '@minecraft/server';
     * import { MinecraftDimensionTypes } from '@minecraft/vanilla-data';
     *
     * const players = world.getPlayers();
     * const targetLocation: Vector3 = {
     *     x: 0,
     *     y: 0,
     *     z: 0,
     * };
     *
     * const musicOptions: MusicOptions = {
     *     fade: 0.5,
     *     loop: true,
     *     volume: 1.0,
     * };
     * world.playMusic('music.menu', musicOptions);
     *
     * const worldSoundOptions: WorldSoundOptions = {
     *     pitch: 0.5,
     *     volume: 4.0,
     * };
     * const overworld = world.getDimension(MinecraftDimensionTypes.Overworld);
     * overworld.playSound('ambient.weather.thunder', targetLocation, worldSoundOptions);
     *
     * const playerSoundOptions: PlayerSoundOptions = {
     *     pitch: 1.0,
     *     volume: 1.0,
     * };
     *
     * players[0].playSound('bucket.fill_water', playerSoundOptions);
     * ```
     */
    playSound(soundId, location, soundOptions) {
        return this.source_instance.playSound(soundId, location, soundOptions);
    }
    ;
    /**
     * @remarks
     * Queues an additional music track for players. If a track is
     * not playing, a music track will play.
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
     * Sends a message to all players.
     *
     * @param message
     * The message to be displayed.
     * @throws
     * This method can throw if the provided {@link RawMessage} is
     * in an invalid format. For example, if an empty `name` string
     * is provided to `score`.
     * @example nestedTranslation.ts
     * ```typescript
     * import { world } from '@minecraft/server';
     *
     * // Displays "Apple or Coal"
     * const rawMessage = {
     *     translate: 'accessibility.list.or.two',
     *     with: { rawtext: [{ translate: 'item.apple.name' }, { translate: 'item.coal.name' }] },
     * };
     * world.sendMessage(rawMessage);
     * ```
     * @example scoreWildcard.ts
     * ```typescript
     * import { world } from '@minecraft/server';
     *
     * // Displays the player's score for objective "obj". Each player will see their own score.
     * const rawMessage = { score: { name: '*', objective: 'obj' } };
     * world.sendMessage(rawMessage);
     * ```
     * @example simpleString.ts
     * ```typescript
     * import { world } from '@minecraft/server';
     *
     * // Displays "Hello, world!"
     * world.sendMessage('Hello, world!');
     * ```
     * @example translation.ts
     * ```typescript
     * import { world } from '@minecraft/server';
     *
     * // Displays "First or Second"
     * const rawMessage = { translate: 'accessibility.list.or.two', with: ['First', 'Second'] };
     * world.sendMessage(rawMessage);
     * ```
     */
    sendMessage(message) {
        return this.source_instance.sendMessage(message);
    }
    ;
    /**
     * @remarks
     * Sets the world time.
     *
     * This function can't be called in read-only mode.
     *
     * @param absoluteTime
     * The world time, in ticks.
     */
    setAbsoluteTime(absoluteTime) {
        return this.source_instance.setAbsoluteTime(absoluteTime);
    }
    ;
    /**
     * @remarks
     * Sets a default spawn location for all players.
     *
     * This function can't be called in read-only mode.
     *
     * @param spawnLocation
     * Location of the spawn point. Note that this is assumed to be
     * within the overworld dimension.
     * @throws
     * Throws if the provided spawn location is out of bounds.
     *
     * {@link Error}
     *
     * {@link LocationOutOfWorldBoundariesError}
     */
    setDefaultSpawnLocation(spawnLocation) {
        return this.source_instance.setDefaultSpawnLocation(spawnLocation);
    }
    ;
    /**
     * @remarks
     * Sets a specified property to a value.
     *
     * @param identifier
     * The property identifier.
     * @param value
     * Data value of the property to set.
     * @throws
     * Throws if the given dynamic property identifier is not
     * defined.
     * @example incrementDynamicProperty.ts
     * ```typescript
     * import * as mc from '@minecraft/server';
     *
     * function incrementProperty(propertyName: string): boolean {
     *     let number = mc.world.getDynamicProperty(propertyName);
     *
     *     console.warn('Current value is: ' + number);
     *
     *     if (number === undefined) {
     *         number = 0;
     *     }
     *
     *     if (typeof number !== 'number') {
     *         console.warn('Number is of an unexpected type.');
     *         return false;
     *     }
     *
     *     mc.world.setDynamicProperty(propertyName, number + 1);
     *     return true;
     * }
     *
     * incrementProperty('samplelibrary:number');
     * ```
     * @example incrementDynamicPropertyInJsonBlob.ts
     * ```typescript
     * import * as mc from '@minecraft/server';
     *
     * function updateWorldProperty(propertyName: string): boolean {
     *     let paintStr = mc.world.getDynamicProperty(propertyName);
     *     let paint: { color: string; intensity: number } | undefined = undefined;
     *
     *     console.log('Current value is: ' + paintStr);
     *
     *     if (paintStr === undefined) {
     *         paint = {
     *             color: 'purple',
     *             intensity: 0,
     *         };
     *     } else {
     *         if (typeof paintStr !== 'string') {
     *             console.warn('Paint is of an unexpected type.');
     *             return false;
     *         }
     *
     *         try {
     *             paint = JSON.parse(paintStr);
     *         } catch (e) {
     *             console.warn('Error parsing serialized struct.');
     *             return false;
     *         }
     *     }
     *
     *     if (!paint) {
     *         console.warn('Error parsing serialized struct.');
     *         return false;
     *     }
     *
     *     paint.intensity++;
     *     paintStr = JSON.stringify(paint); // be very careful to ensure your serialized JSON str cannot exceed limits
     *     mc.world.setDynamicProperty(propertyName, paintStr);
     *
     *     return true;
     * }
     *
     * updateWorldProperty('samplelibrary:longerjson');
     * ```
     */
    setDynamicProperty(identifier, value) {
        return this.source_instance.setDynamicProperty(identifier, value);
    }
    ;
    /**
     * @remarks
     * Sets the time of day.
     *
     * This function can't be called in read-only mode.
     *
     * @param timeOfDay
     * The time of day, in ticks, between 0 and 24000.
     * @throws
     * Throws if the provided time of day is not within the valid
     * range.
     */
    setTimeOfDay(timeOfDay) {
        return this.source_instance.setTimeOfDay(timeOfDay);
    }
    ;
    /**
     * @remarks
     * Stops any music tracks from playing.
     *
     * This function can't be called in read-only mode.
     *
     */
    stopMusic() {
        return this.source_instance.stopMusic();
    }
    ;
}
SuperWorld.Entitys = [];
SuperWorld.Players = [];
