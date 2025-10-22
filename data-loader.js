// Portfolio Data Loader
// This script loads data from portfolio-data.json and populates the HTML pages

// Global variable to store portfolio data
let portfolioData = null;

class PortfolioDataLoader {
    constructor() {
        this.data = null;
    }

    async loadData() {
        try {
            const response = await fetch('portfolio-data2.json');
            this.data = await response.json();
            portfolioData = this.data; // Make data globally available
            return this.data;
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            return null;
        }
    }

    // Helper function to create author links
    createAuthorLinks(authors) {
        return authors.map((author, index) => {
            const link = `<a href="${author.url}" class="author-link">${author.name}</a>`;
            return index < authors.length - 1 ? link + ',' : link;
        }).join('\n                        ');
    }

    // Helper function to create publication links
    createPublicationLinks(links) {
        return links.map(link => {
            const icon = link.icon || '';
            return `<a href="${link.url}" class="pub-link" target="_blank">
                            ${icon ? `<i class="${icon}"></i> ` : ''}${link.type}
                        </a>`;
        }).join('\n                        ');
    }

    // Populate Index Page
    populateIndexPage() {
        if (!this.data) return;

        const { personal, bio, about, education, researchInterests, experience, projects, publications, talks, contact, social } = this.data;

        // Update page title
        document.title = `${personal.name} - Personal Portfolio`;

        // Navigation logo
        const navLogo = document.querySelector('.nav-logo a');
        if (navLogo) navLogo.textContent = personal.name;

        // Hero section
        const heroName = document.querySelector('.hero-text h2 .highlight');
        if (heroName) heroName.textContent = personal.firstName;

        const heroTitle = document.querySelector('.hero-text h2');
        if (heroTitle) heroTitle.innerHTML = `Hi! I'm <span class="highlight">${personal.firstName}</span>, a ${personal.title}.`;

        const heroDescriptions = document.querySelectorAll('.hero-description');
        if (heroDescriptions[0]) heroDescriptions[0].textContent = bio.hero;
        if (heroDescriptions[1]) heroDescriptions[1].textContent = bio.researchInterests;

        const heroBio = document.querySelector('.hero-bio');
        if (heroBio) heroBio.textContent = bio.tagline;

        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.src = personal.profileImage;
            profileImg.alt = personal.name;
        }

        const cvLink = document.querySelector('a[href*="CV.pdf"]');
        if (cvLink) cvLink.href = personal.cvFile;

        // About section
        const aboutTextDiv = document.querySelector('.about-text');
        if (aboutTextDiv) {
            aboutTextDiv.innerHTML = `
                <h3>${about.currentRole.name}</h3>
                <h4>${about.currentRole.title}</h4>
                <h4><a href="${about.currentRole.institutionUrl}" target="_blank">${about.currentRole.institution}</a></h4>
                ${about.currentRole.description.map(desc => `<p>${desc}</p>`).join('\n                ')}
                ${about.fullBio ? `
                <div class="full-bio-button-container">
                    <a href="full-bio.html" class="btn btn-outline full-bio-btn">
                        <i class="fas fa-user"></i> Read Full Bio
                    </a>
                </div>` : ''}
            `;
        }

        // Education
        const educationList = document.querySelector('.education-list');
        if (educationList) {
            educationList.innerHTML = education.map(edu => `
                <div class="education-item">
                    <div class="degree">🎓 ${edu.degree}, ${edu.year}</div>
                    <div class="institution">🏫 ${edu.institution}</div>
                </div>
            `).join('\n                ');
        }

        // Research Interests
        const interestsList = document.querySelector('.interests-list');
        if (interestsList) {
            interestsList.innerHTML = researchInterests.map(interest => 
                `<li>• ${interest}</li>`
            ).join('\n                            ');
        }

        // Recent Experience (3 most recent items)
        const recentExperienceContainer = document.getElementById('recent-experience');
        if (recentExperienceContainer) {
            const recentExperience = experience.recent || []; // Use the recent array
            recentExperienceContainer.innerHTML = recentExperience.map(exp => `
                <div class="timeline-item">
                    <div class="timeline-date">${exp.period}</div>
                    <div class="timeline-content">
                        <h3>${exp.title}</h3>
                        <h4><a href="${exp.institutionUrl}" target="_blank">${exp.institution}</a> <span class="category-badge">${exp.category}</span></h4>
                        <p>${exp.description}</p>
                    </div>
                </div>
            `).join('\n                ');
        }

