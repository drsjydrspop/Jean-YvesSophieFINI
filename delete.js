// Supprime un projet du DOM
const deleteProjectFromDOM = (projectId) => {
  // Sélectionne l'élément du projet dans le modal d'édition par son data-id
  const modalProject = document.querySelector(
    `#existing-projects .img-container[data-id="${projectId}"]`
  );

  // Sélectionne l'élément du projet dans la galerie principale par son data-id
  const galleryProject = document.querySelector(
    `.projets figure[data-id="${projectId}"]`
  );

  // Si l'élément existe dans le modal, le supprime du DOM
  if (modalProject) {
    modalProject.remove();
  }

  // Si l'élément existe dans la galerie, le supprime du DOM
  if (galleryProject) {
    galleryProject.remove();
  }
};

// Attache l'écouteur d'événements pour supprimer des projets
const deleteWorks = () => {
  // Sélectionne l'élément conteneur pour les projets existants
  const deleteExistingProjects = document.getElementById("existing-projects");

  // Si l'élément existe, attache un écouteur d'événements de clic
  if (deleteExistingProjects) {
    deleteExistingProjects.addEventListener("click", async function (event) {
      // Empêche le comportement par défaut et la propagation de l'événement
      event.preventDefault();
      event.stopPropagation();
      // Trouve l'élément img-container le plus proche du clic, s'il existe
      const imgContainer = event.target.closest(".img-container");
      // Vérifie si le clic a été fait sur une icône de suppression
      const deleteIcon = event.target.closest(".delete-icon");

      // Si un icône de suppression a été cliqué dans un conteneur d'image
      if (deleteIcon && imgContainer) {
        // Récupère l'ID du projet à partir de l'attribut data-id
        const projectId = imgContainer.dataset.id;
        // Récupère le token d'authentification stocké localement
        const token = localStorage.getItem("token");

        // Effectue une requête DELETE au serveur pour supprimer le projet
        const response = await fetch(
          `http://localhost:5678/api/works/${projectId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Si la requête réussit, supprime le projet du DOM et affiche un message
        if (response.ok) {
          deleteProjectFromDOM(projectId);
          console.log("Projet supprimé avec succès!");
        }
      }
    });
  }
};
