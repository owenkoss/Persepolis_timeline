document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      // 1) Show the book summary
      const summaryEl = document.getElementById('summary');
      summaryEl.innerHTML = `<p>${data.summary}</p>`;

      // 2) Prepare the timeline
      const container = document.getElementById('timeline');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      // 3) Render each event
      data.events
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(e => {
          const card = document.createElement('div');
          card.className = 'event-card';
          card.innerHTML = `
            <h2>${e.date}: ${e.title}</h2>
            <p>${e.description}</p>
            ${e.media ? `<img src="${e.media}" alt="${e.title}">` : ''}
          `;
          container.appendChild(card);
          observer.observe(card);
        });
    })
    .catch(err => console.error('Error loading data.json:', err));
});


