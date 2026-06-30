// Function to render books into their respective grid layout rows
function displayBooks() {
    const litRow = document.getElementById('literary-fiction-row');
    const fanRow = document.getElementById('fantasy-row');
    const horRow = document.getElementById('horror-row');
    const nonRow = document.getElementById('non-fiction-row');

    litRow.innerHTML = '';
    fanRow.innerHTML = '';
    horRow.innerHTML = '';
    nonRow.innerHTML = '';

    theBookConnectDB.books.forEach(book => {
        const firstTag = (book.tags && book.tags.length > 0) ? book.tags[0] : 'Curated';

        const cardHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm border-0 bg-light">
                    <img src="${book.coverImage}" class="card-img-top img-fluid rounded-top" alt="${book.title} Cover" style="height: 220px; object-fit: cover;">
                    <div class="card-body d-flex flex-column p-2">
                        <h6 class="card-title fw-bold text-dark mb-1 text-truncate" title="${book.title}">${book.title}</h6>
                        <p class="card-text text-secondary small mb-2 text-truncate">${book.author}</p>
                        <div class="mt-auto">
                            <span class="badge bg-dark btn-sm text-wrap w-100 p-1" style="font-size: 0.7rem;">${firstTag}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (book.genre === "Literary Fiction") {
            litRow.innerHTML += cardHTML;
        } else if (book.genre === "Fantasy") {
            fanRow.innerHTML += cardHTML;
        } else if (book.genre === "Horror/Thriller") {
            horRow.innerHTML += cardHTML;
        } else if (book.genre === "Non-Fiction") {
            nonRow.innerHTML += cardHTML;
        }
    });
}

displayBooks();