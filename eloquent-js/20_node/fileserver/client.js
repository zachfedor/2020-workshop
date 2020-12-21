class FileEditor {
  constructor(path) {
    this.selected = path;

    this.createForm();
    this.getPath();
  }

  createForm() {
    this.form = document.createElement("form");
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    const selectLbl = document.createElement("label");
    selectLbl.textContent = "Choose a file/directory:";
    this.form.appendChild(selectLbl);

    this.select = document.createElement("select");
    this.select.addEventListener("change", (e) => this.handleSelect(e));
    selectLbl.appendChild(this.select);
    this.fillSelect([]);

    this.textarea = document.createElement("textarea");
    this.form.appendChild(this.textarea);

    const button = document.createElement("input");
    button.type = "submit";
    button.value = "Save";
    this.form.appendChild(button);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const resp = await fetch(this.selected, {
      method: "PUT",
      body: this.textarea.value,
    });

    // TODO: error handling
  }

  fillSelect(files) {
    this.select.textContent = "";

    // TODO: if not root, add .. link to parent directory
    files.unshift("/");

    files.forEach((f) => {
      const option = document.createElement("option");
      option.textContent = option.value = f;
      option.selected = f === this.selected;
      this.select.appendChild(option);
    });
  }

  handleSelect(event) {
    this.selected = event.target.value;
    this.getPath();
  }

  async getPath() {
    const resp = await fetch(this.selected);

    let data;
    if (resp.headers.contentType == "application/json") {
      data = await resp.json();
    } else {
      data = await resp.text();
    }

    if (resp.url[resp.url.length - 1] == "/") {
      this.fillSelect(data.split("\n"));
    } else {
      this.textarea.value = data;
    }
  }
}

const editor = new FileEditor("/");
document.querySelector("#editor").appendChild(editor.form);
