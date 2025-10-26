import { QuestionAPI, AnswerAPI } from "./api.js";
import { goto } from "./router.js";

function getId() {
  return Number(new URLSearchParams(location.search).get("id") || 0);
}

document.addEventListener("DOMContentLoaded", async () => {
  // ← 返回首页
  document.querySelector('#btnBack, [data-action="back"]')
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      goto("home");
    });

  // 头像/昵称 → 个人中心
  document
    .querySelector('#avatarBtn, .avatar, [data-action="profile"]')
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      goto("profile");
    });

  // 加载详情 & 回答列表（无 id 时只绑定跳转，不报错）
  const id = getId();
  if (!id) return;

  try {
    const d = await QuestionAPI.detail(id);
    const q = d.data || {};
    const titleEl = document.querySelector("#title");
    const contentEl = document.querySelector("#content");
    if (titleEl) titleEl.textContent = q.title || "(无标题)";
    if (contentEl) contentEl.textContent = q.content || "";

    const a = await AnswerAPI.list(id);
    const box = document.querySelector("#answers");
    if (box) {
      box.innerHTML =
        (a.data || [])
          .map(
            (x) => `
        <div class="p-3 border rounded mb-2">
          <div class="text-gray-700">${x.content}</div>
          <div class="text-xs text-gray-400 mt-1">${new Date(
            x.created_at
          ).toLocaleString()}</div>
        </div>`
          )
          .join("") || `<div class="text-gray-400">暂时还没有回答</div>`;
    }
  } catch (e) {
    alert("加载失败：" + (e.message || "未知错误"));
  }
});
