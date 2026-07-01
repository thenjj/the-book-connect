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
                    <img src="${book.coverImage}" class="card-img-top img-fluid rounded-top home-book-cover" alt="${book.title} Cover" style="height: 220px; object-fit: cover;">
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

// book club search and club banner

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

        let clubsArray = [];
        if (typeof theBookConnectDB !== 'undefined' && theBookConnectDB.bookClubs) {
            clubsArray = theBookConnectDB.bookClubs;
        } else if (typeof bookClubs !== 'undefined') {
            clubsArray = bookClubs;
        }

        const clubMatches = clubsArray.filter(club => {
            const clubName = club.name || "";
            const clubDesc = club.about || "";
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
            const name = club.name || "Unnamed Club";
            const image = club.image || "images/club-placeholder.jpg"; 

            let genreText = "General";
            if (club.genres && club.genres.length > 0) {
                genreText = club.genres.join(', ');
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

function displayBookClubDetails(clubId) {
    let clubsArray = [];
    if (typeof theBookConnectDB !== 'undefined' && theBookConnectDB.bookClubs) {
        clubsArray = theBookConnectDB.bookClubs;
    } else if (typeof bookClubs !== 'undefined') {
        clubsArray = bookClubs;
    }

    const club = clubsArray.find(c => c.id === clubId);
    if (!club) return;

    const bannerElement = document.getElementById('clubHeroBanner');
    const clubBannerImage = club.imageBanner || club.image || "images/club-placeholder.jpg";
    if (bannerElement) {
        bannerElement.style.backgroundImage = `url('${clubBannerImage}')`;
        bannerElement.style.backgroundSize = 'cover';
        bannerElement.style.backgroundPosition = 'center';
    }

    const nameElement = document.getElementById('clubHeroName');
    const locationElement = document.getElementById('clubHeroLocation');
    if (nameElement) nameElement.textContent = club.name;
    if (locationElement) locationElement.textContent = club.location;

    const badgeContainer = document.getElementById('clubGenreBadges');
    if (badgeContainer) {
        badgeContainer.innerHTML = ''; 
        if (club.genres) {
            club.genres.forEach(genreName => {
                const badgeSpan = document.createElement('span');
                badgeSpan.className = 'badge bg-warning text-dark me-2 mb-2 p-2 fw-semibold';
                badgeSpan.textContent = genreName;
                badgeContainer.appendChild(badgeSpan);
            });
        }
    }

    // currently reading section

    const bookCard = document.getElementById('currentBookCard');
    const fallbackBox = document.getElementById('noBookFallback');

    const currentBookTitle = "How Europe Underdeveloped Africa";
    const currentBookAuthor = "Walter Rodney";
    const currentBookCover = "images/books/how-europe-underdeveloped.jpg";
    const currentBookDesc = "A masterpiece of radical historical analysis exploring the intentional distortions of structural economic extraction across the African continent.";
    const currentMeetingInfo = "Last Friday of the month, 18:30 PM at The Forge JHB";

    if (bookCard && fallbackBox) {
        bookCard.style.display = 'block';
        fallbackBox.style.display = 'none';

        const titleEl = document.getElementById('currentBookTitle');
        const authorEl = document.getElementById('currentBookAuthor');
        const descEl = document.getElementById('currentBookDescription');
        const coverEl = document.getElementById('currentBookCover');
        const meetingEl = document.getElementById('currentBookMeeting');

        if (titleEl) titleEl.textContent = currentBookTitle;
        if (authorEl) authorEl.textContent = "by " + currentBookAuthor;
        if (descEl) descEl.textContent = currentBookDesc;
        if (meetingEl) meetingEl.textContent = currentMeetingInfo;
        
        if (coverEl) {
            coverEl.src = currentBookCover;
            coverEl.onerror = function() {
                this.src = "images/books/v.jpg";
            };
        }
    }
}

function triggerClubAction(clubId) {
    document.getElementById('searchDropdownPreview').classList.add('d-none');
    
    window.location.href = `club-detail.html?id=${clubId}`;
}

document.addEventListener('DOMContentLoaded', function() {
    setupClubSearch();

    const urlParams = new URLSearchParams(window.location.search);
    const clubIdFromURL = urlParams.get('id');

    if (clubIdFromURL) {
        displayBookClubDetails(clubIdFromURL);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    setupClubSearch();

    const urlParams = new URLSearchParams(window.location.search);
    let clubIdFromURL = urlParams.get('id');

    if (!clubIdFromURL && window.location.pathname.includes('club-detail.html')) {
        clubIdFromURL = 'club-1'; 
    }

    if (clubIdFromURL) {
        displayBookClubDetails(clubIdFromURL);
    }
});

// club chat nonsense

let baselineDemoMessages = [
    { sender: "Thabo Molefe", username: "@thabo_reads", text: "Did everyone finish the Chapter 3 breakdown yet? That data layout was wild.", isMe: false },
    { sender: "Kofi Silva", username: "@kofi_books", text: "Rodney's breakdown of economic extractions is hitting so hard right now.", isMe: false }
];

function renderLoungeChatStream() {
    const streamContainer = document.getElementById('chatMessageStream');
    if (!streamContainer) return;

    streamContainer.innerHTML = '';

    const avatarFallback = {
        "Thabo Molefe": "images/users/user-1.jpg",
        "Kofi Silva": "images/users/user-2.jpg",
        "You": "images/users/user-4.jpg"
    };

    baselineDemoMessages.forEach(msg => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = msg.isMe ? 'd-flex justify-content-end mb-3' : 'd-flex justify-content-start mb-3';

        let userAvatar = avatarFallback[msg.sender] || "images/club-placeholder.jpg";
        if (typeof theBookConnectDB !== 'undefined' && theBookConnectDB.users) {
            const foundUser = theBookConnectDB.users.find(u => u.name === msg.sender || u.id === msg.senderId);
            if (foundUser && foundUser.avatar) userAvatar = foundUser.avatar;
        }

        const innerHTMLContent = msg.isMe 
            ? `
                <div class="bg-dark text-white p-2 rounded-3 shadow-sm max-w-75 small me-2">
                    ${msg.text}
                </div>
                <img src="${userAvatar}" style="width: 32px; height: 32px; object-fit: cover;" class="rounded-circle align-self-end">
              `
            : `
                <img src="${userAvatar}" style="width: 32px; height: 32px; object-fit: cover;" class="rounded-circle align-self-start me-2">
                <div class="bg-white text-dark p-2 rounded-3 shadow-sm border border-light-subtle max-w-75 small">
                    <strong class="d-block text-primary" style="font-size: 0.75rem;">${msg.sender} <span class="text-muted fw-normal">${msg.username || ''}</span></strong>
                    ${msg.text}
                </div>
              `;

        wrapperDiv.innerHTML = innerHTMLContent;
        streamContainer.appendChild(wrapperDiv);
    });

    streamContainer.scrollTop = streamContainer.scrollHeight;
}

function handleLoungeMessageSubmit(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const inputElement = document.getElementById('chatMessageInput');
    if (!inputElement) return false;

    const messageText = inputElement.value.trim();
    if (messageText.length === 0) return false;

    baselineDemoMessages.push({
        sender: "You",
        username: "@me",
        text: messageText,
        isMe: true
    });

    inputElement.value = '';
    renderLoungeChatStream();
    
    return false;
}

function setupChatFormListener() {
    const chatForm = document.getElementById('loungeChatForm');
    if (chatForm) {
        chatForm.removeAttribute('onsubmit');
        chatForm.addEventListener('submit', handleLoungeMessageSubmit);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupClubSearch();

    const urlParams = new URLSearchParams(window.location.search);
    let clubIdFromURL = urlParams.get('id');

    if (!clubIdFromURL && window.location.pathname.includes('club-detail.html')) {
        clubIdFromURL = 'club-1'; 
    }

    if (clubIdFromURL) {
        displayBookClubDetails(clubIdFromURL);
    }

    renderLoungeChatStream();
    setupChatFormListener();
});