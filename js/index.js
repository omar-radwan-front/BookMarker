









// جلب العناصر من الـ DOM
var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");

// مصفوفة لحفظ المواقع
var sites = [];

// تحميل البيانات من Local Storage لو موجودة
if (localStorage.getItem("sites")) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySites();
}

// Regex لأنماط التحقق
 var namePattern = /^[a-zA-Z0-9 ]{3,}$/;
 var urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)$/;

// التحقق من صحة البيانات
function validateInputs(name, url) {
  var isValid = true;

  if (!namePattern.test(name.trim())) {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    isValid = false;
  } else {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  }

  if (!urlPattern.test(url.trim())) {
    siteURLInput.classList.add("is-invalid");
    siteURLInput.classList.remove("is-valid");
    isValid = false;
  } else {
    siteURLInput.classList.remove("is-invalid");
    siteURLInput.classList.add("is-valid");
  }

  return isValid;
}

// التحقق الفوري أثناء الكتابة في الحقول
siteNameInput.addEventListener("input", function () {
  if (!namePattern.test(siteNameInput.value.trim())) {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
  } else {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  }
});

siteURLInput.addEventListener("input", function () {
  if (!urlPattern.test(siteURLInput.value.trim())) {
    siteURLInput.classList.add("is-invalid");
    siteURLInput.classList.remove("is-valid");
  } else {
    siteURLInput.classList.remove("is-invalid");
    siteURLInput.classList.add("is-valid");
  }
});

// تنظيف الحقول بعد الإضافة
function clearInputs() {
  siteNameInput.value = "";
  siteURLInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteURLInput.classList.remove("is-valid", "is-invalid");
}

// عرض المواقع في الجدول
function displaySites() {
  var table = "";
  for (var i = 0; i < sites.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${sites[i].name}</td>
        <td><a href="${sites[i].url}" target="_blank" class="px-3 py-2 btn btn-success btn-sm">Visit <i class="fa-solid fa-eye"></i></a></td>
        <td><button onclick="deleteSite(${i})" class="px-3 py-2   btn btn-danger btn-sm">Delete <i class ="fas fa-trash"></i></i></button></td>
      </tr>
    `;
  }
  tableContent.innerHTML = table;
}

// حذف موقع
function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
}

// عند الضغط على زر الإضافة
submitBtn.onclick = function () {
  var siteName = siteNameInput.value;
  var siteURL = siteURLInput.value;

  if (!validateInputs(siteName, siteURL)) return;

  var fullURL = siteURL.startsWith("http") ? siteURL : "https://" + siteURL;

  var site = {
    name: siteName,
    url: fullURL
  };

  sites.push(site);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
  clearInputs();
};