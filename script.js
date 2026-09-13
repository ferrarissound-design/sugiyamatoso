const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');

const unifiedNav = `
  <a href="company.html">会社案内</a>
  <a href="president.html">代表あいさつ</a>
  <a href="index.html#service">施工内容</a>
  <a href="works.html">施工事例</a>
  <a class="nav-cta" href="contact.html">無料見積もり</a>
`;

if (nav) nav.innerHTML = unifiedNav;

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

document.querySelectorAll('.footer-links').forEach((footer) => {
  footer.innerHTML = `
    <a href="index.html">トップ</a>
    <a href="company.html">会社案内</a>
    <a href="president.html">代表あいさつ</a>
    <a href="works.html">施工事例</a>
    <a href="contact.html">お問い合わせ</a>
  `;
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const path = location.pathname.split('/').pop() || 'index.html';

if (path === 'index.html' || path === '') {
  const heroPrimary = document.querySelector('.hero-actions .primary');
  if (heroPrimary) {
    heroPrimary.href = 'contact.html';
    heroPrimary.textContent = '無料で見積もりを相談する';
  }

  const aboutCopy = document.querySelector('.about-copy');
  if (aboutCopy && !aboutCopy.querySelector('.about-page-links')) {
    const links = document.createElement('div');
    links.className = 'hero-actions about-page-links';
    links.innerHTML = `
      <a class="button secondary" href="company.html">会社案内を見る</a>
      <a class="button secondary" href="president.html">代表あいさつを見る</a>
    `;
    aboutCopy.appendChild(links);
  }

  const contactButton = document.querySelector('.contact-card .button');
  if (contactButton) {
    contactButton.href = 'contact.html';
    contactButton.textContent = 'お問い合わせ・無料見積もり';
  }
}

// トップページの施工事例を実画像で表示
const worksGrid = document.querySelector('.works-grid');
if (worksGrid) {
  const works = [
    {
      image: 'F74E2FA1-43B7-4A50-B0F3-B3114B0035DA.png',
      title: '袋井市 K様邸',
      category: '外壁・屋根塗装',
      description: '色あせと防水性の低下が見られたため、外壁と屋根をまとめて塗り替えました。',
      area: '静岡県袋井市',
      paint: 'シリコン塗料',
      period: '約14日'
    },
    {
      image: '2FCAB5CA-287D-4BE3-AD50-689B423BBD41.png',
      title: '磐田市 S様邸',
      category: '外壁塗装',
      description: '外壁のくすみや細かな劣化を整え、明るく清潔感のある外観に仕上げました。',
      area: '静岡県磐田市',
      paint: 'ラジカル制御型塗料',
      period: '約10日'
    }
  ];

  worksGrid.classList.add('real-works-grid');
  worksGrid.innerHTML = works.map((work, index) => `
    <article class="work-card real-work-card">
      <button class="work-photo-button" type="button" data-work-index="${index}" aria-label="${work.title}の写真を拡大する">
        <img class="real-work-image" src="${work.image}" alt="杉山塗装 ${work.title}の施工事例写真" loading="lazy">
        <span class="work-photo-label">施工事例</span>
        <span class="work-zoom">写真を拡大 ＋</span>
      </button>
      <div class="work-body detailed-work-body">
        <small>${work.category}</small>
        <h3>${work.title}</h3>
        <p>${work.description}</p>
        <dl class="work-meta-list">
          <div><dt>施工地域</dt><dd>${work.area}</dd></div>
          <div><dt>使用塗料</dt><dd>${work.paint}</dd></div>
          <div><dt>工期</dt><dd>${work.period}</dd></div>
        </dl>
      </div>
    </article>
  `).join('');

  if (!document.querySelector('.works-more-link')) {
    const more = document.createElement('div');
    more.className = 'works-more-link';
    more.style.cssText = 'text-align:center;margin-top:34px';
    more.innerHTML = '<a class="button primary" href="works.html">施工事例をもっと見る</a>';
    worksGrid.insertAdjacentElement('afterend', more);
  }

  const style = document.createElement('style');
  style.textContent = `
    .works-grid.real-works-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:1000px;margin:0 auto;gap:30px}
    .real-work-card{border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,.18)}
    .work-photo-button{display:block;position:relative;width:100%;padding:0;border:0;background:#152f38;cursor:zoom-in;overflow:hidden;aspect-ratio:4/3}
    .real-work-image{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s ease}
    .work-photo-button:hover .real-work-image{transform:scale(1.035)}
    .work-photo-label,.work-zoom{position:absolute;padding:7px 11px;border-radius:999px;font-size:.72rem;font-weight:800}
    .work-photo-label{top:14px;left:14px;background:rgba(255,255,255,.94);color:#264653}
    .work-zoom{right:14px;bottom:14px;background:rgba(20,43,50,.82);color:#fff}
    .work-meta-list{margin:16px 0 0}.work-meta-list div{display:grid;grid-template-columns:84px 1fr;gap:10px;padding:8px 0;border-top:1px solid #edf1f2}
    .work-meta-list dt{font-size:.8rem;font-weight:800;color:#d96b32}.work-meta-list dd{margin:0;font-size:.88rem;color:#60747c}
    .work-lightbox{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;background:rgba(8,18,22,.92);opacity:0;visibility:hidden;transition:.2s}
    .work-lightbox.open{opacity:1;visibility:visible}.work-lightbox img{max-width:min(1100px,94vw);max-height:86vh;object-fit:contain;border-radius:12px}
    .work-lightbox-close{position:fixed;top:18px;right:18px;width:48px;height:48px;border:1px solid rgba(255,255,255,.28);border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:1.8rem;cursor:pointer}
    @media(max-width:820px){.works-grid.real-works-grid{grid-template-columns:1fr;max-width:650px}.work-meta-list div{grid-template-columns:1fr;gap:2px}}
  `;
  document.head.appendChild(style);

  const lightbox = document.createElement('div');
  lightbox.className = 'work-lightbox';
  lightbox.innerHTML = '<button class="work-lightbox-close" type="button" aria-label="写真を閉じる">×</button><img src="" alt="施工事例 拡大写真">';
  document.body.appendChild(lightbox);
  const lightboxImage = lightbox.querySelector('img');
  const closeLightbox = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };

  worksGrid.querySelectorAll('.work-photo-button').forEach((button) => {
    button.addEventListener('click', () => {
      const work = works[Number(button.dataset.workIndex)];
      lightboxImage.src = work.image;
      lightboxImage.alt = `杉山塗装 ${work.title} 拡大写真`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  lightbox.querySelector('.work-lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
}

// 会社案内・代表ページからお問い合わせページへ統一
for (const selector of ['.company-cta .primary', '.president-cta .primary']) {
  const button = document.querySelector(selector);
  if (button) button.href = 'contact.html';
}

// 代表設定を写真の人物像と整合させる
if (path === 'president.html') {
  const caption = document.querySelector('.portrait-caption p');
  if (caption) caption.textContent = '塗装業歴50年';
  const career = document.querySelector('.career-list');
  if (career) career.innerHTML = `
    <div class="career-item"><strong>1974年</strong><p>地元の塗装会社へ入社。住宅塗装の現場で職人として経験を積む。</p></div>
    <div class="career-item"><strong>1985年</strong><p>職長として現場管理を担当。若手職人の育成にも携わる。</p></div>
    <div class="career-item"><strong>1998年</strong><p>杉山塗装を設立。地域の戸建住宅を中心に塗装工事を開始。</p></div>
    <div class="career-item"><strong>現在</strong><p>現場の第一線は後進に任せ、代表として経営・品質管理・職人育成に力を注ぐ。</p></div>
  `;
}
