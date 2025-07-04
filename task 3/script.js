const fileStructure = {
  name: "root",
  type: "folder",
  children: [
    { name: "index.html", type: "file" },
    {
      name: "assets",
      type: "folder",
      children: [
        { name: "logo.png", type: "file" },
        { name: "style.css", type: "file" }
      ]
    },
    {
      name: "scripts",
      type: "folder",
      children: [
        { name: "app.js", type: "file" },
        {
          name: "lib",
          type: "folder",
          children: [{ name: "utils.js", type: "file" }]
        }
      ]
    }
  ]
};

const fileTree = document.getElementById("file-tree");

function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'html':
      return '🟠';
    case 'css':
      return '🔵';
    case 'js':
      return '🟡'; 
    default:
      return '📄'; 
  }
}

function createTree(node) {
  const li = document.createElement("li");

  if (node.type === "folder") {
    li.classList.add("folder");
    li.textContent = node.name;

    const ul = document.createElement("ul");
    node.children?.forEach(child => {
      ul.appendChild(createTree(child));
    });

    ul.classList.add("hidden");
    li.appendChild(ul);

    li.addEventListener("click", (e) => {
      e.stopPropagation();
      ul.classList.toggle("hidden");
    });
  } else {
    const icon = getFileIcon(node.name);
    li.classList.add("file");
    li.textContent = `${icon} ${node.name}`;
  }

  return li;
}

const rootUl = document.createElement("ul");
rootUl.appendChild(createTree(fileStructure));
fileTree.appendChild(rootUl);
