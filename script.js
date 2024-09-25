let id = 0;
let deleteMode = false;

const notes = {};

addItem("Test");

// inputfield 높이 오버 시 스크롤

$("#editMode").hide();

$("#addBtn").click(function() {
  if($("#searchBar").val()) {
    addItem($("#searchBar").val());
  }
  $("#searchBar").val("");
});

function addItem(name) {
  const item = $(`<li class='item' _id="${id}">${name}</li>`);
  item.append('<input type="checkbox">');
  
  $("#itemArea").append(item);
  notes[id] = {"title": btoa(name), "content": ""};
  id++;
}

$("#deleteBtn").click(function() {
  deleteMode = !deleteMode;
  $(".item>input").toggle();
  
  $("#searchBar").prop('disabled', deleteMode);
});


$("#itemArea").on("change", ".item>input",function() {
  const p = $(this).parent();
  p.addClass("delete");
  gsap.to(p, {
    boxShadow: "inset -500px 0 0 0px rgb(255, 204, 203)",
    duration: 1,
    ease: "elastic",
    onCompleteParams:[p],
    onComplete:deleteItem 
  });
});

function deleteItem(item) {
  item.remove();
}

$("#searchBtn").click(function() {
  const searchTxt = $("#searchBar").val();
  const showItem = [];
  const hideItem = [];
  
  $(".item").toArray().forEach((item) => $(item).text().includes(searchTxt) ? showItem.push($(item)) : hideItem.push($(item)));
  
  showItem.forEach((item) => $(item).fadeIn(300));
  hideItem.forEach((item) => $(item).fadeOut(300));
});

$("#itemArea").on("click", ".item",function() {
  if(deleteMode) {
    return;
  }
  changeArea();
  loadData($(this).attr("_id"));
});

$("#cancelBtn").click(function() {
  changeArea();
});

$("#saveBtn").click(function() {
  if(!$("#titleInput").val()) {
    alert("제목을 입력해주세요.");
    return;
  }
  
  const id = $("#titleInput").attr("_id");
  const title = btoa($("#titleInput").val());
  const content = btoa($("#itemContent").val());
  notes[id].title = title;
  notes[id].content = content;
  alert("저장되었습니다.");
  
  changeArea();
});

function changeArea() {
  $(".frame").toggle();
  $("#deleteBtn").toggle();
  $("#editOnly").toggle();
}

function loadData(id) {
  $("#titleInput").attr("_id", id);
  console.log(notes[id]);
  $("#titleInput").val(atob(notes[id].title));
  $("#itemContent").val(atob(notes[id].content));
}