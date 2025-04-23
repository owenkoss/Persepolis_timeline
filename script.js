document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load data.json');
      return res.json();
    })
    .then(data => {
      // 1) Summary
      const summaryEl = document.getElementById('summary');
      summaryEl.textContent = data.summary;

      // 2) Timeline
      const container = document.getElementById('timeline');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      data.events
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(e => {
          const card = document.createElement('div');
          card.className = 'event-card';
          card.innerHTML = `
            <h2>${e.date}</h2>
            <h3>${e.title}</h3>
            <p>${e.description}</p>
            ${e.media ? `<img src="${e.media}" alt="${e.title}">` : ''}
          `;
          container.appendChild(card);
          observer.observe(card);
        });
    })
    .catch(err => console.error(err));
});



