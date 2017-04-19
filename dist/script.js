window.addEventListener('load', function() {
  var aboutToggle = document.querySelector('#toggle-about');
  var filterToggle = document.querySelector('#toggle-filter');
  var aboutBox = document.querySelector('#about-box');
  var filterBox = document.querySelector('#filter-box');

  aboutToggle.addEventListener('click', function() {
    aboutBox.classList.toggle('contact-wrapper--open');
  });

  filterToggle.addEventListener('click', function() {
    filterBox.classList.toggle('navigation--open');
  });

  var filterButtons = document.querySelectorAll('.filter');
  var filterButtonsLength = filterButtons.length;
  for (var i = 0; i < filterButtonsLength; i++) {
    filterButtons[i].addEventListener('click', filterProjects);
  }
});

var activeFilters = [];

function filterProjects(event) {
  var filter = event.target.dataset.filter;
  var filterIndex = activeFilters.indexOf(filter);

  event.target.classList.toggle('filter--active');
  if (filterIndex !== -1) {
    activeFilters.splice(filterIndex, 1);
  } else {
    activeFilters.push(filter);
  }
  if (activeFilters.length === 0) {
    activateAll();
  } else {
    activateFilters();
  }
}

function activateAll() {
  var projects = document.querySelectorAll('.project');
  var projectsLength = projects.length;
  for (var i = 0; i < projectsLength; i++) {
    var project = projects[i];
    if (!isActive(project)) {
      activateElement(project);
    }
  }
}

function activateFilters() {
  var projects = document.querySelectorAll('.project');
  var projectsLength = projects.length;
  for (var i = 0; i < projectsLength; i++) {
    var project = projects[i];
    if (shouldBeActive(project)) {
      if (!isActive(project)) {
        activateElement(project);
      }
    } else {
      if (isActive(project)) {
        deactivateElement(project);
      }
    }
  }
}

function shouldBeActive(project) {
  var tags = project.dataset.tags;
  var shouldBeActive = false;
  activeFilters.forEach(function(filter) {
    if (tags.indexOf(filter) !== -1) {
      shouldBeActive = true;
    }
  });
  return shouldBeActive;
}

function isActive(project) {
  return project.parentNode.classList.contains('portfolio');
}

function activateElement(project) {
  var wrapper = project.parentNode;
  var portfolio = document.querySelector('.portfolio');
  portfolio.insertBefore(project, wrapper);
  portfolio.removeChild(wrapper);
}

function deactivateElement(project) {
  var wrapper = document.createElement('div');
  var portfolio = document.querySelector('.portfolio');
  wrapper.className = 'project--hidden';
  portfolio.insertBefore(wrapper, project);
  wrapper.appendChild(project);
}
