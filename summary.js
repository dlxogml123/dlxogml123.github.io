const summary_li = document.querySelectorAll(".summary-li");

function openSummary() {
  const sum_id = this.id;
  const summary_icon = document.getElementById(sum_id + "-icon");
  const summary_content = document.getElementById(sum_id + "-content");
  // console.log(summary_icon);
  summary_icon.style.transform === "rotate(90deg)"
    ? (summary_icon.style.transform = "rotate(180deg)")
    : (summary_icon.style.transform = "rotate(90deg)");
  summary_content.style.display == "none"
    ? (summary_content.style.display = "flex")
    : (summary_content.style.display = "none");
}

summary_li.forEach((summary_li) =>
  summary_li.addEventListener("click", openSummary)
);

const select_grade_icon = document.querySelectorAll(".select-grade-icon");
let currentShow = null;

function show_grades() {
  const select_id = this.id;
  const box = document.querySelector("#" + this.id);
  select_grade_icon.forEach(function (otherbox) {
    otherbox.classList.remove("highlight");
  });

  const sbox = document.querySelectorAll(".summary-box");
  sbox.forEach(function (sbox) {
    sbox.classList.remove("fade-in");
    sbox.classList.remove("active");
  });

  box.classList.add("highlight");
  currentShow = "show";

  if (select_id == "grd-1-icon") {
    console.log(select_id);
    const summary_box = document.querySelectorAll(".grd-1");
    summary_box.forEach(function (sumbox) {
      sumbox.classList.add("fade-in");
      sumbox.classList.add("active");
    });
  } else if (select_id == "grd-2-icon") {
    console.log(select_id);
    const summary_box = document.querySelectorAll(".grd-2");
    summary_box.forEach(function (sumbox) {
      sumbox.classList.add("fade-in");
      sumbox.classList.add("active");
    });
  } else if (select_id == "grd-3-icon") {
    console.log(select_id);
    const summary_box = document.querySelectorAll(".grd-3");
    summary_box.forEach(function (sumbox) {
      sumbox.classList.add("fade-in");
      sumbox.classList.add("active");
    });
  } else if (select_id == "grd-4-icon") {
    console.log(select_id);
    const summary_box = document.querySelectorAll(".grd-4");
    summary_box.forEach(function (sumbox) {
      sumbox.classList.add("fade-in");
      sumbox.classList.add("active");
    });
  }
}

select_grade_icon.forEach((select_grade_icon) =>
  select_grade_icon.addEventListener("click", show_grades)
);
