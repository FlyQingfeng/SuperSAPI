import { SuperPlayer } from "../Player/SuperPlayer";
import { EntitySuperComponent } from "./SuperEntityComponent";
import { ChatSendBeforeEvent, ItemCompleteUseEvent, ItemReleaseUseAfterEvent, ItemStartUseAfterEvent, ItemStopUseOnAfterEvent, ItemUseAfterEvent, ItemUseBeforeEvent, ItemUseOnAfterEvent, ItemUseOnBeforeEvent, PlayerBreakBlockAfterEvent, PlayerBreakBlockBeforeEvent, PlayerDimensionChangeAfterEvent, PlayerEmoteAfterEvent, PlayerGameModeChangeAfterEvent, PlayerGameModeChangeBeforeEvent, PlayerInputPermissionCategoryChangeAfterEvent, PlayerInteractWithBlockAfterEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityAfterEvent, PlayerInteractWithEntityBeforeEvent, PlayerJoinAfterEvent, PlayerLeaveAfterEvent, PlayerLeaveBeforeEvent, PlayerPlaceBlockAfterEvent, PlayerPlaceBlockBeforeEvent, PlayerSpawnAfterEvent } from "@minecraft/server";

export class PlayerSuperComponent extends EntitySuperComponent {
    constructor(typeId: string, owner: SuperPlayer) {
        super(typeId, owner)
        let player = this.getOwner();
        if (player.isValid()) {
            player.Bind(player.onItemStopUseOnAfterEvent, this.onItemStopUseOnAfterEvent);
            player.Bind(player.onItemStartUseAfterEvent, this.onItemStartUseAfterEvent);
            player.Bind(player.onItemReleaseAfterEvent, this.onItemReleaseAfterEvent);
            player.Bind(player.onItemCompleteAfterEvent, this.onItemCompleteAfterEvent);
            player.Bind(player.onItemUseOnAfterEvent, this.onItemUseOnAfterEvent);
            player.Bind(player.onItemUseAfterEvent, this.onItemUseAfterEvent);
            player.Bind(player.onPlayerSpawnAfterEvent, this.onPlayerSpawnAfterEvent);
            player.Bind(player.onPlaceBlockAfterEvent, this.onPlaceBlockAfterEvent);
            player.Bind(player.onLeaveAfterEvent, this.onLeaveAfterEvent);
            player.Bind(player.onJoinAfterEvent, this.onJoinAfterEvent);
            player.Bind(player.onInteractWithEntityAfterEvent, this.onInteractWithEntityAfterEvent);
            player.Bind(player.onInteractWithBlockAfterEvent, this.onInteractWithBlockAfterEvent);
            player.Bind(player.onInputPermissionCategoryChangeAfterEvent, this.onInputPermissionCategoryChangeAfterEvent);
            player.Bind(player.onGameModeChangeAfterEvent, this.onGameModeChangeAfterEvent);
            player.Bind(player.onEmoteAfterEvent, this.onEmoteAfterEvent);
            player.Bind(player.onDimensionChangeAfterEvent, this.onDimensionChangeAfterEvent);
            player.Bind(player.onBreakBlockAfterEvent, this.onBreakBlockAfterEvent);
            player.Bind(player.onLeaveBeforeEvent, this.onLeaveBeforeEvent);
            player.Bind(player.onInteractWithEntityBeforeEvent, this.onInteractWithEntityBeforeEvent);
            player.Bind(player.onInteractWithBlockBeforeEvent, this.onInteractWithBlockBeforeEvent);
            player.Bind(player.onGameModeChangeBeforeEvent, this.onGameModeChangeBeforeEvent);
            player.Bind(player.onItemUseOnBeforeEvent, this.onItemUseOnBeforeEvent);
            player.Bind(player.onItemUseBeforeEvent, this.onItemUseBeforeEvent);
            player.Bind(player.onChatSendBeforeEvent, this.onChatSendBeforeEvent);
            player.Bind(player.onPlaceBeforeEvent, this.onPlaceBlockBeforeEvent);
            player.Bind(player.onBreakBlockBeforeEvent, this.onBreakBlockBeforeEvent);
        }
    };
    deconstructor(op?: string): void {
        let player = this.getOwner();
        if (player.isValid()) {
            player.UnBind(player.onItemStopUseOnAfterEvent, this.onItemStopUseOnAfterEvent);
            player.UnBind(player.onItemStartUseAfterEvent, this.onItemStartUseAfterEvent);
            player.UnBind(player.onItemReleaseAfterEvent, this.onItemReleaseAfterEvent);
            player.UnBind(player.onItemCompleteAfterEvent, this.onItemCompleteAfterEvent);
            player.UnBind(player.onItemUseOnAfterEvent, this.onItemUseOnAfterEvent);
            player.UnBind(player.onItemUseAfterEvent, this.onItemUseAfterEvent);
            player.UnBind(player.onPlayerSpawnAfterEvent, this.onPlayerSpawnAfterEvent);
            player.UnBind(player.onPlaceBlockAfterEvent, this.onPlaceBlockAfterEvent);
            player.UnBind(player.onLeaveAfterEvent, this.onLeaveAfterEvent);
            player.UnBind(player.onJoinAfterEvent, this.onJoinAfterEvent);
            player.UnBind(player.onInteractWithEntityAfterEvent, this.onInteractWithEntityAfterEvent);
            player.UnBind(player.onInteractWithBlockAfterEvent, this.onInteractWithBlockAfterEvent);
            player.UnBind(player.onInputPermissionCategoryChangeAfterEvent, this.onInputPermissionCategoryChangeAfterEvent);
            player.UnBind(player.onGameModeChangeAfterEvent, this.onGameModeChangeAfterEvent);
            player.UnBind(player.onEmoteAfterEvent, this.onEmoteAfterEvent);
            player.UnBind(player.onDimensionChangeAfterEvent, this.onDimensionChangeAfterEvent);
            player.UnBind(player.onBreakBlockAfterEvent, this.onBreakBlockAfterEvent);
            player.UnBind(player.onLeaveBeforeEvent, this.onLeaveBeforeEvent);
            player.UnBind(player.onInteractWithEntityBeforeEvent, this.onInteractWithEntityBeforeEvent);
            player.UnBind(player.onInteractWithBlockBeforeEvent, this.onInteractWithBlockBeforeEvent);
            player.UnBind(player.onGameModeChangeBeforeEvent, this.onGameModeChangeBeforeEvent);
            player.UnBind(player.onItemUseOnBeforeEvent, this.onItemUseOnBeforeEvent);
            player.UnBind(player.onItemUseBeforeEvent, this.onItemUseBeforeEvent);
            player.UnBind(player.onChatSendBeforeEvent, this.onChatSendBeforeEvent);
            player.UnBind(player.onPlaceBeforeEvent, this.onPlaceBlockBeforeEvent);
            player.UnBind(player.onBreakBlockBeforeEvent, this.onBreakBlockBeforeEvent);
        }
    }
    init(): void {
    }
    getOwner(): SuperPlayer {
        return this.owner as SuperPlayer
    }
    onStart(): void {
        super.onStart();
    }
    onItemStopUseOnAfterEvent(event: ItemStopUseOnAfterEvent) {
    }

