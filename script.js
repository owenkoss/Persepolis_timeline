document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(res => res.json())
    .then(events => {
      const container = document.getElementById('timeline');

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      events
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(e => {
          const card = document.createElement('div');
          card.className = 'event-card';
          card.innerHTML = `
            <h2>${e.date}: ${e.title}</h2>
            ${e.media ? `<img src="${e.media}" alt="${e.title}">` : ''}
            <p class="teaser"><strong>Click for details…</strong></p>
            <div class="details">
              <p>${e.description}</p>
            </div>
          `;

          container.appendChild(card);
          observer.observe(card);

          card.addEventListener('click', () => {
            card.classList.toggle('expanded');
          });
        });
    })
    .catch(err => console.error('Error loading data.json:', err));
});





