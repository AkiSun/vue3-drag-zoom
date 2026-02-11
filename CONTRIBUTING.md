# 贡献指南

感谢您对 vue3-drag-zoom 项目的兴趣！我们欢迎并感谢社区贡献。

## 目录

- [行为准则](#行为准则)
- [开始贡献](#开始贡献)
- [开发环境搭建](#开发环境搭建)
- [贡献流程](#贡献流程)
- [代码规范](#代码规范)
- [提交信息规范](#提交信息规范)
- [测试要求](#测试要求)
- [文档贡献](#文档贡献)

## 行为准则

请尊重所有参与者，保持友善和包容的态度。任何形式的骚扰、歧视或不当行为都是不可接受的。

## 开始贡献

### 适合新手的 issues

我们为新手维护了标签为 `good first issue` 的任务，这些任务通常较小，适合初次贡献者：

1. 查看 [good first issues](https://github.com/AkiSun/vue3-drag-zoom/labels/good%20first%20issue)
- 选择一个感兴趣的问题
- 在 issue 下评论表明您想要处理它
- 按照下面的流程开始工作

### 其他贡献方式

- 报告 bug
- 提出新功能建议
- 改进文档
- 分享项目给其他人

## 开发环境搭建

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git

### 初始化项目

```bash
# 克隆仓库
git clone https://github.com/AkiSun/vue3-drag-zoom.git
cd vue3-drag-zoom

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

### 项目结构

```
vue3-drag-zoom/
├── packages/           # 核心包
│   ├── drag-zoom/      # 主组件
│   └── ...             # 其他包
├── docs/               # 文档
├── demo/               # 演示
├── playgrounds/        # 游乐场
├── vitest.config.ts    # 测试配置
├── .eslintrc.cjs       # ESLint 配置
├── .prettierrc         # Prettier 配置
└── CHANGELOG.md        # 更新日志
```

## 贡献流程

### 1. 创建 Issue

在开始工作之前，请先创建或找到一个相关的 issue：

- **Bug 报告**：使用 [Bug 报告模板](.github/ISSUE_TEMPLATE/bug_report.md)
- **功能请求**：使用 [功能请求模板](.github/ISSUE_TEMPLATE/feature_request.md)
- **常规问题**：清晰描述问题和复现步骤

### 2. Fork 仓库

```bash
# Fork 仓库到您的 GitHub 账户
# 然后克隆到本地
git clone https://github.com/YOUR_USERNAME/vue3-drag-zoom.git
cd vue3-drag-zoom
```

### 3. 创建功能分支

```bash
# 同步上游仓库
git remote add upstream https://github.com/AkiSun/vue3-drag-zoom.git
git fetch upstream

# 创建新的分支
git checkout -b feature/your-feature-name
# 或修复 bug：git checkout -b fix/your-fix-name
```

### 4. 开发与测试

```bash
# 启动开发服务器
pnpm dev

# 运行测试（确保所有测试通过）
pnpm test

# 运行代码检查
pnpm lint

# 格式化代码
pnpm format
```

### 5. 提交更改

遵循[提交信息规范](#提交信息规范)编写 commit message。

```bash
git add .
git commit -m "feat: add new feature description"
```

### 6. 同步与推送

```bash
# 同步上游最新的更改
git fetch upstream
git rebase upstream/main

# 推送到您的 fork
git push origin feature/your-feature-name
```

### 7. 创建 Pull Request

1. 访问原始仓库
2. 点击 "New Pull Request"
3. 选择您的分支与 main 分支比较
4. 填写 PR 模板
5. 链接相关的 issue（使用 keywords 如 `fixes #123`）

### PR 审查流程

- CI/CD 检查将自动运行
- 维护者将审查您的代码
- 可能需要修改或补充内容
- 通过后将被合并

## 代码规范

### TypeScript

- 使用 TypeScript 进行所有代码开发
- 所有函数和组件必须有明确的类型定义
- 避免使用 `any` 类型，尽可能使用具体类型
- 导出的类型和接口需要编写文档注释

### Vue 3 组件

- 使用 Composition API (`<script setup>`)
- 使用 `defineProps` 和 `defineEmits` 定义接口
- 使用 `name` 选项命名组件
- 遵循单一职责原则

```typescript
// 推荐
defineProps<{
  width: number
  height: number
}>()

// 推荐：使用类型别名
interface Props {
  width: number
  height: number
}
const props = defineProps<Props>()
```

### CSS / 样式

- 使用 Scoped CSS 或 CSS Modules
- 避免使用全局选择器
- 遵循 BEM 命名约定（如果使用普通 CSS）
- 支持自定义 CSS 变量

### 错误处理

- 使用 try-catch 处理异步操作
- 提供有意义的错误信息
- 使用 `console.error` 或自定义错误处理器

### 代码示例

```typescript
// ✅ 推荐
export function useDraggable(
  element: Ref<HTMLElement | null>,
  options: DraggableOptions
): DragResult {
  // ...
}

// ❌ 避免
export function useDraggable(element: any, options: any): any {
  // ...
}
```

### ESLint 规则

项目使用以下 ESLint 配置：

- `eslint-plugin-vue`
- `@typescript-eslint`
- `prettier`

确保您的代码通过所有 ESLint 检查。

## 提交信息规范

我们使用 [Conventional Commits](https://www.commitspec.cer/) 规范。

### 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型 (Type)

| 类型 | 描述 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 添加/修改测试 |
| `chore` | 构建过程或辅助工具的变动 |
| `ci` | CI 配置文件和脚本的变动 |

### 作用域 (Scope)

可选，用于标识影响的模块：

- `drag-zoom` - 主拖拽缩放组件
- `directive` - 指令相关
- `hooks` - Hooks 相关
- `types` - 类型定义
- `docs` - 文档
- `demo` - 演示
- `none` - 影响范围较广或难以分类

### 示例

```
feat(drag-zoom): add touch support for mobile devices

- implement touch event handlers
- add pinch zoom detection
- improve touch responsiveness

Closes #123
```

```
fix(directive): prevent memory leak in v-drag-zoom

- properly clean up event listeners
- add beforeUnmount hook

Fixes #456
```

```
docs: update API documentation for version 2.0

- add new props examples
- improve TypeScript types documentation
```

### 提交信息检查

提交前可以使用以下命令验证：

```bash
# 使用 commitlint（如果已配置）
npx commitlint --edit "$1"
```

## 测试要求

### 测试策略

- **单元测试**：所有新增功能必须有对应的单元测试
- **集成测试**：核心功能需要集成测试
- **测试覆盖率**：保持测试覆盖率在 70% 以上

### 测试工具

- **Vitest**：主要测试框架
- **@vue/test-utils**：Vue 组件测试工具

### 测试文件命名

- 单元测试：`*.spec.ts`
- 组件测试：`*.test.ts`

### 测试覆盖率要求

- 新代码的测试覆盖率不低于 80%
- 不允许提交降低覆盖率的代码

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 监听模式运行测试
pnpm test:watch
```

### 测试示例

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { DragZoom } from './DragZoom'

describe('DragZoom', () => {
  it('should render correctly', () => {
    const wrapper = mount(DragZoom, {
      props: {
        width: 500,
        height: 500
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should emit events on drag', async () => {
    const wrapper = mount(DragZoom, {
      props: {
        width: 500,
        height: 500
      }
    })
    // 测试逻辑
  })
})
```

## 文档贡献

### 文档类型

- **README.md**：项目概述、安装、使用
- **docs/api.md**：API 文档
- **CHANGELOG.md**：版本更新日志（由维护者更新）
- **CONTRIBUTING.md**：贡献指南（本文件）

### 文档规范

- 使用 Markdown 格式
- 代码示例需要有语法高亮
- 复杂功能需要提供截图或 GIF
- 保持中英文术语一致性

### 更新日志

当提交包含破坏性变更或新功能时，请在 CHANGELOG.md 中添加相应的条目。

## 常见问题

### Q: 我需要先询问是否可以开始某个功能吗？

A: 建议先创建 issue 讨论您的想法，这有助于避免重复工作和确保方向正确。

### Q: PR 多久会被审查？

A: 通常在 1-3 个工作日内，但可能因维护者的时间而异。

### Q: 我的 PR 没有通过 CI 检查怎么办？

A: 检查 CI 日志，修复问题后可以重新提交。

### Q: 如何处理复杂的 PR？

A: 对于较大的改动，建议先提交草稿 PR（Draft PR），与维护者讨论后再完善。

## 联系方式

- **Issue**：https://github.com/AkiSun/vue3-drag-zoom/issues
- **讨论**：https://github.com/AkiSun/vue3-drag-zoom/discussions
- **作者**：AkiSun

## 致谢

感谢所有贡献者！

<a href="https://github.com/AkiSun/vue3-drag-zoom/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=AkiSun/vue3-drag-zoom" />
</a>
