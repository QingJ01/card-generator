# 个人介绍卡片生成器

一个简洁美观的在线个人介绍卡片生成工具，支持实时预览、代码导出和图片下载。

![项目预览](https://via.placeholder.com/800x400/3b82f6/ffffff?text=个人介绍卡片生成器)

## ✨ 功能特性

### 🎨 卡片定制
- **个人信息填写**：姓名、职业、地理位置等基础信息
- **头像支持**：支持本地图片上传和外链地址两种方式
- **自定义信息项**：可动态添加任意数量的个人信息项
- **实时预览**：所有修改实时反映在卡片预览中

### 📱 多种导出方式
- **图片下载**：将卡片导出为高清PNG图片
- **HTML代码**：生成包含完整样式的独立HTML文件
- **一键复制**：快速复制HTML代码到剪贴板

### 🎯 用户体验
- **响应式设计**：完美适配桌面端和移动端
- **拖拽上传**：支持拖拽图片到上传区域
- **标签页切换**：预览效果和代码查看无缝切换
- **实时通知**：操作反馈和错误提示

## 🚀 快速开始

### 在线使用
直接访问：[个人介绍卡片生成器](https://your-domain.com)

### 本地部署

1. **克隆项目**
```bash
git clone https://github.com/CodeBuddy-AI/card-generator.git
cd card-generator
```

2. **启动服务**
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用PHP
php -S localhost:8000
```

3. **访问应用**
打开浏览器访问 `http://localhost:8000`

## 📖 使用指南

### 基础信息填写
1. **头像设置**
   - 点击"上传图片"选择本地图片
   - 或切换到"外链地址"输入图片URL
   - 支持拖拽上传

2. **个人信息**
   - 填写姓名、职业、地理位置
   - 添加个人介绍、教育背景、工作经历
   - 输入GitHub和项目信息

### 自定义信息项
1. 点击"+ 添加项目"按钮
2. 在新出现的输入框中填写自定义信息
3. 点击"×"按钮可删除不需要的项目

### 导出卡片
1. **下载图片**：点击"下载卡片"按钮保存PNG图片
2. **复制代码**：点击"复制代码"按钮获取HTML代码
3. **查看代码**：切换到"HTML代码"标签页查看完整代码

## 🛠️ 技术栈

- **前端框架**：原生HTML5 + CSS3 + JavaScript ES6+
- **样式方案**：CSS Grid + Flexbox 响应式布局
- **图片处理**：html2canvas 库用于图片导出
- **图标系统**：SVG矢量图标
- **字体**：系统字体栈，优先使用苹方、微软雅黑

## 📁 项目结构

```
card-generator/
├── index.html          # 主页面文件
├── style.css           # 样式文件
├── script.js           # 脚本文件
├── README.md           # 项目说明文档
└── assets/             # 静态资源目录
    └── images/         # 图片资源
```

## 🎨 设计理念

### 视觉设计
- **简洁现代**：采用现代化的卡片式设计
- **色彩搭配**：使用蓝色主色调，灰白色辅助色
- **字体层级**：清晰的信息层级和字体大小
- **圆角阴影**：柔和的圆角和阴影效果

### 交互设计
- **直观操作**：所见即所得的编辑体验
- **即时反馈**：实时预览和操作提示
- **容错处理**：友好的错误提示和异常处理
- **快捷操作**：支持键盘快捷键

## 🔧 自定义开发

### 修改样式
编辑 `style.css` 文件来自定义卡片样式：

```css
/* 修改卡片主色调 */
.btn-primary {
    background: #your-color;
}

/* 修改卡片圆角 */
.card {
    border-radius: 20px;
}
```

### 添加功能
在 `script.js` 中扩展功能：

```javascript
// 添加新的信息项类型
addCustomField(type, placeholder) {
    // 自定义实现
}
```

### 修改布局
调整 `index.html` 结构来改变布局：

```html
<!-- 添加新的表单项 -->
<div class="form-group">
    <label for="newField">新字段</label>
    <input type="text" id="newField" placeholder="请输入...">
</div>
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 提交问题
- 使用 [GitHub Issues](https://github.com/CodeBuddy-AI/card-generator/issues) 报告bug
- 提出新功能建议
- 改进文档

### 提交代码
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范
- 使用语义化的提交信息
- 保持代码风格一致
- 添加必要的注释
- 确保响应式兼容性

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢 [html2canvas](https://html2canvas.hertzen.com/) 提供图片导出功能
- 感谢所有贡献者的支持和建议
- 特别感谢 CodeBuddy AI 团队的技术支持

## 📞 联系我们

- **GitHub**: [CodeBuddy-AI](https://github.com/CodeBuddy-AI)
- **QQ交流群**: 123456789
- **技术支持**: [CodeBuddy AI](https://codebuddy.ai)

## 🔄 更新日志

### v1.0.0 (2024-01-30)
- ✨ 初始版本发布
- 🎨 基础卡片生成功能
- 📱 响应式设计
- 💾 图片下载和代码导出

### v1.1.0 (2024-01-30)
- ✨ 新增头像外链支持
- 🔧 自定义信息项功能
- 🎨 优化UI设计
- 🐛 修复已知问题

---

⭐ 如果这个项目对你有帮助，请给我们一个星标！

Made with ❤️ by [CodeBuddy AI](https://codebuddy.ai)