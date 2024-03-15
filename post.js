// Ajoute un projet au DOM
const addProjectToDOM = (project) => {
  const newFigure = createFigure(project);
  const sectionProjet = document.querySelector(".projets");
  sectionProjet.appendChild(newFigure);

  const imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img-container");
  imgContainer.setAttribute("data-id", project.id);
  imgContainer.innerHTML = `${
    newFigure.querySelector("img").outerHTML
  }<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>`;

  const modalProjects = document.getElementById("existing-projects");
  modalProjects.appendChild(imgContainer);
};

// FORMULAIRE D'AJOUT DE PROJET

// Validation et envoi du formulaire d'ajout de projet
const formPostProject = document.querySelector("#add-photo-form");
if (formPostProject) {
  formPostProject.addEventListener("submit", async function (event) {
    event.preventDefault();

    const imageUpload = document.getElementById("image").files[0];
    const projectTitle = document.getElementById("title").value;
    const projectCategory = document.getElementById("project-category").value;

    if (!imageUpload || !projectTitle || !projectCategory) {
      document.getElementById("form-error-message").classList.remove("hidden");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageUpload);
    formData.append("title", projectTitle);
    formData.append("category", projectCategory);

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const successMessage = document.getElementById("form-success-message");
      successMessage.classList.remove("hidden");
      setTimeout(function () {
        successMessage.classList.add("hidden");
        toggleModal(false);
      }, 1000);
      const newProject = await response.json();
      addProjectToDOM(newProject);
    } else {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  });
}

// Téléchargement de l'image
const uploadImage = () => {
  const imageUploadButton = document.getElementById("image-upload-btn");
  const imageInputElement = document.getElementById("image");
  if (imageUploadButton && imageInputElement) {
    imageUploadButton.addEventListener("click", (e) => {
      e.preventDefault();
      imageInputElement.click();
    });
    imageInputElement.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgElem = document.getElementById("uploaded-image");
          imgElem.src = e.target.result;
          imgElem.style.display = "block";
          document.getElementById("image-upload-icon").style.display = "none";
          document.getElementById("image-upload-btn").style.display = "none";
          document.getElementById("file-info-text").style.display = "none";
          imgElem.addEventListener("click", () => {
            imageInputElement.click();
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }
};
