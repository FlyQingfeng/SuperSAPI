# SuperSAPI 1.0-beta

SuperSAPI 是一个针对 Minecraft 基岩版 ScriptAPI 开发的前置 API。它使用面向对象的思维，通过类的继承和替换源类来实现 API 操作，使得代码逻辑更加清晰，编写代码更加容易。

## 特点

- **面向对象**：采用面向对象的设计模式，代码结构更清晰。
- **易于扩展**：通过继承和替换，可以轻松扩展新的功能。
- **代码清晰**：通过封装和抽象，减少代码冗余，提高代码可读性。

## 安装

要使用 SuperSAPI，你需要将其下载并放置到你的 ScriptAPI 项目目录中。

1. 下载 SuperSAPI 文件。
2. 将下载的文件解压到你的 ScriptAPI 项目目录。
3. 在你的 ScriptAPI 项目中引入 SuperSAPI。

```javascript
// 引入 SuperSAPI
import * as SuperSAPI from "./SuperSAPI";
```

## 使用方法

### 继承和替换

SuperSAPI 允许你通过继承和替换原有的 ScriptAPI内的类 来扩展功能，这里演示替换Entity和Player类实现自定义功能

```ts
//mEntity.ts
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mEntity extends SuperSAPI.Entity {
    constructor(entity:mc.Entity) {
        super(entity)
        this.enable_tick=true;
    }
    tick(t: number): void {
  
    }
}
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity,mEntity)

```

```ts
//mPlyer.ts
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.Player {
    constructor(player: mc.Player) {
        super(player)
        this.atribute.set("value",0);
        // this.enable_tick=true;
    }
    tick(t: number): void {
        this.sendMessage(`${this.name}`)
    }
    //玩家破坏方块之后
    onAfterBreakBlockEvent(event: mc.PlayerBreakBlockAfterEvent): void {
        this.sendMessage(`${event.brokenBlockPermutation.type.id}`)
    }
  
}
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player,mPlayer)
```

## 更多关于 SuperSAPI 的详细文档和 API 参考，请访问 [SuperSAPI 文档](#)。

## 贡献

如果你对 SuperSAPI 有任何改进建议或者想要贡献代码，请提交 Pull Request。

## 许可

SuperSAPI 是开源的，遵循 [MIT 许可证](#)。
