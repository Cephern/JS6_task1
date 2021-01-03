const form_task1 = document.querySelector("#task1");
const form_task3 = document.querySelector("#task3");

form_task1.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.querySelector("#file_task1").files[0];
  let response = await fetch("/zip", {
    method: "POST",
    body: file,
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(await response.blob());
  a.download = "my.gz";
  form_task1.appendChild(a);
  a.click();
  a.remove();
});

form_task3.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.querySelector("#file_task3").files[0];
  let response = await fetch("/transform", {
    method: "POST",
    body: file,
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(await response.blob());
  a.download = "inc.txt";
  form_task3.appendChild(a);
  a.click();
  a.remove();
});
