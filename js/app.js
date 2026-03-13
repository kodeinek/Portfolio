
function createMediaElement(src) {
  const ext = src.split('.').pop().toLowerCase();

  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoExts = ['mp4', 'webm', 'ogg', 'mov'];

  if (imageExts.includes(ext)) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'media_item';
    return img;

  } else if (videoExts.includes(ext)) {
    const video = document.createElement('video');
    video.src = src;
    video.className = 'media_item';
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
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.className = 'media_item';
    return iframe;
  }
  return createMediaElement(src);
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

      const name = document.createElement("p")
      name.className = "listing_name"
      name.innerHTML = project.title
      postPage.appendChild(name)

      const image = document.createElement("img")
      image.className = "listing_image"
      image.src = project.thumbnail
      postPage.appendChild(image)

      const desc = document.createElement("p")
      desc.className = "desc"
      desc.innerHTML = project.description
      postPage.appendChild(desc)


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
    <img src="${this.data.main.profilePic}" alt="Profile" class="profile-pic">
    <h1>${this.data.main.tag}</h1>
    <p>${this.data.main.headline}</p>
        `;


    const gridMidLeft = document.createElement("div");
    gridMidLeft.className = "gridMidLeft";
    gridMidLeft.innerHTML = `
    <h2>About Me</h2>
    <p>${this.data.main.bio}</p>
    <ul class="skills">
      ${this.data.main.skills.map(skill => `<li>${skill}</li>`).join('')}
    </ul>
  `;

    const gridMidRight = document.createElement("div");
    gridMidRight.className = "gridMidRight";
    gridMidRight.innerHTML = `
    <h2>Recent Projects</h2>
    <a href="#projects" class="projects">View All Projects</a>
    `

    grid.append(gridTop, gridMidLeft, gridMidRight);
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

    <h2>${phone}</h2>
    <h2>${mail}</h2>
    <a href = ${github} class="link"> Github </a>
    <a href = ${fcb} class="link"> Facebook </a>
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