    onItemStartUseAfterEvent(event: ItemStartUseAfterEvent) {
    }

    onItemReleaseAfterEvent(event: ItemReleaseUseAfterEvent) {
    }

    onItemCompleteAfterEvent(event: ItemCompleteUseEvent) {
    }

    onItemUseOnAfterEvent(event: ItemUseOnAfterEvent) {
    }

    onItemUseAfterEvent(event: ItemUseAfterEvent) {
    }

    onPlayerSpawnAfterEvent(event: PlayerSpawnAfterEvent) {
    }

    onPlaceBlockAfterEvent(event: PlayerPlaceBlockAfterEvent) {
    }

    onLeaveAfterEvent(event: PlayerLeaveAfterEvent) {
    }

    onJoinAfterEvent(event: PlayerJoinAfterEvent) {
    }

    onInteractWithEntityAfterEvent(event: PlayerInteractWithEntityAfterEvent) {
    }

    onInteractWithBlockAfterEvent(event: PlayerInteractWithBlockAfterEvent) {
    }

    onInputPermissionCategoryChangeAfterEvent(event: PlayerInputPermissionCategoryChangeAfterEvent) {
    }

    onGameModeChangeAfterEvent(event: PlayerGameModeChangeAfterEvent) {
    }

    onEmoteAfterEvent(event: PlayerEmoteAfterEvent) {
    }

    onDimensionChangeAfterEvent(event: PlayerDimensionChangeAfterEvent) {
    }

    onBreakBlockAfterEvent(event: PlayerBreakBlockAfterEvent) {

    }

    onLeaveBeforeEvent(event: PlayerLeaveBeforeEvent) {
    }

    onInteractWithEntityBeforeEvent(event: PlayerInteractWithEntityBeforeEvent) {
    }

    onInteractWithBlockBeforeEvent(event: PlayerInteractWithBlockBeforeEvent) {
    }

    onGameModeChangeBeforeEvent(event: PlayerGameModeChangeBeforeEvent) {
    }

    onItemUseOnBeforeEvent(event: ItemUseOnBeforeEvent) {
    }

    onItemUseBeforeEvent(event: ItemUseBeforeEvent) {
    }

    onChatSendBeforeEvent(event: ChatSendBeforeEvent) {
    }

    onPlaceBlockBeforeEvent(event: PlayerPlaceBlockBeforeEvent) {
    }

    onBreakBlockBeforeEvent(event: PlayerBreakBlockBeforeEvent) {

    }
}