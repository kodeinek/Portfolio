
function createMediaElement(src) {
  const ext = src.split('.').pop().toLowerCase();

  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoExts = ['mp4', 'webm', 'ogg', 'mov'];

  if (imageExts.includes(ext)) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'mediaItem';
    return img;

  } else if (videoExts.includes(ext)) {
    const video = document.createElement('video');
    video.src = src;
    video.className = 'mediaItem';
    video.controls = true;
    video.muted = true;
    video.autoplay = false;
    return video;
  }
  return null;
}

function createMiscElement(src) {
  const ext = src.split('.').pop().toLowerCase();
  if (ext === 'pdf') {
    const iframe = document.createElement('embed');
    iframe.src = src;
    iframe.className = 'miscItem';
    return iframe;
  }
  item = createMediaElement(src);
  item.className = "miscItem"
  return item
}


class navigation {
  constructor() {
    this.data = null;
    this.face= null;
  }


  async init() {
    this.data = await fetch("data.json").then(r => r.json());
    this.face = document.getElementById("face");
    return this;
  }

  projects() {
    this.clear();
    this.data.projects.forEach((p, idx) => {

      const project = this.data.projects[idx];

      const postPage = document.createElement("div")
      postPage.className = "postPage"
      postPage.innerHTML =`
      <p class="listingName">${project.title}</p>
      <img src="${project.thumbnail}" class="listingImage">
      <p class="desc">${project.description}</p>
      `

      project.media.forEach(src => {
        const el = createMediaElement(src);
        if (el) postPage.appendChild(el);
      });

      const link = document.createElement("a");
      link.className = "link";
      link.href = project.link;
      link.innerHTML = "See Project";
      link.target = "_blank";
      postPage.appendChild(link);

      this.face.appendChild(postPage);
    });

  }
  main() {
    this.clear();

    const mainPage = document.createElement("div");
    mainPage.className = "mainPage";


    const grid = document.createElement("div");
    grid.className = "mainGrid";

    const gridTop = document.createElement("div");
    gridTop.className = "gridTop";
    gridTop.innerHTML =
        `
    <h1>${this.data.main.tag}</h1>
        `;
    //<p>${this.data.main.headline}</p>

    const gridMidLeft = document.createElement("div");
    gridMidLeft.className = "gridMidLeft";
    gridMidLeft.innerHTML = `
    <img src="${this.data.main.profilePic}" alt="Profile" class="profilePic">

  `;

    const gridMidRight = document.createElement("div");
    gridMidRight.className = "gridMidRight";
    gridMidRight.innerHTML = `
    <h2>About Me</h2>
    <p>${this.data.main.bio}</p>
    <ul class="skills">
      ${this.data.main.skills.map(skill => `<li>${skill}</li>`).join('')}
    </ul>
    `
    const gridBottom = document.createElement("div");
    gridBottom.className = "gridBottom";
    gridBottom.innerHTML =
        `
    <p>Profile pic coming soon. Any programming language is fine.</p>

        `;

    grid.append(gridTop, gridMidLeft, gridMidRight, gridBottom);
    mainPage.appendChild(grid);

    this.face.appendChild(mainPage);
  }


  contact(){
    this.clear();
    const c= this.data.contact
    const phone = c.phone
    const mail =c.email
    const fcb = c.facebook
    const github = c.github

    const contactPage = document.createElement("div")
    contactPage.className = "contactPage"
    contactPage.innerHTML= `

    <p class="info">📞 ${phone}</p>
    <p class="info">✉️ ${mail}</p>
    <a href="${github}" class="link">🐙 Github</a>  
    <a href="${fcb}" class="link">📘 Facebook</a>
    `
    this.face.appendChild(contactPage)

  }


  misc() {
    this.clear();

    const miscContainer = document.createElement("div");
    miscContainer.className = "miscContainer";

    this.data.misc.forEach(src => {
      const el = createMiscElement(src);
      if (el) miscContainer.appendChild(el);
    });

    this.face.appendChild(miscContainer);
  }

  clear(){
    this.face.innerHTML = "";
  }
}

const navi = new navigation();

document.addEventListener("DOMContentLoaded", async () => {
  await navi.init();

  navi.main()

  document.getElementById("projects").addEventListener("click", (e) => {
    e.preventDefault();
    navi.projects();
  });

  document.getElementById("main").addEventListener("click", (e) => {
    e.preventDefault();
    navi.main()
  });

  document.getElementById("contact").addEventListener("click", (e) => {
    e.preventDefault();
    navi.contact()
  });
  document.getElementById("misc").addEventListener("click", (e) => {
    e.preventDefault();
    navi.misc()
  });







});
