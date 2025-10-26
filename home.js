import { QuestionAPI } from "./api.js";
import { goto } from "./router.js";

// 头像 → 个人中心
function bindAvatar() {
  const el = document.querySelector('#avatarBtn, .avatar, [data-action="profile"]');
  el?.addEventListener("click", (e) => {
    e.preventDefault();
    goto("profile");
  });
}

// 右下角 + → 提问页
function bindFab() {
  const el = document.querySelector('#fabAsk, .fab, [data-action="ask"]');
  el?.addEventListener("click", (e) => {
    e.preventDefault();
    goto("ask");
  });
}

// 列表卡片/标题 → 详情页（事件委托）
function bindListToDetail() {
  const list = document.querySelector("#list, [data-list='questions']");
  if (!list) return;
  list.addEventListener("click", (e) => {
    const t =
      e.target.closest("[data-qid]") ||
      e.target.closest("a[href*='detail']") ||
      e.target.closest(".question-card h4");
    if (!t) return;
    e.preventDefault();

    const qidAttr = t.getAttribute("data-qid");
    let id = qidAttr;
    if (!id && t.getAttribute && t.getAttribute("href")) {
      id = new URL(t.getAttribute("href"), location.href).searchParams.get("id");
    }
    if (id) goto("detail", { id });
    else goto("detail");
  });
}

// （可选）接口渲染
function itemTpl(q) {
  return `<div class="block p-4 border rounded-lg hover:shadow transition question-card" data-qid="${q.id}">
    <h4 class="font-medium">${q.title}</h4>
    <div class="text-sm text-gray-500 mt-1">${q.excerpt || ""}</div>
    <div class="text-xs text-gray-400 mt-1">${q.status} · ${new Date(q.created_at).toLocaleString()}</div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", async () => {
  bindAvatar();
  bindFab();
  bindListToDetail();

  // 想显示真实列表再放开：
  // const box = document.querySelector("#list");
  // if (box) {
  //   try {
  //     const res = await QuestionAPI.list({});
  //     box.innerHTML = res.data.map(itemTpl).join("") || `<div class="text-gray-400">暂无问题</div>`;
  //   } catch (e) {
  //     box.innerHTML = `<div class="text-red-500">加载失败：${e.message}</div>`;
  //   }
  // }
});
