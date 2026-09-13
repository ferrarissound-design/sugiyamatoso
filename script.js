const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'メニューを開く');
      menuButton.textContent = '☰';
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// トップページに会社案内への導線を追加
if (nav && !nav.querySelector('a[href="company.html"]')) {
  const companyLink = document.createElement('a');
  companyLink.href = 'company.html';
  companyLink.textContent = '会社案内';
  nav.insertBefore(companyLink, nav.firstElementChild);
}

const aboutCopy = document.querySelector('#about .about-copy');
if (aboutCopy && !aboutCopy.querySelector('.company-page-link')) {
  const companyPageLink = document.createElement('a');
  companyPageLink.href = 'company.html';
  companyPageLink.className = 'button secondary company-page-link';
  companyPageLink.textContent = '会社案内を詳しく見る';
  companyPageLink.style.marginTop = '18px';
  aboutCopy.appendChild(companyPageLink);
}

// 実際の施工事例画像を掲載
const worksGrid = document.querySelector('.works-grid');
if (worksGrid) {
  const works = [
    {
      image: 'F74E2FA1-43B7-4A50-B0F3-B3114B0035DA.png',
      title: '施工事例 01',
      category: '住宅塗装',
      description: '外観の印象と住まいの保護性能を整えるため、細部まで丁寧に仕上げた施工事例です。'
    },
    {
      image: '2FCAB5CA-287D-4BE3-AD50-689B423BBD41.png',
      title: '施工事例 02',
      category: '住宅塗装',
      description: '下地の状態を確認しながら、一工程ずつ丁寧に仕上げた住宅塗装の施工事例です。'
    }
  ];

  worksGrid.classList.add('real-works-grid');
  worksGrid.innerHTML = works.map((work, index) => `
    <article class="work-card real-work-card">
      <button class="work-photo-button" type="button" data-work-index="${index}" aria-label="${work.title}の写真を拡大する">
        <img class="real-work-image" src="${work.image}" alt="杉山塗装 ${work.title}" loading="lazy">
        <span class="work-photo-label">施工事例</span>
        <span class="work-zoom">写真を拡大 ＋</span>
      </button>
      <div class="work-body">
        <small>${work.category}</small>
        <h3>${work.title}</h3>
        <p>${work.description}</p>
      </div>
    </article>
  `).join('');

  const style = document.createElement('style');
  style.textContent = `
    .works-grid.real-works-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      max-width: 980px;
      margin: 0 auto;
      gap: 30px;
    }
    .real-work-card {
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 18px 40px rgba(0,0,0,.18);
      transition: transform .25s ease, box-shadow .25s ease;
    }
    .real-work-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 50px rgba(0,0,0,.24);
    }
    .work-photo-button {
      display: block;
      position: relative;
      width: 100%;
      padding: 0;
      border: 0;
      background: #152f38;
      cursor: zoom-in;
      overflow: hidden;
      aspect-ratio: 4 / 3;
    }
    .real-work-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .4s ease;
    }
    .work-photo-button:hover .real-work-image {
      transform: scale(1.035);
    }
    .work-photo-label {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 7px 12px;
      border-radius: 999px;
      background: rgba(255,255,255,.94);
      color: #264653;
      font-size: .72rem;
      font-weight: 800;
      letter-spacing: .08em;
    }
    .work-zoom {
      position: absolute;
      right: 14px;
      bottom: 14px;
      padding: 7px 11px;
      border-radius: 7px;
      background: rgba(20,43,50,.82);
      color: #fff;
      font-size: .72rem;
      font-weight: 700;
      backdrop-filter: blur(6px);
    }
    .work-lightbox {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgba(8,18,22,.92);
      opacity: 0;
      visibility: hidden;
      transition: opacity .2s ease, visibility .2s ease;
    }
    .work-lightbox.open {
      opacity: 1;
      visibility: visible;
    }
    .work-lightbox img {
      max-width: min(1100px, 94vw);
      max-height: 86vh;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 25px 80px rgba(0,0,0,.45);
    }
    .work-lightbox-close {
      position: fixed;
      top: 18px;
      right: 18px;
      width: 48px;
      height: 48px;
      border: 1px solid rgba(255,255,255,.28);
      border-radius: 50%;
      background: rgba(255,255,255,.12);
      color: white;
      font-size: 1.8rem;
      cursor: pointer;
    }
    @media (max-width: 720px) {
      .works-grid.real-works-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      .work-photo-button {
        aspect-ratio: 4 / 3;
      }
    }
  `;
  document.head.appendChild(style);

  const lightbox = document.createElement('div');
  lightbox.className = 'work-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <button class="work-lightbox-close" type="button" aria-label="写真を閉じる">×</button>
    <img src="" alt="施工事例 拡大写真">
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  worksGrid.querySelectorAll('.work-photo-button').forEach((button) => {
    button.addEventListener('click', () => {
      const work = works[Number(button.dataset.workIndex)];
      lightboxImage.src = work.image;
      lightboxImage.alt = `杉山塗装 ${work.title} 拡大写真`;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.querySelector('.work-lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}
