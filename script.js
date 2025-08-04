class CardGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.updatePreview();
    }

    initializeElements() {
        // 表单元素
        this.avatarInput = document.getElementById('avatar');
        this.nameInput = document.getElementById('name');
        this.professionInput = document.getElementById('profession');
        this.locationInput = document.getElementById('location');
        this.greetingInput = document.getElementById('greeting');
        this.educationInput = document.getElementById('education');
        this.experienceInput = document.getElementById('experience');
        this.githubInput = document.getElementById('github');
        this.projectsInput = document.getElementById('projects');

        // 预览元素
        this.previewAvatar = document.getElementById('previewAvatar');
        this.previewName = document.getElementById('previewName');
        this.previewProfession = document.getElementById('previewProfession');
        this.previewGreeting = document.getElementById('previewGreeting');
        this.previewEducation = document.getElementById('previewEducation');
        this.previewExperience = document.getElementById('previewExperience');
        this.previewGithub = document.getElementById('previewGithub');
        this.previewProjects = document.getElementById('previewProjects');

        // 按钮和其他元素
        this.downloadBtn = document.getElementById('downloadBtn');
        this.copyCodeBtn = document.getElementById('copyCodeBtn');
        this.copyCodeDirectBtn = document.getElementById('copyCodeDirectBtn');
        this.uploadArea = document.querySelector('.upload-area');
        this.htmlCodeElement = document.getElementById('htmlCode');
        
        // 头像相关元素
        this.avatarTabs = document.querySelectorAll('.avatar-tab');
        this.avatarUrlInput = document.getElementById('avatarUrl');
        this.uploadSection = document.getElementById('uploadSection');
        this.urlSection = document.getElementById('urlSection');
        
        // 自定义项目相关元素
        this.addItemBtn = document.getElementById('addItemBtn');
        this.customItemsList = document.getElementById('customItemsList');
        this.customItems = [];
        
        // 标签页元素
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
    }

    bindEvents() {
        // 实时更新预览
        const inputs = [
            this.nameInput,
            this.professionInput,
            this.locationInput,
            this.greetingInput,
            this.educationInput,
            this.experienceInput,
            this.githubInput,
            this.projectsInput
        ];

        inputs.forEach(input => {
            input.addEventListener('input', () => this.updatePreview());
        });

        // 头像上传
        this.avatarInput.addEventListener('change', (e) => this.handleAvatarUpload(e));
        this.avatarUrlInput.addEventListener('input', () => this.handleAvatarUrl());

        // 头像选项卡切换
        this.avatarTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchAvatarTab(e.target.dataset.type));
        });

        // 自定义项目
        this.addItemBtn.addEventListener('click', () => this.addCustomItem());

        // 下载按钮
        this.downloadBtn.addEventListener('click', () => this.downloadCard());

        // 复制代码按钮
        this.copyCodeBtn.addEventListener('click', () => this.copyCode());
        this.copyCodeDirectBtn.addEventListener('click', () => this.copyCodeDirect());

        // 标签页切换
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // 拖拽上传
        this.setupDragAndDrop();
    }

    updatePreview() {
        // 更新预览内容
        this.previewName.textContent = this.nameInput.value || 'ziwen';
        
        // 合并职业和地理位置
        const profession = this.professionInput.value || '';
        const location = this.locationInput.value || '';
        const combinedText = profession + (profession && location ? '·' : '') + location;
        this.previewProfession.textContent = combinedText || 'AI 决策·developer·中国 北京 北京市·他';

        this.previewGreeting.textContent = this.greetingInput.value || '👋哈喽我是QingJ';
        this.previewEducation.textContent = this.educationInput.value || '🏫西安电子科技大学｜大一｜软件工程';
        this.previewExperience.textContent = this.experienceInput.value || '💼腾讯->阿里->字节｜转码';
        this.previewGithub.textContent = this.githubInput.value || '👨‍💻GitHub@QingJ01';
        this.previewProjects.textContent = this.projectsInput.value || '✨@123pan_unlock｜Search_clear';
        
        // 更新自定义项目
        this.updateCustomItemsPreview();
        
        // 更新HTML代码
        this.updateHtmlCode();
    }

    switchAvatarTab(type) {
        // 切换头像选项卡
        this.avatarTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.type === type) {
                tab.classList.add('active');
            }
        });

        // 切换内容区域
        if (type === 'upload') {
            this.uploadSection.classList.add('active');
            this.urlSection.classList.remove('active');
        } else {
            this.uploadSection.classList.remove('active');
            this.urlSection.classList.add('active');
        }
    }

    handleAvatarUrl() {
        const url = this.avatarUrlInput.value.trim();
        if (url) {
            // 验证URL格式
            try {
                new URL(url);
                this.previewAvatar.src = url;
                this.previewAvatar.onerror = () => {
                    this.showNotification('头像链接无效或无法加载！', 'error');
                };
            } catch (error) {
                this.showNotification('请输入有效的URL地址！', 'error');
            }
        }
    }

    addCustomItem() {
        const itemId = 'custom_' + Date.now();
        const customItem = {
            id: itemId,
            value: ''
        };
        
        this.customItems.push(customItem);
        
        const itemElement = document.createElement('div');
        itemElement.className = 'custom-item';
        itemElement.innerHTML = `
            <input type="text" placeholder="请输入自定义信息项" data-id="${itemId}">
            <button type="button" class="remove-btn" data-id="${itemId}">×</button>
        `;
        
        this.customItemsList.appendChild(itemElement);
        
        // 绑定事件
        const input = itemElement.querySelector('input');
        const removeBtn = itemElement.querySelector('.remove-btn');
        
        input.addEventListener('input', (e) => {
            const item = this.customItems.find(item => item.id === itemId);
            if (item) {
                item.value = e.target.value;
                this.updatePreview();
            }
        });
        
        removeBtn.addEventListener('click', () => {
            this.removeCustomItem(itemId);
        });
    }

    removeCustomItem(itemId) {
        // 从数组中移除
        this.customItems = this.customItems.filter(item => item.id !== itemId);
        
        // 从DOM中移除
        const itemElement = document.querySelector(`[data-id="${itemId}"]`).closest('.custom-item');
        if (itemElement) {
            itemElement.remove();
        }
        
        // 更新预览
        this.updatePreview();
    }

    updateCustomItemsPreview() {
        // 移除现有的自定义项目预览
        const existingCustomItems = document.querySelectorAll('.custom-item-preview');
        existingCustomItems.forEach(item => item.remove());
        
        // 添加新的自定义项目预览
        const infoList = document.querySelector('.info-list');
        this.customItems.forEach(item => {
            if (item.value.trim()) {
                const previewElement = document.createElement('div');
                previewElement.className = 'info-item custom-item-preview';
                previewElement.textContent = item.value;
                infoList.appendChild(previewElement);
            }
        });
    }

    switchTab(tabName) {
        // 切换标签页按钮状态
        this.tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // 切换标签页内容
        this.tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabName + 'Tab') {
                content.classList.add('active');
            }
        });
    }

    updateHtmlCode() {
        const avatarSrc = this.previewAvatar.src;
        const name = this.previewName.textContent;
        const profession = this.previewProfession.textContent;
        const greeting = this.previewGreeting.textContent;
        const education = this.previewEducation.textContent;
        const experience = this.previewExperience.textContent;
        const github = this.previewGithub.textContent;
        const projects = this.previewProjects.textContent;

        // 生成自定义项目的HTML
        let customItemsHtml = '';
        this.customItems.forEach(item => {
            if (item.value.trim()) {
                customItemsHtml += `                <div class="info-item">${item.value}</div>\n`;
            }
        });

        const htmlCode = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}的个人介绍卡片</title>
    <style>
        .card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #f1f5f9;
            width: 100%;
            max-width: 400px;
            margin: 2rem auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
        }
        .avatar-container {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #f1f5f9;
            background: #f8fafc;
        }
        .avatar-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .social-icons {
            display: flex;
            gap: 0.5rem;
            opacity: 0.6;
        }
        .social-icons span {
            font-size: 1.25rem;
        }
        .name {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.5rem;
        }
        .profession {
            color: #64748b;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        }
        .info-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .info-item {
            font-size: 0.875rem;
            line-height: 1.5;
            color: #374151;
            padding: 0.25rem 0;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="card-header">
            <div class="avatar-container">
                <img src="${avatarSrc}" alt="${name}的头像">
            </div>
            <div class="social-icons">
                <span>💬</span>
                <span>🔗</span>
            </div>
        </div>
        
        <div class="card-content">
            <h2 class="name">${name}</h2>
            <p class="profession">${profession}</p>
            
            <div class="info-list">
                <div class="info-item">${greeting}</div>
                <div class="info-item">${education}</div>
                <div class="info-item">${experience}</div>
                <div class="info-item">${github}</div>
                <div class="info-item">${projects}</div>
${customItemsHtml}            </div>
        </div>
    </div>
</body>
</html>`;

        this.htmlCodeElement.textContent = htmlCode;
    }

    async copyCode() {
        this.updateHtmlCode();
        try {
            await navigator.clipboard.writeText(this.htmlCodeElement.textContent);
            this.showNotification('HTML代码已复制到剪贴板！', 'success');
            // 自动切换到代码标签页
            this.switchTab('code');
        } catch (error) {
            console.error('复制失败:', error);
            this.showNotification('复制失败，请手动复制！', 'error');
        }
    }

    async copyCodeDirect() {
        try {
            await navigator.clipboard.writeText(this.htmlCodeElement.textContent);
            this.showNotification('HTML代码已复制到剪贴板！', 'success');
        } catch (error) {
            console.error('复制失败:', error);
            this.showNotification('复制失败，请手动复制！', 'error');
        }
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                this.showNotification('请选择图片文件！', 'error');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('图片文件不能超过5MB！', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewAvatar.src = e.target.result;
                this.uploadArea.innerHTML = '<span>头像已上传</span>';
            };
            reader.readAsDataURL(file);
        }
    }

    async downloadCard() {
        try {
            if (typeof html2canvas === 'undefined') {
                await this.loadHtml2Canvas();
            }

            this.downloadBtn.textContent = '生成中...';
            this.downloadBtn.disabled = true;

            const card = document.querySelector('.card');
            const canvas = await html2canvas(card, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true,
                allowTaint: true
            });

            const link = document.createElement('a');
            link.download = `个人介绍卡片_${this.nameInput.value || 'card'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            this.showNotification('图片下载成功！', 'success');
        } catch (error) {
            console.error('下载失败:', error);
            this.showNotification('下载失败，请重试！', 'error');
        } finally {
            this.downloadBtn.textContent = '下载卡片';
            this.downloadBtn.disabled = false;
        }
    }

    loadHtml2Canvas() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupDragAndDrop() {
        const uploadArea = this.uploadArea;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.style.borderColor = '#3b82f6';
                uploadArea.style.background = '#f0f9ff';
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.style.borderColor = '#d1d5db';
                uploadArea.style.background = '#fafafa';
            }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    this.avatarInput.files = files;
                    this.handleAvatarUpload({ target: { files: [file] } });
                }
            }
        }, false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new CardGenerator();
});

// 快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('downloadBtn').click();
    }
});

