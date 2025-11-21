// frontend/src/api.js
const BASE = localStorage.getItem("BASE_API") || "http://127.0.0.1:5000";

function qs(params) {
  if (!params) return "";
  const s = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => (v !== undefined && v !== null) && s.append(k, v));
  const str = s.toString();
  return str ? `?${str}` : "";
}

async function request(path, { method="GET", params=null, body=null, headers={} } = {}) {
  const token = localStorage.getItem("access_token");

  // 调试：确认带的 token（只打印前 12 位）
  if (token) console.debug("[api] token head:", token.slice(0, 12));

  const res = await fetch(`${BASE}${path}${qs(params)}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : null
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.status === "error") {
    const msg = json.message || json.msg || `HTTP ${res.status}`;  // ← 关键
    throw new Error(msg);
  }
  return json;
}


// ===== 具体 API =====
export const AuthAPI = {
  login:  (username, password) => request("/api/auth/login", { method:"POST", body:{ username, password } }),
  register: (username, password, role="student") => request("/api/auth/register", { method:"POST", body:{ username, password, role } }),
  profile: () => request("/api/auth/profile")
};

export const QuestionAPI = {
  list:  (p={}) => request("/api/question/list", { params: p }),
  detail:(id)   => request(`/api/question/detail/${id}`),
  // 兼容你 ask.js 的调用方式：传对象 {title, content, course_id}
  create:(data) => request("/api/question/create", { method:"POST", body: data })
};

export const AnswerAPI = {
  list: (question_id) => request("/api/answer/list", { params: { question_id } }),
  // 预留教师端
  create: (data) => request("/api/answer/create", { method:"POST", body: data })
};

export { request };
