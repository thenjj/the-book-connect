const theBookConnectDB = {
    books: [

        // literary fiction

        {
            id: "lit-1",
            title: "The Death of Vivek Oji",
            author: "Akwaeke Emezi",
            coverImage: "images/books/death-vivek.jpg",
            genre: "Literary Fiction",
            blurb: `Raised by a distant father and an understanding but overprotective mother, Vivek suffers disorienting blackouts, moments of disconnection between self and surroundings. As adolescence gives way to adulthood, Vivek finds solace in friendships with the warm,boisterous daughters of the Nigerwives, foreign-born women married to Nigerian men.
            
            But Vivek’s closest bond is with Osita, the worldly, high-spirited cousin whose teasing confidence masks a guarded private life. As theirrelationship deepens—and Osita struggles to understand Vivek’s escalating crisis—the mystery gives way to a heart-stopping act ofviolence in a moment of exhilarating freedom.`,
            tags: ["LGBTQIA+", "Contemporary"]
        },
        {
            id: "lit-2",
            title: "What Is Not Yours Is Not Yours",
            author: "Helen Oyeyemi",
            coverImage: "images/books/what-is-not-yours.jpg",
            genre: "Literary Fiction",
            tags: ["Short Stories", "Surreal"]
        },
        {
            id: "lit-3",
            title: "Vagabonds!",
            author: "Eloghosa Osunde",
            coverImage: "images/books/vagabonds.jpg",
            genre: "Literary Fiction",
            tags: ["Short Stories", "LGBTQIA+"]
        },
        {
            id: "lit-4",
            title: "Bosadi",
            author: "Kopano Matlwa",
            coverImage: "images/books/bosadi.jpg",
            genre: "Literary Fiction",
            tags: ["New Release", "South African"]
        },
        {
            id: "lit-5",
            title: "Transcendent Kingdom",
            author: "Yaa Gyasi",
            coverImage: "images/books/transcendent-kingdom.jpg",
            genre: "Literary Fiction",
            tags: ["Contemporary", "Diaspora"]
        },
        {
            id: "lit-6",
            title: "Stay With Me",
            author: "Ayòbámi Adébáyò",
            coverImage: "images/books/stay-with-me.jpg",
            genre: "Literary Fiction",
            tags: ["Literary"]
        },

        // fantasy 

        {
            id: "fan-1",
            title: "Flying Cows and Other Traumas",
            author: "Philisiwe Twijnstra",
            coverImage: "images/books/flying-cows.jpg",
            genre: "Fantasy",
            blurb: `This collection of short stories explores the breadth of magical realism, speculative fiction and fantasy. Twijnstra portrays women succeeding in the face of brutality. The protagonists – black women – are thrust into magical, terrifying, spellbinding worlds., with stories set in the past, present and future.`,
            tags: ["Magical Realism", "New Release"]
        },
        {
            id: "fan-2",
            title: "Who Fears Death",
            author: "Nnedi Okorafor",
            coverImage: "images/books/who-fears-death.jpg",
            genre: "Fantasy",
            tags: ["Africafuturism", "Sci-Fi"]
        },
        {
            id: "fan-3",
            title: "Children of Blood and Bone",
            author: "Tomi Adeyemi",
            coverImage: "images/books/children-of-blood.jpg",
            genre: "Fantasy",
            tags: ["Dark", "Young Adult"]
        },
        {
            id: "fan-4",
            title: "Zoo City",
            author: "Lauren Beukes",
            coverImage: "images/books/zoo-city.jpg",
            genre: "Fantasy",
            tags: ["Urban Fantasy", "Johannesburg"]
        },
        {
            id: "fan-5",
            title: "The Rage of Dragons",
            author: "Evan Winter",
            coverImage: "images/books/the-rage-of-dragons.jpg",
            genre: "Fantasy",
            tags: ["Tense", "Dark"]
        },
        {
            id: "fan-6",
            title: "Son of the Storm",
            author: "Suyi Davies Okungbowa",
            coverImage: "images/books/son-of-the-storm.jpg",
            genre: "Fantasy",
            tags: ["Mysterious"]
        },

        // horror

        {
            id: "hor-1",
            title: "Womb City",
            author: "Tlotlo Tsamaase",
            coverImage: "images/books/womb-city.jpg",
            genre: "Horror/Thriller",
            blurb: `This genre-bending Afrofuturist horror novel blends The Handmaid’s Tale with Get Out in an adrenaline-packed, cyberpunk, body-hopping ghost story exploring motherhood, memory, and a woman’s right to her own body.
            
            Nelah seems to have it all: fame, wealth, and a long-awaited daughter. But, trapped in a loveless marriage to a policeman who uses a microchip to monitor her every move, Nelah’s perfect life is precarious. When a tryst ends in an accidental death, Nelah’s life spirals out of control as she goes to desperate lengths to hide the killing and save the life of her yet-to-be-born daughter who is growing in one of the government Wombcubators, daring to hope that she can keep one last secret.`,
            tags: ["Cyberpunk", "Sci-Fi Horror"]
        },
        {
            id: "hor-2",
            title: "The Shining Girls",
            author: "Lauren Beukes",
            coverImage: "images/books/shining-girls.jpg",
            genre: "Horror/Thriller",
            tags: ["Time Travel", "Thriller"]
        },
        {
            id: "hor-3",
            title: "My Sister, the Serial Killer",
            author: "Oyinkan Braithwaite",
            coverImage: "images/books/my-sister-the.jpg",
            genre: "Horror/Thriller",
            tags: ["Bestseller"]
        },
        {
            id: "hor-4",
            title: "The Library of the Dead",
            author: "T.L. Huchu",
            coverImage: "images/books/library-of-the-dead.jpg",
            genre: "Horror/Thriller",
            tags: ["Mystery"]
        },
        {
            id: "hor-5",
            title: "Rosewater",
            author: "Tade Thompson",
            coverImage: "images/books/rosewater.jpg",
            genre: "Horror/Thriller",
            tags: ["Sci-Fi"]
        },
        {
            id: "hor-6",
            title: "The Prey of Gods",
            author: "Nicky Drayden",
            coverImage: "images/books/prey-of-gods.jpg",
            genre: "Horror/Thriller",
            tags: ["Sci-Fi"]
        },

        // non-fiction

        {
            id: "non-1",
            title: "African Europeans: An Untold History",
            author: "Olivette Otele",
            coverImage: "images/books/african-europeans.jpg",
            genre: "Non-Fiction",
            tags: ["History", "Identity"]
        },
        {
            id: "non-2",
            title: "A Burning Hunger",
            author: "Lynda Schuster",
            coverImage: "images/books/a-burning-hunger.jpg",
            genre: "Non-Fiction",
            blurb: `If the Mandelas were the generals in the fight for black liberation, the Mashininis were the foot soldiers. Theirs is a story of exile, imprisonment, torture and loss, but also
            of dignity, courage and strength in the face of appalling adversity. Originally published in the UK and USA to critical acclaim, A Burning Hunger tells a deeply moving human story and stands as one of the seminal books about the struggle against apartheid.

            This is an extraordinary story of a family that became a symbol of resistance; a tale of unimaginable adversity met with dignity and defiance and an example of what ordinary people are capable of when injustice becomes intolerable. Basing her narrative on extensive research and interviews, Lynda Schuster richly portrays the Mashininis and in so doing reveals black South Africa during a time of momentous change.`,
            tags: ["Biography", "Apartheid"]
        },
        {
            id: "non-3",
            title: "Decolonial Marxism",
            author: "Walter Rodney",
            coverImage: "images/books/decolonial-marxism.jpg",
            genre: "Non-Fiction",
            tags: ["Politics", "Essays"]
        },
        {
            id: "non-4",
            title: "How Europe Underdeveloped Africa",
            author: "Walter Rodney",
            coverImage: "images/books/how-europe-underdeveloped.jpg",
            genre: "Non-Fiction",
            tags: ["Essential"]
        },
        {
            id: "non-5",
            title: "The Wretched of the Earth",
            author: "Frantz Fanon",
            coverImage: "images/books/the-wretched.jpg",
            genre: "Non-Fiction",
            tags: ["Philosophy", "Revolution"]
        },
        {
            id: "non-6",
            title: "The Will to Change",
            author: "bell hooks",
            coverImage: "images/books/the-will-to-change.jpg",
            genre: "Non-Fiction",
            tags: ["Gender", "Culture"]
        }
    ],

    bookClubs: [
    {
        id: "club-1",
        name: "NoName Bookclub Johannesburg",
        location: "Johannesburg, Gaunteng",
        frequency: "Monthly",
        about: "black and african radical literature",
        genres: ["Non-fiction", "Literary", "Contemporary"],
        image: "images/book-clubs/nonamebookclub.jpg",
        imageBanner: "images/book-clubs/nonamebookclub-banner.jpeg",
        mockMessages: []
    },
    {
        id: "club-2",
        name: "NoName Bookclub Cape Town",
        location: "Cape Town, Western Cape",
        genres: ["Non-fiction", "Literary", "Contemporary"],
        image: "images/book-clubs/nonamebookclub.jpg",
    },
    {
        id: "club-3",
        name: "Kgosi Readers",
        location: "Online",
        genres: ["Literary", "Contemporary"],
        image: "images/book-clubs/kgosi-readers.png",
    },
    {
        id: "club-4",
        name: "English Language Arts Bookclub",
        location: "Durban, KwaZulu-Natal",
        genres: ["Literary", "Contemporary"],
        image: "images/book-clubs/eng-lang-arts-club.jpg",
    },
    {
        id: "club-5",
        name: "Afri-Lit Readers",
        location: "Bloemfontein, Free State",
        genres: ["Literary", "Contemporary"],
        image: "images/book-clubs/afrilit-readers.jpg",
    },
    {
        id: "club-6",
        name: "Dungeons & Orcs",
        location: "Online",
        genres: ["Fantasy", "Roamnce"],
        image: "images/book-clubs/dungeons-and-orcs.jpg",
    }
],

users: [
        { id: "user-1", name: "Thabo Molefe", username: "@thabo_reads", avatar: "images/users/user-1.jpg" },

        { id: "user-2", name: "Aminah Oko", username: "@aminahbibliophile", avatar: "images/users/user-2.jpg" },

        { id: "user-3", name: "Zaneele Dlamini", username: "@zaneeslibrary", avatar: "images/users/user-3.jpg" },

        { id: "user-4", name: "Rorisang Mofokeng", username: "@roryxlit", avatar: "images/users/user-4.jpg" },

        { id: "user-5", name: "Bright Smith", username: "@bsmith", avatar: "images/users/user-5.jpg" },

        { id: "user-6", name: "Chidi Okafor", username: "@chidi_reads", avatar: "images/users/user-6.jpg" }
    ]
};

const STORAGE_KEY = 'the_book_connect_db';

function initDatabase() {

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
        
        try {
            const parsedData = JSON.parse(savedData);
            
            Object.assign(theBookConnectDB, parsedData);
            console.log("Database loaded successfully from The Book Connect storage!");
        } catch (error) {
            console.error("Error parsing saved data, resetting to defaults.", error);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(theBookConnectDB));
        }
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(theBookConnectDB));
        console.log("No existing data found. The Book Connect database initialized!");
    }
}

initDatabase();