async function loadConfig() {
  try {
    const res = await fetch('config.json');
    const config = await res.json();

    // Set title
    document.getElementById('portal-title').textContent = config.title;

    // Set navbar color
    if (config.navColor) {
      document.getElementById('navbar').className = `${config.navColor}`;
    }

    // Apply theme
    if (config.theme) {
      document.documentElement.setAttribute('data-theme', config.theme);
    }

    // Build cards
    const container = document.getElementById('links-container');
    config.links.forEach((link) => {
      const col = document.createElement('div');
      col.className = 'col s12 m6 l3';

      col.innerHTML = `
        <a href="${link.url}" target="_blank" class="card-link">
          <div class="card">
            <div class="card-content center">
              <span class="card-title">
                    <div class="container">
                      <div class="row">
                        <div class="col s12">
                          <i class="material-icons small">${link.icon}</i>
                        </div>
                        <div class="col s12">
                          ${link.name}
                        </div>
                      </div>
                    </div>
              </span>
            </div>
          </div>
        </a>
      `;
      container.appendChild(col);
    });

    setupThemeToggle();
  } catch (err) {
    console.error('Failed to load config.json', err);
  }
}

function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const icon = toggle.querySelector('i.material-icons');

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function updateIcon() {
    const theme = currentTheme();
    icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }

  updateIcon();

  toggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    updateIcon();
  });
}

loadConfig();