        // Projects
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = projects.map((project, projectIndex) => {
                // Check if project has multiple images
                const hasMultipleImages = project.images && project.images.length > 1;
                
                if (hasMultipleImages) {
                    // Create slider HTML
                    return `
                <div class="project-card">
                    <div class="project-image">
                        <div class="project-slider" data-project-index="${projectIndex}">
                            <div class="project-slider-container">
                                ${project.images.map(img => `
                                <div class="project-slider-slide">
                                    <img src="${img}" alt="${project.title}">
                                </div>
                                `).join('')}
                            </div>
                            <div class="project-slider-dots">
                                ${project.images.map((_, dotIndex) => `
                                <span class="project-slider-dot ${dotIndex === 0 ? 'active' : ''}" data-slide="${dotIndex}"></span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3><a href="${project.url}" target="_blank">${project.title}</a></h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n                            ')}
                        </div>
                    </div>
                </div>
                    `;
                } else {
                    // Single image fallback
                    return `
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-content">
                        <h3><a href="${project.url}" target="_blank">${project.title}</a></h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n                            ')}
                        </div>
                    </div>
                </div>
                    `;
                }
            }).join('\n                ');
            
            // Initialize sliders after DOM is updated
            this.initializeProjectSliders();
        }

        // Publications (recent)
        const publicationsList = document.querySelector('#publications .publications-list');
        if (publicationsList) {
            publicationsList.innerHTML = publications.recent.map(pub => `
                <div class="publication-item">
                    <div class="publication-authors">
                        ${this.createAuthorLinks(pub.authors)}
                    </div>
                    <h3><a href="${pub.url}" target="_blank">${pub.title}</a></h3>
                    <div class="publication-venue">${pub.venue}</div>
                    <div class="publication-links">
                        ${pub.links.map(link => `<a href="${link.url}" class="pub-link" target="_blank">${link.type}</a>`).join('\n                        ')}
                    </div>
                </div>
            `).join('\n                ');
        }

        // Talks (recent)
        const talksList = document.querySelector('#talks .talks-list');
        if (talksList) {
            talksList.innerHTML = talks.recent.map(talk => `
                <div class="talk-item">
                    <h3><a href="${talk.url}" target="_blank">${talk.title}</a></h3>
                    <div class="talk-details">
                        <span class="talk-venue">${talk.venue}</span>
                        <span class="talk-date">${talk.date}</span>
                        <span class="talk-location">${talk.location}</span>
                    </div>
                    <p class="talk-description">${talk.description}</p>
                </div>
            `).join('\n                ');
        }

        // Contact
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            contactInfo.innerHTML = `
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <h4>Email</h4>
                        <a href="mailto:${contact.email}">${contact.email}</a>
                    </div>
                </div>
                
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <h4>Address</h4>
                        <p>${contact.address.institution}<br>
                        ${contact.address.department}<br>
                        ${contact.address.location}</p>
                    </div>
                </div>
                
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <h4>Phone</h4>
                        <a href="tel:${contact.phone.replace(/\s/g, '')}">${contact.phone}</a>
                    </div>
                </div>
            `;
        }

        // Social links
        const socialIcons = document.querySelector('.social-icons');
        if (socialIcons) {
            const socialData = [
                { icon: 'fab fa-linkedin', url: social.linkedin },
                { icon: 'fab fa-twitter', url: social.twitter },
                { icon: 'fab fa-github', url: social.github },
                { icon: 'fab fa-orcid', url: social.orcid },
                { icon: 'fas fa-graduation-cap', url: social.googleScholar }
            ];

            socialIcons.innerHTML = socialData.map(item => `
                <a href="${item.url}" target="_blank" class="social-link">
                    <i class="${item.icon}"></i>
                </a>
            `).join('\n                ');
        }

        // Footer
        const footerName = document.querySelector('.footer p');
        if (footerName) footerName.innerHTML = `&copy; 2024 ${personal.name}. All rights reserved.`;
    }

    // Initialize project image sliders
    initializeProjectSliders() {
        const sliders = document.querySelectorAll('.project-slider');
        
        sliders.forEach(slider => {
            const container = slider.querySelector('.project-slider-container');
            const dots = slider.querySelectorAll('.project-slider-dot');
            const totalSlides = dots.length;
            let currentSlide = 0;
            let autoSlideInterval = null;
            let isHovered = false;
            
            // Touch/swipe variables
            let touchStartX = 0;
            let touchEndX = 0;
            let touchStartY = 0;
            let touchEndY = 0;
            let isSwiping = false;
            
            // Function to go to a specific slide
            const goToSlide = (slideIndex) => {
                currentSlide = slideIndex;
                const offset = -slideIndex * 100;
                container.style.transform = `translateX(${offset}%)`;
                
                // Update active dot
                dots.forEach((dot, index) => {
                    if (index === slideIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };
            
            // Function to go to next slide
            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                goToSlide(currentSlide);
            };
            
            // Function to go to previous slide
            const prevSlide = () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(currentSlide);
            };
            
            // Start auto-sliding (every 3 seconds)
            const startAutoSlide = () => {
                // Only start if not hovered and not already running
                if (!isHovered && !autoSlideInterval) {
                    autoSlideInterval = setInterval(nextSlide, 3000);
                }
            };
            
            // Stop auto-sliding
            const stopAutoSlide = () => {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                    autoSlideInterval = null;
                }
            };
            
            // Handle mouse enter (pause)
            const handleMouseEnter = () => {
                isHovered = true;
                stopAutoSlide();
            };
            
            // Handle mouse leave (resume)
            const handleMouseLeave = () => {
                isHovered = false;
                startAutoSlide();
            };
            
            // Touch event handlers for swipe functionality
            const handleTouchStart = (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                isSwiping = true;
                stopAutoSlide();
            };
            
            const handleTouchMove = (e) => {
                if (!isSwiping) return;
                
                touchEndX = e.touches[0].clientX;
                touchEndY = e.touches[0].clientY;
                
                // Calculate the difference
                const diffX = Math.abs(touchStartX - touchEndX);
                const diffY = Math.abs(touchStartY - touchEndY);
                
                // If horizontal swipe is more significant than vertical, prevent default scroll
                if (diffX > diffY && diffX > 10) {
                    e.preventDefault();
                }
            };
            
            const handleTouchEnd = () => {
                if (!isSwiping) return;
                
                isSwiping = false;
                
                const swipeThreshold = 50; // Minimum distance for a swipe
                const diffX = touchStartX - touchEndX;
                const diffY = Math.abs(touchStartY - touchEndY);
                
                // Only process horizontal swipes (ignore if vertical movement is too large)
                if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
                    if (diffX > 0) {
                        // Swiped left - go to next slide
                        nextSlide();
                    } else {
                        // Swiped right - go to previous slide
                        prevSlide();
                    }
                }
                
                // Restart auto-slide after swipe
                startAutoSlide();
            };
            
            // Add click event to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    stopAutoSlide();
                    goToSlide(index);
                    // Only restart if not currently hovered
                    if (!isHovered) {
                        startAutoSlide();
                    }
                });
            });
            
            // Pause auto-slide on hover (desktop)
            slider.addEventListener('mouseenter', handleMouseEnter);
            slider.addEventListener('mouseleave', handleMouseLeave);
            
            // Add touch event listeners for mobile swipe
            slider.addEventListener('touchstart', handleTouchStart, { passive: false });
            slider.addEventListener('touchmove', handleTouchMove, { passive: false });
            slider.addEventListener('touchend', handleTouchEnd);
            
            // Start auto-sliding
            startAutoSlide();
        });
    }

    // Populate Publications Page
    populatePublicationsPage() {
        if (!this.data) return;

        const { personal, publications, social } = this.data;

        // Update page title
        document.title = `Publications - ${personal.name}`;

        // Navigation logo
        const navLogo = document.querySelector('.nav-logo a');
        if (navLogo) navLogo.textContent = personal.name;

        // Publications by year
        const container = document.querySelector('.publications-full .container');
        if (!container) return;

        // Clear existing content except header
        const existingYearSections = container.querySelectorAll('.year-section');
        existingYearSections.forEach(section => section.remove());

        // Add publications by year
        const years = Object.keys(publications.byYear).sort((a, b) => b - a);
        years.forEach(year => {
            const yearSection = document.createElement('div');
            yearSection.className = 'year-section';
            
            const yearTitle = document.createElement('h2');
            yearTitle.className = 'year-title';
            yearTitle.textContent = year;
            yearSection.appendChild(yearTitle);

            publications.byYear[year].forEach(pub => {
                const pubItem = document.createElement('div');
                pubItem.className = 'publication-item';
                
                pubItem.innerHTML = `
                    <div class="publication-authors">
                        ${this.createAuthorLinks(pub.authors)}
                    </div>
                    <h3><a href="${pub.url}" target="_blank">${pub.title}</a></h3>
                    <div class="publication-venue">${pub.venue}</div>
                    ${pub.abstract ? `<div class="publication-abstract">
                        <p>${pub.abstract}</p>
                    </div>` : ''}
                    <div class="publication-links">
                        ${this.createPublicationLinks(pub.links)}
                    </div>
                `;
                
                yearSection.appendChild(pubItem);
            });

            container.appendChild(yearSection);
        });

        // Add preprints section
        if (publications.preprints && publications.preprints.length > 0) {
            const preprintSection = document.createElement('div');
            preprintSection.className = 'year-section';
            
            const preprintTitle = document.createElement('h2');
            preprintTitle.className = 'year-title';
            preprintTitle.textContent = 'Preprints & Under Review';
            preprintSection.appendChild(preprintTitle);

            publications.preprints.forEach(pub => {
                const pubItem = document.createElement('div');
                pubItem.className = 'publication-item preprint';
                
                pubItem.innerHTML = `
                    <div class="publication-authors">
                        ${this.createAuthorLinks(pub.authors)}
                    </div>
                    <h3><a href="${pub.url}" target="_blank">${pub.title}</a></h3>
                    <div class="publication-venue">${pub.venue}</div>
                    ${pub.status ? `<div class="publication-status">${pub.status}</div>` : ''}
                    ${pub.abstract ? `<div class="publication-abstract">
                        <p>${pub.abstract}</p>
                    </div>` : ''}
                    <div class="publication-links">
                        ${this.createPublicationLinks(pub.links)}
                    </div>
                `;
                
                preprintSection.appendChild(pubItem);
            });

            container.appendChild(preprintSection);
        }

        // Update statistics
        const stats = publications.stats;
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers[0]) statNumbers[0].textContent = stats.total;
        if (statNumbers[1]) statNumbers[1].textContent = stats.citations;
        if (statNumbers[2]) statNumbers[2].textContent = stats.hIndex;
        if (statNumbers[3]) statNumbers[3].textContent = stats.journalPapers;

        // Update social profile links
        const profileLinks = document.querySelectorAll('.profile-link');
        const profileMapping = [
            { index: 0, url: social.googleScholar },
            { index: 1, url: social.orcid },
            { index: 2, url: social.researchGate },
            { index: 3, url: social.mendeley }
        ];

        profileMapping.forEach(item => {
            if (profileLinks[item.index]) {
                profileLinks[item.index].href = item.url;
            }
        });

        // Footer
        const footerName = document.querySelector('.footer p');
        if (footerName) footerName.innerHTML = `&copy; 2024 ${personal.name}. All rights reserved.`;
    }

    // Populate Talks Page
    populateTalksPage() {
        if (!this.data) return;

        const { personal, talks } = this.data;

        // Update page title
        document.title = `Talks & Presentations - ${personal.name}`;

        // Navigation logo
        const navLogo = document.querySelector('.nav-logo a');
        if (navLogo) navLogo.textContent = personal.name;

        // Talks content
        const container = document.querySelector('.publications-full .container');
        if (!container) return;

        // Clear existing content
        const existingYearSections = container.querySelectorAll('.year-section');
        existingYearSections.forEach(section => section.remove());

        // Add upcoming talks
        if (talks.upcoming && talks.upcoming.length > 0) {
            const upcomingSection = document.createElement('div');
            upcomingSection.className = 'year-section';
            
            const upcomingTitle = document.createElement('h2');
            upcomingTitle.className = 'year-title';
            upcomingTitle.textContent = 'Upcoming';
            upcomingSection.appendChild(upcomingTitle);

            talks.upcoming.forEach(talk => {
                const talkItem = document.createElement('div');
                talkItem.className = 'talk-item-full';
                
                talkItem.innerHTML = `
                    <h3><a href="${talk.url}" target="_blank">${talk.title}</a></h3>
                    <div class="talk-meta">
                        <span class="talk-venue">${talk.venue}</span>
                        <span class="talk-date">${talk.date}</span>
                        <span class="talk-location">${talk.location}</span>
                    </div>
                    ${talk.abstract ? `<div class="talk-abstract">
                        <p>${talk.abstract}</p>
                    </div>` : ''}
                    ${talk.status ? `<div class="talk-status upcoming">${talk.status}</div>` : ''}
                `;
                
                upcomingSection.appendChild(talkItem);
            });

            container.appendChild(upcomingSection);
        }

        // Add talks by year
        const years = Object.keys(talks.byYear).sort((a, b) => b - a);
        years.forEach(year => {
            const yearSection = document.createElement('div');
            yearSection.className = 'year-section';
            
            const yearTitle = document.createElement('h2');
            yearTitle.className = 'year-title';
            yearTitle.textContent = year;
            yearSection.appendChild(yearTitle);

            talks.byYear[year].forEach(talk => {
                const talkItem = document.createElement('div');
                talkItem.className = 'talk-item-full';
                
                const linksHtml = talk.links ? `
                    <div class="talk-links">
                        ${this.createPublicationLinks(talk.links)}
                    </div>
                ` : '';

                talkItem.innerHTML = `
                    <h3><a href="${talk.url}" target="_blank">${talk.title}</a></h3>
                    <div class="talk-meta">
                        <span class="talk-venue">${talk.venue}</span>
                        <span class="talk-date">${talk.date}</span>
                        <span class="talk-location">${talk.location}</span>
                    </div>
                    ${talk.abstract ? `<div class="talk-abstract">
                        <p>${talk.abstract}</p>
                    </div>` : ''}
                    ${linksHtml}
                `;
                
                yearSection.appendChild(talkItem);
            });

            container.appendChild(yearSection);
        });

        // Update statistics
        const stats = talks.stats;
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers[0]) statNumbers[0].textContent = stats.total;
        if (statNumbers[1]) statNumbers[1].textContent = stats.invited;
        if (statNumbers[2]) statNumbers[2].textContent = stats.keynotes;
        if (statNumbers[3]) statNumbers[3].textContent = stats.countries;

        // Update speaking topics
        const topicTags = document.querySelector('.topic-tags');
        if (topicTags && talks.topics) {
            topicTags.innerHTML = talks.topics.map(topic => 
                `<span class="topic-tag">${topic}</span>`
            ).join('\n                    ');
        }

        // Footer
        const footerName = document.querySelector('.footer p');
        if (footerName) footerName.innerHTML = `&copy; 2024 ${personal.name}. All rights reserved.`;
    }

    // Populate Experience Page
    populateExperiencePage() {
        if (!this.data) return;

        const { personal, experience } = this.data;

        // Update page title
        document.title = `Experience - ${personal.name}`;

        // Navigation logo
        const navLogo = document.querySelector('.nav-logo a');
        if (navLogo) navLogo.textContent = personal.name;

        // Use the new structured experience data
        const workExperience = experience.work || [];
        const teachingExperience = experience.teaching || [];
        const volunteerExperience = experience.volunteer || [];

        // Populate Work Experience
        const workExperienceContent = document.getElementById('work-experience-content');
        if (workExperienceContent && workExperience.length > 0) {
            workExperienceContent.innerHTML = `
                <div class="experience-category">
                    <h2 class="category-title">Work Experience</h2>
                    <p class="category-subtitle">Industry and professional positions</p>
                    
                    <div class="timeline">
                        ${workExperience.map(exp => `
                            <div class="timeline-item">
                                <div class="timeline-date">${exp.period}</div>
                                <div class="timeline-content">
                                    <h3>${exp.title}</h3>
                                    <h4><a href="${exp.institutionUrl}" target="_blank">${exp.institution}</a></h4>
                                    <p>${exp.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Populate Teaching Experience
        const teachingExperienceContent = document.getElementById('teaching-experience-content');
        if (teachingExperienceContent && teachingExperience.length > 0) {
            teachingExperienceContent.innerHTML = `
                <div class="experience-category">
                    <h2 class="category-title">Teaching Experience</h2>
                    <p class="category-subtitle">Educational and instructional positions</p>
                    
                    <div class="timeline">
                        ${teachingExperience.map(exp => `
                            <div class="timeline-item">
                                <div class="timeline-date">${exp.period}</div>
                                <div class="timeline-content">
                                    <h3>${exp.title}</h3>
                                    <h4><a href="${exp.institutionUrl}" target="_blank">${exp.institution}</a></h4>
                                    <p>${exp.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Populate Volunteer Experience
        const volunteerExperienceContent = document.getElementById('volunteer-experience-content');
        if (volunteerExperienceContent && volunteerExperience.length > 0) {
            volunteerExperienceContent.innerHTML = `
                <div class="experience-category">
                    <h2 class="category-title">Volunteer Experience</h2>
                    <p class="category-subtitle">Community service and volunteer positions</p>
                    
                    <div class="timeline">
                        ${volunteerExperience.map(exp => `
                            <div class="timeline-item">
                                <div class="timeline-date">${exp.period}</div>
                                <div class="timeline-content">
                                    <h3>${exp.title}</h3>
                                    <h4><a href="${exp.institutionUrl}" target="_blank">${exp.institution}</a></h4>
                                    <p>${exp.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Footer
        const footerName = document.querySelector('.footer p');
        if (footerName) footerName.innerHTML = `&copy; 2024 ${personal.name}. All rights reserved.`;
    }

    // Populate Full Bio Page
    populateFullBioPage() {
        if (!this.data) return;

        const { personal, about } = this.data;

        // Update page title
        document.title = `Full Bio - ${personal.name}`;

        // Navigation logo
        const navLogo = document.querySelector('.nav-logo a');
        if (navLogo) navLogo.textContent = personal.name;

        // Load full bio content
        if (about && about.fullBio) {
            const bioData = about.fullBio;
            
            // Set title
            const bioTitle = document.getElementById('bio-title');
            if (bioTitle) bioTitle.textContent = bioData.title;
            
            // Load sections
            const sectionsContainer = document.getElementById('bio-sections');
            if (sectionsContainer) {
                sectionsContainer.innerHTML = ''; // Clear existing content
                bioData.sections.forEach(section => {
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'bio-section';
                    
                    // Handle paragraph breaks in content
                    const paragraphs = section.content.split('\n\n').map(p => `<p>${p}</p>`).join('');
                    
                    sectionDiv.innerHTML = `
                        <h2>${section.heading}</h2>
                        ${paragraphs}
                    `;
                    sectionsContainer.appendChild(sectionDiv);
                });
            }

            // Update current position info
            if (about.currentRole) {
                const currentPosition = document.getElementById('current-position');
                const currentInstitution = document.getElementById('current-institution');
                if (currentPosition) currentPosition.textContent = about.currentRole.title;
                if (currentInstitution) currentInstitution.textContent = about.currentRole.institution;
            }
        }

        // Update contact information
        const { contact, social } = this.data;
        
        // Update email
        const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
        if (emailLink && contact) {
            emailLink.textContent = contact.email;
            emailLink.href = `mailto:${contact.email}`;
        }

        // Update social links
        const linkedinLink = document.querySelector('.contact-item a[href*="linkedin"]');
        if (linkedinLink && social.linkedin) {
            linkedinLink.href = social.linkedin;
        }

        const githubLink = document.querySelector('.contact-item a[href*="github"]');
        if (githubLink && social.github) {
            githubLink.href = social.github;
        }

        // Footer
        const footerName = document.querySelector('.footer p');
        if (footerName) footerName.innerHTML = `&copy; 2024 ${personal.name}. All rights reserved.`;
    }

    // Initialize based on current page
    async init() {
        await this.loadData();
        
        if (!this.data) {
            console.error('Failed to load portfolio data');
            return;
        }

        // Determine which page we're on and populate accordingly
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);

        if (page === 'publications.html') {
            this.populatePublicationsPage();
        } else if (page === 'talks.html') {
            this.populateTalksPage();
        } else if (page === 'experience.html') {
            this.populateExperiencePage();
        } else if (page === 'full-bio.html') {
            this.populateFullBioPage();
        } else {
            // Default to index page
            this.populateIndexPage();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loader = new PortfolioDataLoader();
    loader.init();
});
