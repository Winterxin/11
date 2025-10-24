// 模拟AI对话功能
    document.addEventListener('DOMContentLoaded', function() {
      const chatContainer = document.getElementById('chatContainer');
      const questionInput = document.getElementById('questionInput');
      const sendBtn = document.getElementById('sendBtn');

      // 发送提问
      function sendQuestion() {
        const question = questionInput.value.trim();
        if (!question) return;

        // 添加用户提问到对话区
        const userBubble = document.createElement('div');
        userBubble.className = 'flex items-start justify-end mb-6';
        userBubble.innerHTML = `
          <div class="ai-bubble bg-primary text-white">
            <p>${question}</p>
          </div>
        `;
        chatContainer.appendChild(userBubble);

        // 清空输入框并滚动到底部
        questionInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 显示AI正在输入
        const typingBubble = document.createElement('div');
        typingBubble.className = 'flex items-start mb-6';
        typingBubble.innerHTML = `
          <div class="w-10 h-10 rounded-full bg-ai/10 flex items-center justify-center text-ai flex-shrink-0 mr-3">
            <i class="fa fa-robot"></i>
          </div>
          <div class="ai-bubble bg-aiLight text-dark">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        `;
        chatContainer.appendChild(typingBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 模拟AI回复延迟
        setTimeout(() => {
          // 移除"正在输入"状态
          chatContainer.removeChild(typingBubble);

          // 生成AI回复（实际项目中应调用API）
          const aiReply = generateAIReply(question);
          const aiBubble = document.createElement('div');
          aiBubble.className = 'flex items-start mb-6';
          aiBubble.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-ai/10 flex items-center justify-center text-ai flex-shrink-0 mr-3">
              <i class="fa fa-robot"></i>
            </div>
            <div class="ai-bubble bg-aiLight text-dark">
              ${aiReply}
            </div>
          `;
          chatContainer.appendChild(aiBubble);
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1500);
      }

      // 模拟AI回复生成（实际项目中替换为API调用）
      function generateAIReply(question) {
        // 简单匹配问题关键词，返回对应回复
        if (question.includes('洛必达') && question.includes('错误案例')) {
          return `
            <p>强行使用会导致结果错误，比如这个案例：</p>
            <p class="mt-2 font-medium">求lim(x→1) (x³+2x-3)/(x²-1)</p>
            <p class="mt-1">这是"0/0"型，正确解法：</p>
            <p class="mt-1 pl-3">1. 因式分解：原式=lim(x→1)(x-1)(x²+x+3)/[(x-1)(x+1)] = lim(x→1)(x²+x+3)/(x+1) = 5/2</p>
            <p class="mt-2">若错误使用洛必达法则两次：</p>
            <p class="mt-1 pl-3">1. 第一次求导：(3x²+2)/(2x) → 代入x=1得5/2（结果正确但过程冗余）</p>
            <p class="mt-1 pl-3">2. 若继续错误求导：6x/2 → 代入x=1得3（结果错误）</p>
            <p class="mt-2">错误原因：第一次求导后已不是不定式，继续使用违反条件。</p>
          `;
        } else {
          return `<p>感谢你的提问！关于"${question}"，我可以为你提供详细解答。</p>
                  <p class="mt-2">由于问题涉及专业知识点，建议你提供更多背景信息（如课程章节、具体例题），我会给出更精准的解析～</p>`;
        }
      }

      // 绑定发送事件
      sendBtn.addEventListener('click', sendQuestion);
      questionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendQuestion();
        }
      });

      // 快捷提问按钮
      document.querySelectorAll('.text-xs.bg-gray-100').forEach(btn => {
        btn.addEventListener('click', () => {
          questionInput.value = btn.textContent.trim();
          questionInput.focus();
        });
      });
    });