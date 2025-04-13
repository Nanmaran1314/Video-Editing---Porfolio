const gallery = document.getElementById("video-gallery");
const tabsContainer = document.createElement("div");
tabsContainer.id = "category-tabs";
tabsContainer.style.display = "flex";
tabsContainer.style.flexWrap = "wrap";
tabsContainer.style.justifyContent = "center";
tabsContainer.style.gap = "1rem";
tabsContainer.style.marginBottom = "2rem";
tabsContainer.style.paddingTop = "1rem";
gallery.parentElement.insertBefore(tabsContainer, gallery);

// Google Sheets JSON endpoint
const sheetURL = "https://opensheet.elk.sh/1WbPCkqamW-_g1k5pA2FPaVAcNH90mm2LfoxFQDtU5tM/Sheet1";

// Fetch and display videos
async function loadVideos() {
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    gallery.innerHTML = "";

    // Group videos by category
    const groupedVideos = {};
    data.forEach(video => {
      if (!video.Category || !video.Title || !video.URL) return;

      const category = video.Category.trim();
      if (!groupedVideos[category]) groupedVideos[category] = [];

      groupedVideos[category].push({
        title: video.Title,
        url: video.URL,
        description: video.Description || ""
      });
    });

    const preferredOrder = ['Commercial', 'Social Media', 'Film', 'Music Video', 'Corporate'];
    const orderedCategories = [...new Set([...preferredOrder, ...Object.keys(groupedVideos)])].filter(cat => groupedVideos[cat]);

    // Create tabs
    orderedCategories.forEach((category, index) => {
      const tab = document.createElement("button");
      tab.innerText = category;
      tab.classList.add("category-tab");
      tab.style.padding = "0.6rem 1.2rem";
      tab.style.border = "1px solid var(--primary)";
      tab.style.backgroundColor = "transparent";
      tab.style.color = "var(--primary)";
      tab.style.borderRadius = "5px";
      tab.style.cursor = "pointer";
      tab.style.transition = "all 0.3s ease";
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        document.querySelectorAll(".category-tab").forEach(t => {
          t.style.backgroundColor = "transparent";
          t.style.color = "var(--primary)";
        });

        // Add active style
        tab.style.backgroundColor = "var(--primary)";
        tab.style.color = "#fff";

        // Display selected category
        displayCategory(category, groupedVideos[category]);
      });

      tabsContainer.appendChild(tab);

      // Show first category by default
      if (index === 0) {
        tab.click();
      }
    });

  } catch (error) {
    console.error("Error loading videos:", error);
    gallery.innerHTML = `
      <div style="text-align: center; padding: 3rem;">
        <h3 style="color: #ff6b6b;">Couldn't Load Videos</h3>
        <p>Please try again later.</p>
      </div>`;
  }
}

// Render videos for a category
// Render videos for a category
function displayCategory(categoryName, videos) {
    gallery.innerHTML = "";
  
    const categoryHeader = document.createElement("div");
    categoryHeader.classList.add("category-header");
  
    const heading = document.createElement("h3");
    heading.innerText = categoryName;
    heading.style.textAlign = "center";
    heading.style.color = "var(--light)";
    heading.style.marginBottom = "2rem";
    categoryHeader.appendChild(heading);
  
    gallery.appendChild(categoryHeader);
  
    const container = document.createElement("div");
    container.classList.add("video-gallery");
  
    videos.forEach(video => {
      const fileIdMatch = video.url.match(/\/d\/([^\/]+)\//);
      if (!fileIdMatch) return;
  
      const fileId = fileIdMatch[1];
  
      const card = document.createElement("div");
      card.classList.add("video-card");
  
      const videoWrapper = document.createElement("div");
      videoWrapper.classList.add("video-wrapper");
  
      const iframe = document.createElement("iframe");
      iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
      iframe.allow = "autoplay";
  
      videoWrapper.appendChild(iframe);
  
      // Create video info section
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("video-info");
  
      const title = document.createElement("h4");
      title.innerText = video.title;
  
      const description = document.createElement("p");
      description.innerText = video.description;
  
      // Append title and description to the infoDiv
    //   infoDiv.appendChild(title);
    //   infoDiv.appendChild(description);
  
      // Append the video wrapper and info div to the card
      card.appendChild(videoWrapper);
      card.appendChild(infoDiv);
  
      // Add the card to the container
      container.appendChild(card);
    });
  
    // Append the container to the gallery
    gallery.appendChild(container);
  }
  
document.addEventListener("DOMContentLoaded", loadVideos);


   
    // Lazy load videos when page is ready
    document.addEventListener('DOMContentLoaded', loadVideos);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Navbar style change on scroll
    window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.style.padding = '1rem 2rem';
    nav.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
  } else {
    nav.style.padding = '1.5rem';
  }
});


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});



// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// Close menu on scroll
window.addEventListener('scroll', () => {
  navLinks.classList.remove('active');
});


