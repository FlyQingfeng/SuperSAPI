import { SuperPlayer } from "../Player/SuperPlayer";
import { EntitySuperComponent } from "./SuperEntityComponent";
import { ChatSendBeforeEvent, ItemCompleteUseEvent, ItemReleaseUseAfterEvent, ItemStartUseAfterEvent, ItemStopUseOnAfterEvent, ItemUseAfterEvent, ItemUseBeforeEvent, ItemUseOnAfterEvent, ItemUseOnBeforeEvent, PlayerBreakBlockAfterEvent, PlayerBreakBlockBeforeEvent, PlayerDimensionChangeAfterEvent, PlayerEmoteAfterEvent, PlayerGameModeChangeAfterEvent, PlayerGameModeChangeBeforeEvent, PlayerInputPermissionCategoryChangeAfterEvent, PlayerInteractWithBlockAfterEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityAfterEvent, PlayerInteractWithEntityBeforeEvent, PlayerJoinAfterEvent, PlayerLeaveAfterEvent, PlayerLeaveBeforeEvent, PlayerPlaceBlockAfterEvent, PlayerPlaceBlockBeforeEvent, PlayerSpawnAfterEvent } from "@minecraft/server";
export class PlayerSuperComponent extends EntitySuperComponent {
    player: SuperPlayer;
    constructor(typeId: string, owner: SuperPlayer) {
        super(typeId, owner)
        this.player = owner
        this.init();
    };
    init(): void {
        super.init();
        if (this.player) {
            let player = this.player;
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
            player.Bind(player.onBreakPlaceBeforeEvent, this.onPlaceBlockBeforeEvent);
            player.Bind(player.onBreakBlockBeforeEvent, this.onBreakBlockBeforeEvent);
        }
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