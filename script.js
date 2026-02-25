// Modal functionality
const createEventBtn = document.getElementById('createEventBtn');
const dashboardCreateBtn = document.getElementById('dashboardCreateBtn');
const createEventModal = document.getElementById('createEventModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');

// ===== LOGIN/REGISTER PAGE FUNCTIONS =====
function showForm(formId) {
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}

// ===== DASHBOARD PAGE FUNCTIONS =====

// Toggle hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a nav link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Profile dropdown
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (profileBtn && dropdownContent) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownContent.classList.toggle('active');
        });

        // Close dropdown when a link is clicked
        document.querySelectorAll('.dropdown-content a').forEach(link => {
            link.addEventListener('click', () => {
                dropdownContent.classList.remove('active');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-profile')) {
                dropdownContent.classList.remove('active');
            }
        });
    }

    // Smooth scroll to section
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Event form submission
    const eventForm = document.querySelector('.event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const eventData = Object.fromEntries(formData);
            
            // Here you would send the data to the server
            console.log('Event created:', eventData);
            
            // Show success message
            alert('Event created successfully!');
            
            // Reset form
            this.reset();
        });
    }

    // Register event button
    document.querySelectorAll('.btn-register').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Here you would handle event registration
            console.log('User registered for event');
            
            // Change button state
            this.textContent = '✓ Registered';
            this.disabled = true;
            this.style.opacity = '0.6';
            this.style.cursor = 'not-allowed';
            
            alert('Successfully registered for event!');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const eventCards = document.querySelectorAll('.event-card');
            
            eventCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const location = card.querySelector('.event-location')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || location.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Category filter
    const categorySelect = document.querySelectorAll('.filter-select')[0];
    if (categorySelect) {
        categorySelect.addEventListener('change', function(e) {
            const selectedCategory = e.target.value.toLowerCase();
            const eventCards = document.querySelectorAll('.event-card');
            
            eventCards.forEach(card => {
                const badge = card.querySelector('.event-category-badge');
                const category = badge?.textContent.toLowerCase() || '';
                
                if (selectedCategory === '' || category === selectedCategory) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Add animation to event cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.event-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}); 

// Open modal function
function openCreateEventModal() {
    createEventModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Open modal from create button
if (createEventBtn) {
    createEventBtn.addEventListener('click', openCreateEventModal);
}

// Open modal from dashboard create button
if (dashboardCreateBtn) {
    dashboardCreateBtn.addEventListener('click', openCreateEventModal);
}

// Close modal function
function closeModal() {
    createEventModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close button click
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Cancel button click
if (cancelModalBtn) {
    cancelModalBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === createEventModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && createEventModal.classList.contains('show')) {
        closeModal();
    }
});

// Navigation menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
