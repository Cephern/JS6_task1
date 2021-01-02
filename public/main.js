const btn = document.querySelector("button");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.querySelector("input").files[0];
  let response = await fetch("/zip", {
    method: "POST",
    body: file,
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(await response.blob());
  a.download = "my.gz";
  form.appendChild(a);
  a.click();
  a.remove();
});
