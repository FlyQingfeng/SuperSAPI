# SuperSAPI 1.0-beta

SuperSAPI 是一个针对 Minecraft 基岩版 ScriptAPI 开发的前置 API。它使用面向对象的思维，通过类的继承和替换源类来实现 API 操作，使得代码逻辑更加清晰，编写代码更加容易。

## 特点

- **面向对象**：采用面向对象的设计模式，代码结构更清晰。
- **易于扩展**：通过继承和替换，可以轻松扩展新的功能。
- **代码清晰**：通过封装和抽象，减少代码冗余，提高代码可读性。

## 安装

### 方法1：安装js版本

* 下载 SuperSAPI ，也可以直接克隆到本地。
* 将下载的文件解压到你的本地的任意位置，把SuperSAPI文件夹下的scripts/super文件夹复制到行为包项目目录下的scripts下。
* 在你的 行为包 项目中的main.js中引入SuperSAPI（如下）。

```javascript
// 引入 SuperSAPI
import * as SuperSAPI from "./SuperSAPI";
```

### 方法2：安装ts版本（推荐）：

* 克隆SuperSAPI到本地
* 更改SuperSAPI目录下的manifest.json文件，改成你对应行为包的信息
* 打开SuperSAPI目录下的src/main.ts 开始编写你的代码
* 在编写完成了代码后 在vs code 控制台输入`npx tsc`将ts转出js文件（前提是已经安装配置了ts环境）

## 使用方法

### 继承和替换

SuperSAPI 允许你通过继承和替换原有的 ScriptAPI内的类 来扩展功能，这里演示替换Entity和Player类实现自定义功能

```ts
//mEntity.ts
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";
export class mEntity extends SuperSAPI.Entity {
    constructor(entity:SuperSAPI.MC_Entity,world:SuperSAPI.SuperWorld) {
        super(entity,world)
    }
    onDieAfterEvent(event: mc.EntityDieAfterEvent): void {
        console.log("onDieAfterEvent");
    }
}
```

```ts
//mPlyer.ts
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.Player {
    constructor(player: SuperSAPI.MC_Player,world:SuperSAPI.SuperWorld) {
        super(player,world)
        this.enable_tick=true;
    }
    @SuperSAPI.registerAsSubscribable
    onItemUseAfterEvent(event: mc.ItemUseAfterEvent): void {
        console.log("use item");
    }
}
```

```ts
//编写完自己的实体类和玩家类后，在main.ts中注册替换类
import { mEntity } from "./ownCode/mEntity";
import { mPlayer } from "./ownCode/mPlayer";
import * as SuperSAPI from "./SuperSAPI";

SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity,mEntity)
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player,mPlayer)
//记得在注册完替换类后，初始化SuperSAPI系统
SuperSAPI.System.init();

```

## 更多关于 SuperSAPI 的详细文档和 API 参考，请访问 [SuperSAPI - Minecraft Bedrock Super Script API](https://flyqingfeng.github.io/SuperSAPI/)。

## 贡献

目前该项目处于开发阶段

如果你对 SuperSAPI 有任何改进建议或者想要贡献代码，请提交 Pull Request。

## 许可

SuperSAPI 是开源的，遵循 [MIT 许可证](#)。
