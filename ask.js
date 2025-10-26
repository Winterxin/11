import { QuestionAPI } from "./api.js";
import { goto } from "./router.js";

function toast(msg, type = "info") {
  const el = document.querySelector("#msg");
  if (!el) return alert(msg);
  el.textContent = msg;
  el.className =
    type === "error"
      ? "text-red-500"
      : type === "success"
      ? "text-green-600"
      : "text-gray-600";
  setTimeout(() => {
    el.textContent = "";
    el.className = "";
  }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
  // 未登录 → 跳登录页
  if (!localStorage.getItem("access_token")) {
    location.href = "./login.html";
    return;
  }

  const btn = document.querySelector("#btn-submit");
  const titleEl = document.querySelector("#title");
  const contentEl = document.querySelector("#content");
  const courseSel = document.querySelector("#course");

  // 提交提问
  btn?.addEventListener("click", async () => {
    const title = titleEl?.value?.trim();
    const content = contentEl?.value?.trim();
    const course_id = Number(courseSel?.value || 1);

    if (!title || !content) return toast("请填写标题和内容", "error");

    btn.disabled = true;
    btn.textContent = "提交中...";

    try {
      const res = await QuestionAPI.create({ title, content, course_id });
      if (res.status === "success") {
        toast("提交成功", "success");
        setTimeout(() => goto("home"), 600);
      } else {
        toast(res.message || "提交失败", "error");
      }
    } catch (e) {
      console.error(e);
      toast("网络错误或登录过期", "error");
    } finally {
      btn.disabled = false;
      btn.textContent = "提交";
    }
  });

  // ← 返回首页（保持原逻辑）
  const backBtn = document.querySelector(
    "#btnBack, [data-action='back'], .back-btn, header a[href]"
  );
  backBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    goto("home");
  });
});
