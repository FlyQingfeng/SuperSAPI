import { Entity, Dimension, ScoreboardIdentity, EffectType, EntityEffectOptions, Effect, EntityApplyDamageByProjectileOptions, EntityApplyDamageOptions, BlockRaycastOptions, BlockRaycastHit, EntityComponentTypeMap, EntityComponent, EntityRaycastOptions, EntityRaycastHit, Vector2, EntityQueryOptions, PlayAnimationOptions, CommandResult, TeleportOptions, Vector3, WorldInitializeBeforeEvent, WorldInitializeAfterEvent, EntityDieAfterEvent, EntityHealthChangedAfterEvent, EntityHitBlockAfterEvent, EntityHitEntityAfterEvent, EntityHurtAfterEvent, EntityLoadAfterEvent, EntityRemoveAfterEvent, EntityRemoveBeforeEvent, EntitySpawnAfterEvent, Player } from "@minecraft/server";
import { Attribute } from "../Public/attribute";
import { SuperComponent } from "../Component/SuperComponent";
import { CustomComponentManager } from "../Component/CustomComponentManager";
import { vec3 } from "../Public/vec3";
import { cast } from "../Public/stdlib";
import { Super } from "../Super/Super";

export class SuperEntity extends Super{
    source_instance: Entity;
    attribute: Attribute;
    custom_components: {[id:string]:SuperComponent};
    enable_tick: boolean = false
    constructor(source_instance: Entity) {
        super()
        this.source_instance = source_instance;
        this.dimension = source_instance.dimension;
        this.id = source_instance.id;
        this.isClimbing = source_instance.isClimbing;
        this.isFalling = source_instance.isFalling;
        this.isInWater = source_instance.isInWater;
        this.isOnGround = source_instance.isOnGround;
        this.isSleeping = source_instance.isSleeping;
        this.isSneaking = source_instance.isSneaking;
        this.isSprinting = source_instance.isSprinting;
        this.isSwimming = source_instance.isSwimming;
        this.location = source_instance.location;
        this.nameTag = source_instance.nameTag;
        this.scoreboardIdentity = source_instance.scoreboardIdentity;
        this.target = source_instance.target;
        this.typeId = source_instance.typeId;

        this.custom_components = {};
        this.attribute=new Attribute(source_instance);
        //加载存储的组件
        this.readCustomComponent();
    };
    cast<T>(){
        return cast<T>(this)
    }
    tick(t: number) {

    }
    getLocation(): vec3 {
        return vec3.fromObj(this.location)
    }
    getAttributeMap(): Attribute {
        return this.attribute
    }
    private readCustomComponent(){
        let data=this.getDynamicProperty("CustomComponent") as string;
        if (data) {
            let json=JSON.parse(data);
            for (let [id,cm_data] of Object.entries(json)) {
                let com=CustomComponentManager.CreateComponentInstance(id,this);
                for (let [key,value] of Object.entries(json)) {
                    com[key]=value;
                }
                this.custom_components[id]=com;
            }
        }
    }
    private saveCustomComponent(){//保存玩家自定义组件
        let components={};
        for (let [key,value] of Object.entries(this.custom_components)) {
            //抹除对自己的引用
            if (value.hasOwnProperty("entity")) {
                value["entity"]=undefined
            }
            if (value.hasOwnProperty("entity")) {
                value["owner"]=undefined
            }
            components[key]=value
        }
        let data=JSON.stringify(components);
        this.setDynamicProperty("CustomComponent",data);
    }
    addCustomComponent(identifier: string):boolean {
        let com=CustomComponentManager.CreateComponentInstance(identifier,this);
        if (!this.custom_components.hasOwnProperty(identifier)) {
            com.onStart();
            this.custom_components[identifier]=com;
            this.saveCustomComponent();
            return true
        }
        return false
    }
    removeCustomComponent(identifier: string) {
        delete this.custom_components[identifier]
        this.saveCustomComponent();
    }
    getCustomComponent<C extends SuperComponent>(identifier: string): C|undefined {
        if (this.custom_components.hasOwnProperty(identifier)) {
            return this.custom_components[identifier] as C
        }
        return undefined
    }
    getCustomComponents(): SuperComponent[] {
        let coms:SuperComponent[]=[];
        for (const key in this.custom_components) {
            if (this.custom_components.hasOwnProperty(key)) {
                coms.push(this.custom_components[key])
            }
        }
        return coms
    }
    registeredToEventManager(){//注册函数到事件管理，用于绑定事件
    }
    //触发事件
    onDieAfterEvent(event: EntityDieAfterEvent) {
    }
    onHealthChangedAfterEvent(event: EntityHealthChangedAfterEvent) {
    }
    onHitBlockAfterEvent(event: EntityHitBlockAfterEvent) {
    }
    onHitEntityAfterEvent(event: EntityHitEntityAfterEvent) {
    }
    onHurtAfterEvent(event: EntityHurtAfterEvent) {
    }
    onLoadAfterEvent(event: EntityLoadAfterEvent) {
    }
    onRemoveAfterEvent(event: EntityRemoveAfterEvent) {
    }
    onEntitySpawnAfterEvent(event: EntitySpawnAfterEvent) {
    }
    onRemoveBeforeEvent(event: EntityRemoveBeforeEvent) {
    }

