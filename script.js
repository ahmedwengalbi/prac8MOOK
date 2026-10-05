// ============================================
// ПР №8. Валидация формы регистрации
// ============================================

const form = document.getElementById("regForm");
const result = document.getElementById("result");

// Список полей для проверки
const fields = ["name", "email", "password", "age", "city", "agree"];

// Показать ошибку под полем
function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorEl = document.querySelector(`.error[data-for="${fieldName}"]`);
  if (errorEl) errorEl.textContent = message;
  if (field && field.type !== "checkbox") {
    field.classList.add("invalid");
  }
}

// Убрать ошибку
function clearError(fieldName) {
  const field = document.getElementById(fieldName);
  const errorEl = document.querySelector(`.error[data-for="${fieldName}"]`);
  if (errorEl) errorEl.textContent = "";
  if (field) field.classList.remove("invalid");
}

// Проверить одно поле
function validateField(fieldName) {
  const field = document.getElementById(fieldName);
  if (!field) return true;

  clearError(fieldName);

  // required
  if (field.required && !field.checked && field.type === "checkbox") {
    showError(fieldName, "Поставьте галочку, чтобы продолжить");
    return false;
  }

  if (field.required && field.value.trim() === "") {
    showError(fieldName, "Это поле обязательно");
    return false;
  }

  // email
  if (fieldName === "email" && field.value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(field.value)) {
      showError(fieldName, "Введите корректный email");
      return false;
    }
  }

  // password
  if (fieldName === "password" && field.value) {
    if (field.value.length < 6) {
      showError(fieldName, "Пароль должен быть не короче 6 символов");
      return false;
    }
  }

  // age
  if (fieldName === "age" && field.value !== "") {
    const age = Number(field.value);
    if (isNaN(age) || age < 18 || age > 99) {
      showError(fieldName, "Возраст должен быть от 18 до 99");
      return false;
    }
  }

  return true;
}

// Валидация при потере фокуса и при вводе
fields.forEach((name) => {
  const field = document.getElementById(name);
  if (!field) return;

  field.addEventListener("blur", () => validateField(name));
  field.addEventListener("input", () => {
    if (field.classList.contains("invalid")) {
      validateField(name);
    }
  });
});

// Обработка отправки формы
form.addEventListener("submit", function (event) {
  event.preventDefault(); // отменяем стандартную отправку

  let ok = true;
  fields.forEach((name) => {
    if (!validateField(name)) ok = false;
  });

  if (!ok) {
    result.style.color = "#d7263d";
    result.textContent = "Проверьте выделенные поля";
    return;
  }

  // Имитация успешной отправки
  const name = document.getElementById("name").value.trim();
  result.style.color = "#2f9e44";
  result.textContent = "Спасибо, " + name + "! Форма отправлена ✅";

  form.reset();
});
