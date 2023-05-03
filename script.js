const form = document.querySelector('#genre-form');
const input = document.querySelector('#genre-input');
const results = document.querySelector('#results');

form.addEventListener('submit', async (event) => {
	event.preventDefault();

	// Get user input
	const genre = input.value.trim();

	// Make API request
	const response = await fetch(`https://api.spotify.com/v1/search?q=${genre}&type=track`);
	const data = await response.json();

	// Display results
	const tracks = data.tracks.items;
	if (tracks.length > 0) {
		let html = '';
		tracks.forEach((track) => {
			html += `<div class="track">
						<img src="${track.album.images[0].url}" alt="${track.album.name}">
						<p>${track.name} - ${track.artists[0].name}</p>
					</div>`;
		});
		results.innerHTML = html;
		results.style.display = 'block';
	} else {
		results.innerHTML = '<p>No results found.</p>';
		results.style.display = 'block';
	}
});
