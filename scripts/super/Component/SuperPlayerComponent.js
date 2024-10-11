import { EntitySuperComponent } from "./SuperEntityComponent";
export class PlayerSuperComponent extends EntitySuperComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.player = owner;
        this.init();
    }
    ;
    init() {
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
    onPlaceBlockBeforeEvent(event) {
    }
    onBreakBlockBeforeEvent(event) {
    }
}
