// Function to render books into their respective grid layout rows
function displayBooks() {
    const litRow = document.getElementById('literary-fiction-row');
    const fanRow = document.getElementById('fantasy-row');
    const horRow = document.getElementById('horror-row');
    const nonRow = document.getElementById('non-fiction-row');

    if(litRow) litRow.innerHTML = '';
    if(fanRow) fanRow.innerHTML = '';
    if(horRow) horRow.innerHTML = '';
    if(nonRow) nonRow.innerHTML = '';

    if (typeof theBookConnectDB === 'undefined' || !theBookConnectDB.books) {
        return;
    }

    theBookConnectDB.books.forEach(book => {
        const firstTag = (book.tags && book.tags.length > 0) ? book.tags[0] : 'Curated';

        // CRITICAL FIX: Wrapped ${book.id} in single quotes so strings like 'lit-1' pass safely without crashing
        const cardHTML = `
            <div class="col" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#bookDetailModal" onclick="populateModalData('${book.id}')">
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

        if (book.genre === "Literary Fiction" && litRow) {
            litRow.innerHTML += cardHTML;
        } else if (book.genre === "Fantasy" && fanRow) {
            fanRow.innerHTML += cardHTML;
        } else if (book.genre === "Horror/Thriller" && horRow) {
            horRow.innerHTML += cardHTML;
        } else if (book.genre === "Non-Fiction" && nonRow) {
            nonRow.innerHTML += cardHTML;
        }
    });
}

// Fixed populator that matches matching string IDs precisely
function populateModalData(bookId) {
    // Search the database treating IDs perfectly as string references
    const clickedBook = theBookConnectDB.books.find(b => String(b.id) === String(bookId));
    
    if (!clickedBook) {
        console.error("Could not find book with ID:", bookId);
        return;
    }

    document.getElementById('modalBookTitle').innerText = clickedBook.title;
    document.getElementById('modalBookCover').src = clickedBook.coverImage;
    document.getElementById('modalBookAuthor').innerText = `By ${clickedBook.author}`;
    document.getElementById('modalBookGenre').innerText = clickedBook.genre;
    document.getElementById('modalBookDesc').innerText = clickedBook.blurb || "No description provided.";
}

displayBooks();