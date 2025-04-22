fetch('data.json')
  .then(res => res.json())
  .then(events => {
    const container = document.getElementById('timeline');
    events
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
      });
  })
  .catch(err => console.error('Error loading data.json:', err));
