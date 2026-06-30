// book display render

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

function populateModalData(bookId) {

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

// book club search function

function setupClubSearch() {
    const searchInput = document.getElementById('navSearchInput');
    const searchDropdown = document.getElementById('searchDropdownPreview');

    if (!searchInput || !searchDropdown) return;

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase().trim();

        if (query.length === 0) {
            searchDropdown.classList.add('d-none');
            searchDropdown.innerHTML = '';
            return;
        }

        const clubMatches = theBookConnectDB.bookClubs.filter(club => {
            const clubName = club.name || club.title || "";
            const clubDesc = club.description || club.blurb || "";
            const clubLocation = club.location || ""; 
            
            return clubName.toLowerCase().includes(query) || 
                   clubDesc.toLowerCase().includes(query) ||
                   clubLocation.toLowerCase().includes(query);
        });

        if (clubMatches.length === 0) {
            searchDropdown.innerHTML = '<div class="p-2 text-muted small">No book clubs found...</div>';
            searchDropdown.classList.remove('d-none');
            return;
        }

        let dropdownHTML = '';
        clubMatches.forEach(club => {
            const name = club.name || club.title || "Unnamed Club";
            const image = club.image || club.coverImage || "images/club-placeholder.jpg"; 

            let genreText = "General";
            if (club.genres && club.genres.length > 0) {
                genreText = club.genres.join(', ');
            } else if (club.genre) {
                genreText = club.genre;
            }

            dropdownHTML += `
                <a href="#" class="d-flex align-items-center p-2 text-decoration-none text-dark border-bottom" 
                   style="font-size: 0.85rem;" 
                   onclick="triggerClubAction('${club.id}')">
                    <img src="${image}" style="width: 40px; height: 40px; object-fit: cover;" class="me-2 rounded-circle">
                    <div class="text-truncate">
                        <div class="fw-bold text-truncate">${name}</div>
                        <div class="text-secondary small text-truncate">${genreText}</div>
                    </div>
                </a>
            `;
        });

        searchDropdown.innerHTML = dropdownHTML;
        searchDropdown.classList.remove('d-none');
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.add('d-none');
        }
    });
}

function triggerClubAction(clubId) {
    document.getElementById('searchDropdownPreview').classList.add('d-none');
    document.getElementById('navSearchInput').value = '';
    
    alert("Navigating to Book Club ID: " + clubId);
}

setupClubSearch();