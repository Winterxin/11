// frontend/src/router.js
export function isTeacherPage() {
  return location.pathname.includes("/public/teacher/");
}

export function userRole() {
  try {
    return (JSON.parse(localStorage.getItem("user") || "{}").role || "").toLowerCase();
  } catch {
    return "";
  }
}

export function baseToPublic(pathForStudent, pathForTeacher) {
  // 在 teacher 页内跳到 teacher/xxx，否则跳到 student 端
  return isTeacherPage()
    ? `../teacher/${pathForTeacher || pathForStudent}`
    : `./${pathForStudent}`;
}

// 通用跳转：name 可选 home / profile / ask / detail
export function goto(name, params = {}) {
  const query = new URLSearchParams(params).toString();
  let url = "";

  switch (name) {
    case "home":
      url =
        isTeacherPage() || userRole() === "teacher"
          ? "../teacher/TeacherHome.html"
          : "./home.html";
      break;

    case "profile":
      url = isTeacherPage()
        ? "../teacher/TeacherProfile.html"
        : "./profile.html";
      break;

    case "ask":
      // 学生：ask.html；教师：TeacherAnswer.html（可当答题入口）
      url = baseToPublic("ask.html", "TeacherAnswer.html");
      break;

    case "detail":
      // 学生：detail.html；教师：TeacherAnswer.html
      url = baseToPublic("detail.html", "TeacherAnswer.html");
      break;

    default:
      url = "./home.html";
  }

  if (query) url += (url.includes("?") ? "&" : "?") + query;
  location.href = url;
}