    /**
     * @remarks
     * Dimension that the entity is currently within.
     *
     * @throws This property can throw when used.
     */
    readonly dimension: Dimension;
    /**
     * @remarks
     * Unique identifier of the entity. This identifier is intended
     * to be consistent across loads of a world instance. No
     * meaning should be inferred from the value and structure of
     * this unique identifier - do not parse or interpret it. This
     * property is accessible even if {@link Entity.isValid} is
     * false.
     *
     */
    readonly id: string;
    /**
     * @remarks
     * Whether the entity is touching a climbable block. For
     * example, a player next to a ladder or a spider next to a
     * stone wall.
     *
     * @throws This property can throw when used.
     */
    readonly isClimbing: boolean;
    /**
     * @remarks
     * Whether the entity has a fall distance greater than 0, or
     * greater than 1 while gliding.
     *
     * @throws This property can throw when used.
     */
    readonly isFalling: boolean;
    /**
     * @remarks
     * Whether any part of the entity is inside a water block.
     *
     * @throws This property can throw when used.
     */
    readonly isInWater: boolean;
    /**
     * @remarks
     * Whether the entity is on top of a solid block. This property
     * may behave in unexpected ways. This property will always be
     * true when an Entity is first spawned, and if the Entity has
     * no gravity this property may be incorrect.
     *
     * @throws This property can throw when used.
     */
    readonly isOnGround: boolean;
    /**
     * @remarks
     * If true, the entity is currently sleeping.
     *
     * @throws This property can throw when used.
     */
    readonly isSleeping: boolean;
    /**
     * @remarks
     * Whether the entity is sneaking - that is, moving more slowly
     * and more quietly.
     *
     * This property can't be edited in read-only mode.
     *
     */
    isSneaking: boolean;
    /**
     * @remarks
     * Whether the entity is sprinting. For example, a player using
     * the sprint action, an ocelot running away or a pig boosting
     * with Carrot on a Stick.
     *
     * @throws This property can throw when used.
     */
    readonly isSprinting: boolean;
    /**
     * @remarks
     * Whether the entity is in the swimming state. For example, a
     * player using the swim action or a fish in water.
     *
     * @throws This property can throw when used.
     */
    readonly isSwimming: boolean;
    /**
     * @remarks
     * Current location of the entity.
     *
     * @throws This property can throw when used.
     */
    readonly location: Vector3;
    /**
     * @remarks
     * Given name of the entity.
     *
     * This property can't be edited in read-only mode.
     *
     */
    nameTag: string;
    /**
     * @remarks
     * Returns a scoreboard identity that represents this entity.
     * Will remain valid when the entity is killed.
     *
     */
    readonly scoreboardIdentity?: ScoreboardIdentity;
    /**
     * @beta
     * @remarks
     * Retrieves or sets an entity that is used as the target of
     * AI-related behaviors, like attacking. If the entity
     * currently has no target returns undefined.
     *
     * @throws This property can throw when used.
     */
    readonly target?: Entity;
    /**
     * @remarks
     * Identifier of the type of the entity - for example,
     * 'minecraft:skeleton'. This property is accessible even if
     * {@link Entity.isValid} is false.
     *
     */
    readonly typeId: string;
    /**
     * @remarks
     * Adds or updates an effect, like poison, to the entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param effectType
     * Type of effect to add to the entity.
     * @param duration
     * Amount of time, in ticks, for the effect to apply. There are
     * 20 ticks per second. Use {@link TicksPerSecond} constant to
     * convert between ticks and seconds. The value must be within
     * the range [0, 20000000].
     * @param options
     * Additional options for the effect.
     * @returns
     * Returns nothing if the effect was added or updated
     * successfully. This can throw an error if the duration or
     * amplifier are outside of the valid ranges, or if the effect
     * does not exist.
     * @throws This function can throw errors.
     * @example poisonVillager.ts
     * ```typescript
     * // Spawns a villager and gives it the poison effect
     * import {
     *     DimensionLocation,
     * } from '@minecraft/server';
     * import { MinecraftEffectTypes } from '@minecraft/vanilla-data';
     *
     * function spawnPoisonedVillager(location: DimensionLocation) {
     *     const villagerType = 'minecraft:villager_v2<minecraft:ageable_grow_up>';
     *     const villager = location.dimension.spawnEntity(villagerType, location);
     *     const duration = 20;
     *
     *     villager.addEffect(MinecraftEffectTypes.Poison, duration, { amplifier: 1 });
     * }
     *
     * ```
     * @example quickFoxLazyDog.ts
     * ```typescript
     * // Spawns a fox over a dog
     * import { DimensionLocation } from '@minecraft/server';
     * import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
     *
     * function spawnAdultHorse(location: DimensionLocation) {
     *     // Create fox (our quick brown fox)
     *     const fox = location.dimension.spawnEntity(MinecraftEntityTypes.Fox, {
     *         x: location.x,
     *         y: location.y + 2,
     *         z: location.z,
     *     });
     *
     *     fox.addEffect('speed', 10, {
     *         amplifier: 2,
     *     });
     *
     *     // Create wolf (our lazy dog)
     *     const wolf = location.dimension.spawnEntity(MinecraftEntityTypes.Wolf, location);
     *     wolf.addEffect('slowness', 10, {
     *         amplifier: 2,
     *     });
     *     wolf.isSneaking = true;
     * }
     * ```
     */
    addEffect(effectType: EffectType | string, duration: number, options?: EntityEffectOptions): Effect | undefined {
        return this.source_instance.addEffect(effectType, duration, options);
    };
    /**
     * @remarks
     * Adds a specified tag to an entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param tag
     * Content of the tag to add. The tag must be less than 256
     * characters.
     * @returns
     * Returns true if the tag was added successfully. This can
     * fail if the tag already exists on the entity.
     * @throws This function can throw errors.
     */
    addTag(tag: string): boolean {
        return this.source_instance.addTag(tag);
    };
    /**
     * @remarks
     * Applies a set of damage to an entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param amount
     * Amount of damage to apply.
     * @param options
     * Additional options about the source of damage, which may add
     * additional effects or spur additional behaviors on this
     * entity.
     * @returns
     * Whether the entity takes any damage. This can return false
     * if the entity is invulnerable or if the damage applied is
     * less than or equal to 0.
     * @throws This function can throw errors.
     * @example applyDamageThenHeal.ts
     * ```typescript
     * // A function that applies damage and then heals the entity
     * import { Entity, EntityComponentTypes, system, world } from '@minecraft/server';
     *
     * function applyDamageAndHeal(entity: Entity) {
     *     entity.applyDamage(19); // Many mobs have max damage of 20 so this is a near-death mob
     *
     *     system.runTimeout(() => {
     *         const health = entity.getComponent(EntityComponentTypes.Health);
     *         if (health) {
     *             world.sendMessage(`Entity health before heal: ${health.currentValue}`);
     *
     *             health.resetToMaxValue();
     *
     *             world.sendMessage(`Entity after before heal: ${health.currentValue}`);
     *         } else {
     *             console.warn('Entity does not have health component');
     *         }
     *     }, 40); // Run in a few seconds (40 ticks)
     * }
     * ```
     */
    applyDamage(amount: number, options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions): boolean {
        return this.source_instance.applyDamage(amount, options);
    };
    /**
     * @remarks
     * Applies impulse vector to the current velocity of the
     * entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param vector
     * Impulse vector.
     * @throws This function can throw errors.
     * @example yeetEntity.ts
     * ```typescript
     * // A function that throws entities up in the air
     * import { Entity } from '@minecraft/server';
     *
     * function yeetEntity(entity: Entity) {
     *
     *     // Zero out the entity's velocity before applying impulse
     *     entity.clearVelocity();
     *
     *     // throw the zombie up in the air
     *     entity.applyImpulse({ x: 0, y: 15, z: 0 });
     * }
     * ```
     */
    applyImpulse(vector: Vector3): void {
        return this.source_instance.applyImpulse(vector);
    };
    /**
     * @remarks
     * Applies impulse vector to the current velocity of the
     * entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param directionX
     * X direction in horizontal plane.
     * @param directionZ
     * Z direction in horizontal plane.
     * @param horizontalStrength
     * Knockback strength for the horizontal vector.
     * @param verticalStrength
     * Knockback strength for the vertical vector.
     * @throws This function can throw errors.
     * @example bounceSkeletons.ts
     * ```typescript
     * import { EntityQueryOptions, DimensionLocation } from '@minecraft/server';
     *
     * function mobParty(targetLocation: DimensionLocation) {
     *     const mobs = ['creeper', 'skeleton', 'sheep'];
     *
     *     // create some sample mob data
     *     for (let i = 0; i < 10; i++) {
     *         targetLocation.dimension.spawnEntity(mobs[i % mobs.length], targetLocation);
     *     }
     *
     *     const eqo: EntityQueryOptions = {
     *         type: 'skeleton',
     *     };
     *
     *     for (const entity of targetLocation.dimension.getEntities(eqo)) {
     *         entity.applyKnockback(0, 0, 0, 1);
     *     }
     * }
     * ```
     */
    applyKnockback(directionX: number, directionZ: number, horizontalStrength: number, verticalStrength: number): void {
        return this.source_instance.applyKnockback(directionX, directionZ, horizontalStrength, verticalStrength);
    };
    /**
     * @remarks
     * Clears all dynamic properties that have been set on this
     * entity.
     *
     * @throws This function can throw errors.
     */
    clearDynamicProperties(): void {
        return this.source_instance.clearDynamicProperties();
    };
    /**
     * @remarks
     * Sets the current velocity of the Entity to zero. Note that
     * this method may not have an impact on Players.
     *
     * This function can't be called in read-only mode.
     *
     * @throws This function can throw errors.
     * @example yeetEntity.ts
     * ```typescript
     * // A function that throws entities up in the air
     * import { Entity } from '@minecraft/server';
     *
     * function yeetEntity(entity: Entity) {
     *
     *     // Zero out the entity's velocity before applying impulse
     *     entity.clearVelocity();
     *
     *     // throw the zombie up in the air
     *     entity.applyImpulse({ x: 0, y: 15, z: 0 });
     * }
     * ```
     */
    clearVelocity(): void {
        return this.source_instance.clearVelocity();
    };
    /**
     * @remarks
     * Extinguishes the fire if the entity is on fire. Note that
     * you can call getComponent('minecraft:onfire') and, if
     * present, the entity is on fire.
     *
     * This function can't be called in read-only mode.
     *
     * @param useEffects
     * Whether to show any visual effects connected to the
     * extinguishing.
     * @returns
     * Returns whether the entity was on fire.
     * @throws This function can throw errors.
     * @example setEntityOnFire.ts
     * ```typescript
     * import { world, Entity, EntityComponentTypes, system } from "@minecraft/server";
     *
     * function setAblaze(entity: Entity) {
     *     entity.setOnFire(20, true);
     *
     *     system.runTimeout(() => {
     *         const onfire = entity.getComponent(EntityComponentTypes.OnFire);
     *         if (onfire) {
     *             world.sendMessage(`${onfire.onFireTicksRemaining} fire ticks remaining, extinguishing the entity.`);
     *         }
     *         // This will extinguish the entity
     *         entity.extinguishFire(true);
     *     }, 30); // Run in 30 ticks or ~1.5 seconds
     *
     * }
     * ```
     */
    extinguishFire(useEffects?: boolean): boolean {
        return this.source_instance.extinguishFire(useEffects);
    };
    /**
     * @remarks
     * Returns the first intersecting block from the direction that
     * this entity is looking at.
     *
     * @param options
     * Additional configuration options for the ray cast.
     * @returns
     * Returns the first intersecting block from the direction that
     * this entity is looking at.
     * @throws This function can throw errors.
     */
    getBlockFromViewDirection(options?: BlockRaycastOptions): BlockRaycastHit | undefined {
        return this.source_instance.getBlockFromViewDirection(options);
    };
    /**
     * @remarks
     * Gets a component (that represents additional capabilities)
     * for an entity.
     *
     * @param componentId
     * The identifier of the component (e.g., 'minecraft:health').
     * If no namespace prefix is specified, 'minecraft:' is
     * assumed. Available component IDs can be found as part of the
     * {@link EntityComponentTypes} enum.
     * @returns
     * Returns the component if it exists on the entity, otherwise
     * undefined.
     */
    getComponent<T extends keyof EntityComponentTypeMap>(componentId: T): EntityComponentTypeMap[T] | undefined {
        return this.source_instance.getComponent(componentId);
    };
    /**
     * @remarks
     * Returns all components that are both present on this entity
     * and supported by the API.
     *
     * @returns
     * Returns all components that are both present on this entity
     * and supported by the API.
     */
    getComponents(): EntityComponent[] {
        return this.source_instance.getComponents();
    };
    /**
     * @remarks
     * Returns a property value.
     *
     * @param identifier
     * The property identifier.
     * @returns
     * Returns the value for the property, or undefined if the
     * property has not been set.
     * @throws This function can throw errors.
     */
    getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined {
        return this.source_instance.getDynamicProperty(identifier);
    };
    /**
     * @remarks
     * Returns the available set of dynamic property identifiers
     * that have been used on this entity.
     *
     * @returns
     * A string array of the dynamic properties set on this entity.
     * @throws This function can throw errors.
     */
    getDynamicPropertyIds(): string[] {
        return this.source_instance.getDynamicPropertyIds();
    };
    /**
     * @remarks
     * Returns the total size, in bytes, of all the dynamic
     * properties that are currently stored for this entity. This
     * includes the size of both the key and the value.  This can
     * be useful for diagnosing performance warning signs - if, for
     * example, an entity has many megabytes of associated dynamic
     * properties, it may be slow to load on various devices.
     *
     * @throws This function can throw errors.
     */
    getDynamicPropertyTotalByteCount(): number {
        return this.source_instance.getDynamicPropertyTotalByteCount();
    };
    /**
     * @remarks
     * Returns the effect for the specified EffectType on the
     * entity, undefined if the effect is not present, or throws an
     * error if the effect does not exist.
     *
     * @param effectType
     * The effect identifier.
     * @returns
     * Effect object for the specified effect, undefined if the
     * effect is not present, or throws an error if the effect does
     * not exist.
     * @throws This function can throw errors.
     */
    getEffect(effectType: EffectType | string): Effect | undefined {
        return this.source_instance.getEffect(effectType);
    };
    /**
     * @remarks
     * Returns a set of effects applied to this entity.
     *
     * @returns
     * List of effects.
     * @throws This function can throw errors.
     */
    getEffects(): Effect[] {
        return this.source_instance.getEffects();
    };
    /**
     * @remarks
     * Gets the entities that this entity is looking at by
     * performing a ray cast from the view of this entity.
     *
     * @param options
     * Additional configuration options for the ray cast.
     * @returns
     * Returns a set of entities from the direction that this
     * entity is looking at.
     * @throws This function can throw errors.
     */
    getEntitiesFromViewDirection(options?: EntityRaycastOptions): EntityRaycastHit[] {
        return this.source_instance.getEntitiesFromViewDirection(options);
    };
    /**
     * @remarks
     * Returns the current location of the head component of this
     * entity.
     *
     * @returns
     * Returns the current location of the head component of this
     * entity.
     * @throws This function can throw errors.
     */
    getHeadLocation(): Vector3 {
        return this.source_instance.getHeadLocation();
    };
    /**
     * @remarks
     * Gets an entity Property value. If the property was set using
     * the setProperty function within the same tick, the updated
     * value will not be reflected until the subsequent tick.
     *
     * @param identifier
     * The entity Property identifier.
     * @returns
     * Returns the current property value. For enum properties, a
     * string is returned. For float and int properties, a number
     * is returned. For undefined properties, undefined is
     * returned.
     * @throws
     * Throws if the entity is invalid.
     */
    getProperty(identifier: string): boolean | number | string | undefined {
        return this.source_instance.getProperty(identifier);
    };
    /**
     * @remarks
     * Returns the current rotation component of this entity.
     *
     * @returns
     * Returns a Vec2 containing the rotation of this entity (in
     * degrees).
     * @throws This function can throw errors.
     */
    getRotation(): Vector2 {
        return this.source_instance.getRotation();
    };
    /**
     * @remarks
     * Returns all tags associated with the entity.
     *
     * @returns
     * An array containing all tags as strings.
     * @throws This function can throw errors.
     */
    getTags(): string[] {
        return this.source_instance.getTags();
    };
    /**
     * @remarks
     * Returns the current velocity vector of the entity.
     *
     * @returns
     * Returns the current velocity vector of the entity.
     * @throws This function can throw errors.
     * @example getFireworkVelocity.ts
     * ```typescript
     * // A function that spawns fireworks and logs their velocity after 5 ticks
     * import { DimensionLocation, system, world } from '@minecraft/server';
     * import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
     *
     * function spawnFireworks(location: DimensionLocation) {
     *     const fireworkRocket = location.dimension.spawnEntity(MinecraftEntityTypes.FireworksRocket, location);
     *
     *     system.runTimeout(() => {
     *         const velocity = fireworkRocket.getVelocity();
     *
     *         world.sendMessage(`Velocity of firework is: ${velocity.x}, ${velocity.y}, ${velocity.z}`);
     *     }, 5);
     * }
     * ```
     */
    getVelocity(): Vector3 {
        return this.source_instance.getVelocity();
    };
    /**
     * @remarks
     * Returns the current view direction of the entity.
     *
     * @returns
     * Returns the current view direction of the entity.
     * @throws This function can throw errors.
     */
    getViewDirection(): Vector3 {
        return this.source_instance.getViewDirection();
    };
    /**
     * @remarks
     * Returns true if the specified component is present on this
     * entity.
     *
     * @param componentId
     * The identifier of the component (e.g., 'minecraft:rideable')
     * to retrieve. If no namespace prefix is specified,
     * 'minecraft:' is assumed.
     * @returns
     * Returns true if the specified component is present on this
     * entity.
     */
    hasComponent(componentId: string): boolean {
        return this.source_instance.hasComponent(componentId);
    };
    /**
     * @remarks
     * Returns whether an entity has a particular tag.
     *
     * @param tag
     * Identifier of the tag to test for.
     * @returns
     * Returns whether an entity has a particular tag.
     * @throws This function can throw errors.
     */
    hasTag(tag: string): boolean {
        return this.source_instance.hasTag(tag);
    };
    /**
     * @remarks
     * Returns whether the entity can be manipulated by script. A
     * Player is considered valid when it's EntityLifetimeState is
     * set to Loaded.
     *
     * @returns
     * Whether the entity is valid.
     */
    isValid(): boolean {
        return this.source_instance.isValid();
    };
    /**
     * @remarks
     * Kills this entity. The entity will drop loot as normal.
     *
     * This function can't be called in read-only mode.
     *
     * @returns
     * Returns true if entity can be killed (even if it is already
     * dead), otherwise it returns false.
     * @throws This function can throw errors.
     * @example tagsQuery.ts
     * ```typescript
     * import { EntityQueryOptions, DimensionLocation } from '@minecraft/server';
     *
     * function mobParty(targetLocation: DimensionLocation) {
     *     const mobs = ['creeper', 'skeleton', 'sheep'];
     *
     *     // create some sample mob data
     *     for (let i = 0; i < 10; i++) {
     *         const mobTypeId = mobs[i % mobs.length];
     *         const entity = targetLocation.dimension.spawnEntity(mobTypeId, targetLocation);
     *         entity.addTag('mobparty.' + mobTypeId);
     *     }
     *
     *     const eqo: EntityQueryOptions = {
     *         tags: ['mobparty.skeleton'],
     *     };
     *
     *     for (const entity of targetLocation.dimension.getEntities(eqo)) {
     *         entity.kill();
     *     }
     * }
     * ```
     */
    kill(): boolean {
        return this.source_instance.kill();
    };
    /**
     * @remarks
     * Matches the entity against the passed in options. Uses the
     * location of the entity for matching if the location is not
     * specified in the passed in EntityQueryOptions.
     *
     * @param options
     * The query to perform the match against.
     * @returns
     * Returns true if the entity matches the criteria in the
     * passed in EntityQueryOptions, otherwise it returns false.
     * @throws
     * Throws if the query options are misconfigured.
     */
    matches(options: EntityQueryOptions): boolean {
        return this.source_instance.matches(options);
    };
    /**
     * @remarks
     * Cause the entity to play the given animation.
     *
     * This function can't be called in read-only mode.
     *
     * @param animationName
     * The animation identifier. e.g. animation.creeper.swelling
     * @param options
     * Additional options to control the playback and transitions
     * of the animation.
     * @throws This function can throw errors.
     */
    playAnimation(animationName: string, options?: PlayAnimationOptions): void {
        return this.source_instance.playAnimation(animationName, options);
    };
    /**
     * @remarks
     * Immediately removes the entity from the world. The removed
     * entity will not perform a death animation or drop loot upon
     * removal.
     *
     * This function can't be called in read-only mode.
     *
     * @throws This function can throw errors.
     */
    remove(): void {
        return this.source_instance.remove();
    };
    /**
     * @remarks
     * Removes the specified EffectType on the entity, or returns
     * false if the effect is not present.
     *
     * This function can't be called in read-only mode.
     *
     * @param effectType
     * The effect identifier.
     * @returns
     * Returns true if the effect has been removed. Returns false
     * if the effect is not found or does not exist.
     * @throws This function can throw errors.
     */
    removeEffect(effectType: EffectType | string): boolean {
        return this.source_instance.removeEffect(effectType);
    };
    /**
     * @remarks
     * Removes a specified tag from an entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param tag
     * Content of the tag to remove.
     * @returns
     * Returns whether the tag existed on the entity.
     * @throws This function can throw errors.
     */
    removeTag(tag: string): boolean {
        return this.source_instance.removeTag(tag);
    };
    /**
     * @remarks
     * Resets an Entity Property back to its default value, as
     * specified in the Entity's definition. This property change
     * is not applied until the next tick.
     *
     * This function can't be called in read-only mode.
     *
     * @param identifier
     * The Entity Property identifier.
     * @returns
     * Returns the default property value. For enum properties, a
     * string is returned. For float and int properties, a number
     * is returned. For undefined properties, undefined is
     * returned.
     * @throws
     * Throws if the entity is invalid.
     *
     * {@link minecraftcommon.EngineError}
     *
     * {@link Error}
     */
    resetProperty(identifier: string): boolean | number | string {
        return this.source_instance.resetProperty(identifier);
    };
    /**
     * @remarks
     * Runs a synchronous command on the entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param commandString
     * The command string. Note: This should not include a leading
     * forward slash.
     * @returns
     * A command result containing whether the command was
     * successful.
     * @throws This function can throw errors.
     *
     * {@link CommandError}
     *
     * {@link Error}
     */
    runCommand(commandString: string): CommandResult {
        return this.source_instance.runCommand(commandString);
    };
    /**
     * @remarks
     * Runs a particular command asynchronously from the context of
     * this entity. Note that there is a maximum queue of 128
     * asynchronous commands that can be run in a given tick.
     *
     * @param commandString
     * Command to run. Note that command strings should not start
     * with slash.
     * @returns
     * For commands that return data, returns a JSON structure with
     * command response values.
     * @throws This function can throw errors.
     */
    runCommandAsync(commandString: string): Promise<CommandResult> {
        return this.source_instance.runCommandAsync(commandString);
    };
    /**
     * @remarks
     * Sets a specified property to a value.
     *
     * @param identifier
     * The property identifier.
     * @param value
     * Data value of the property to set.
     * @throws This function can throw errors.
     */
    setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void {
        return this.source_instance.setDynamicProperty(identifier, value);
    };
    /**
     * @remarks
     * Sets an entity on fire (if it is not in water or rain). Note
     * that you can call getComponent('minecraft:onfire') and, if
     * present, the entity is on fire.
     *
     * This function can't be called in read-only mode.
     *
     * @param seconds
     * Length of time to set the entity on fire.
     * @param useEffects
     * Whether side-effects should be applied (e.g. thawing freeze)
     * and other conditions such as rain or fire protection should
     * be taken into consideration.
     * @returns
     * Whether the entity was set on fire. This can fail if seconds
     * is less than or equal to zero, the entity is wet or the
     * entity is immune to fire.
     * @throws This function can throw errors.
     * @example setEntityOnFire.ts
     * ```typescript
     * import { world, Entity, EntityComponentTypes, system } from "@minecraft/server";
     *
     * function setAblaze(entity: Entity) {
     *     entity.setOnFire(20, true);
     *
     *     system.runTimeout(() => {
     *         const onfire = entity.getComponent(EntityComponentTypes.OnFire);
     *         if (onfire) {
     *             world.sendMessage(`${onfire.onFireTicksRemaining} fire ticks remaining, extinguishing the entity.`);
     *         }
     *         // This will extinguish the entity
     *         entity.extinguishFire(true);
     *     }, 30); // Run in 30 ticks or ~1.5 seconds
     *
     * }
     * ```
     */
    setOnFire(seconds: number, useEffects?: boolean): boolean {
        return this.source_instance.setOnFire(seconds, useEffects);
    };
    /**
     * @remarks
     * Sets an Entity Property to the provided value. This property
     * change is not applied until the next tick.
     *
     * This function can't be called in read-only mode.
     *
     * @param identifier
     * The Entity Property identifier.
     * @param value
     * The property value. The provided type must be compatible
     * with the type specified in the entity's definition.
     * @throws
     * Throws if the entity is invalid.
     * Throws if an invalid identifier is provided.
     * Throws if the provided value type does not match the
     * property type.
     * Throws if the provided value is outside the expected range
     * (int, float properties).
     * Throws if the provided string value does not match the set
     * of accepted enum values (enum properties
     */
    setProperty(identifier: string, value: boolean | number | string): void {
        return this.source_instance.setProperty(identifier, value);
    };
    /**
     * @remarks
     * Sets the main rotation of the entity.
     *
     * This function can't be called in read-only mode.
     *
     * @param rotation
     * The x and y rotation of the entity (in degrees). For most
     * mobs, the x rotation controls the head tilt and the y
     * rotation controls the body rotation.
     * @throws This function can throw errors.
     */
    setRotation(rotation: Vector2): void {
        return this.source_instance.setRotation(rotation);
    };
    /**
     * @remarks
     * Teleports the selected entity to a new location
     *
     * This function can't be called in read-only mode.
     *
     * @param location
     * New location for the entity.
     * @param teleportOptions
     * Options regarding the teleport operation.
     * @throws This function can throw errors.
     * @example teleportMovement.ts
     */
    teleport(location: vec3, teleportOptions?: TeleportOptions): void {
        return this.source_instance.teleport(location, teleportOptions);
    };
    /**
     * @remarks
     * Triggers an entity type event. For every entity, a number of
     * events are defined in an entities' definition for key entity
     * behaviors; for example, creepers have a
     * minecraft:start_exploding type event.
     *
     * This function can't be called in read-only mode.
     *
     * @param eventName
     * Name of the entity type event to trigger. If a namespace is
     * not specified, minecraft: is assumed.
     * @throws
     * If the event is not defined in the definition of the entity,
     * an error will be thrown.
     * @example triggerEvent.ts
     * ```typescript
     * // A function that spawns a creeper and triggers it to explode immediately
     * import { DimensionLocation } from '@minecraft/server';
     * import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
     *
     * function spawnExplodingCreeper(location: DimensionLocation) {
     *     const creeper = location.dimension.spawnEntity(MinecraftEntityTypes.Creeper, location);
     *
     *     creeper.triggerEvent('minecraft:start_exploding_forced');
     * }
     * ```
     */
    triggerEvent(eventName: string): void {
        return this.source_instance.triggerEvent(eventName);
    };
    /**
     * @remarks
     * Attempts to try a teleport, but may not complete the
     * teleport operation (for example, if there are blocks at the
     * destination.)
     *
     * This function can't be called in read-only mode.
     *
     * @param location
     * Location to teleport the entity to.
     * @param teleportOptions
     * Options regarding the teleport operation.
     * @returns
     * Returns whether the teleport succeeded. This can fail if the
     * destination chunk is unloaded or if the teleport would
     * result in intersecting with blocks.
     * @throws This function can throw errors.
     */
    tryTeleport(location: vec3, teleportOptions?: TeleportOptions): boolean {
        return this.source_instance.tryTeleport(location, teleportOptions);
    };
}

