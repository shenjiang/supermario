# 超级马里奥兄弟克隆版 (Super Mario Bros. Clone)

一个受《超级马里奥兄弟》启发的经典 2D 平台游戏，使用原生 JavaScript 和 HTML5 Canvas 构建。

## 特性

- **经典玩法**：奔跑、跳跃和踩踏敌人。
- **物理引擎**：自定义 AABB 碰撞检测，实现精准的平台跳跃体验。
- **程序化图形**：所有资源均使用 Canvas API 程序化生成（无需外部图像文件）。
- **关卡元素**：
  - 可破坏的砖块
  - 包含金币的问号方块
  - 栗宝宝 (Goomba) 敌人
  - 管道和平台
  - 旗杆胜利条件

## 如何游玩

1. **克隆仓库**：
   ```bash
   git clone https://github.com/shenjiang/supermario.git
   cd supermario
   ```

2. **运行游戏**：
   你可以直接在浏览器中打开 `index.html`，或者使用本地服务器以获得最佳体验：
   ```bash
   # Python 3
   python3 -m http.server 8080
   ```
   然后在浏览器中访问 `http://localhost:8080`。

## 控制

- **方向键**：向左 / 向右移动
- **空格键** 或 **向上箭头**：跳跃（按住可跳得更高）

## 项目结构

- `index.html`: 主入口文件。
- `style.css`: 游戏容器的样式。
- `js/`:
  - `main.js`: 游戏循环和初始化。
  - `game.js`: 核心游戏逻辑和状态管理。
  - `entities.js`: 玩家、敌人和物品类。
  - `physics.js`: 碰撞检测和物理引擎。
  - `level.js`: 关卡数据和解析。
  - `render.js`: 渲染逻辑和精灵生成。
  - `input.js`: 键盘输入处理。

## 许可证

[MIT](LICENSE)
