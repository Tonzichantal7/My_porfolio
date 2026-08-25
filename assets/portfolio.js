const skillGroups = [
    {
        title: 'Programming',
        icon: 'fa-terminal',
        skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL']
    },
    {
        title: 'Web & Backend',
        icon: 'fa-code',
        skills: ['React.js', 'Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'API Integration', 'JSON']
    },
    {
        title: 'Databases & Data',
        icon: 'fa-chart-line',
        skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Python Pandas', 'Data Cleaning', 'Data Analysis', 'Data Visualization']
    },
    {
        title: 'Tools',
        icon: 'fa-screwdriver-wrench',
        skills: ['Git', 'GitHub', 'Postman', 'Swagger', 'VS Code', 'PyCharm']
    },
    {
        title: 'Software Development',
        icon: 'fa-diagram-project',
        skills: ['Agile/Scrum', 'SDLC', 'Debugging', 'Software Testing', 'Requirements Analysis', 'Documentation']
    },
    {
        title: 'AI & Automation',
        icon: 'fa-wand-magic-sparkles',
        skills: ['AI/ML fundamentals', 'AI-assisted development', 'Prompt engineering fundamentals', 'Workflow/process automation concepts', 'Currently learning Power Automate', 'Microsoft 365 automation', 'AI agents', 'Workflow automation']
    }
];

const projects = [
    {
        name: 'E-MBONI - AI/IoT-Based Digital Solution',
        organization: 'VisionGuard Ltd',
        description: 'A real-world digital solution combining mobile technology, IoT, product development, software development, testing, and implementation. Won 1st Place at the DSE Hackathon and received funding for continued implementation.',
        technologies: ['Mobile', 'IoT', 'Product development', 'Testing'],
        github: null,
        demo: null,
        featured: true
    },
    {
        name: 'Finance Tracker App',
        organization: 'Personal project',
        description: 'A finance management application for expense tracking and budget planning with authentication, persistent data, and charts.',
        technologies: ['JavaScript', 'Firebase', 'Charts'],
        github: null,
        demo: 'https://finance-tracker-jade-tau.vercel.app/'
    },
    {
        name: 'Recipe Explorer',
        organization: 'Personal project',
        description: 'A recipe discovery application integrating the MealDB REST API to fetch recipe data and images, with Firebase Authentication for user management.',
        technologies: ['JavaScript', 'REST API', 'Firebase'],
        github: null,
        demo: 'https://recipe-explor.vercel.app/'
    },
    {
        name: 'ATM Simulation System',
        organization: 'Java application',
        description: 'A Java application implementing banking operations and demonstrating object-oriented design, encapsulation, and class-based architecture.',
        technologies: ['Java', 'OOP', 'Banking logic'],
        github: 'https://github.com/Tonzichantal7/ATM',
        demo: null
    },
    {
        name: 'Shape Area Calculator',
        organization: 'Java application',
        description: 'A Java application demonstrating inheritance, polymorphism, and abstract classes through area calculations for multiple shapes.',
        technologies: ['Java', 'Inheritance', 'Polymorphism'],
        github: 'https://github.com/Tonzichantal7/Areacalculating',
        demo: null
    }
];

function renderSkills() {
    const board = document.getElementById('skillBoard');
    if (!board) return;
    board.innerHTML = skillGroups.map(group => `
        <article class="skill-group reveal">
            <h3><i class="fas ${group.icon}"></i>${group.title}</h3>
            <div class="skill-tags">${group.skills.map(skill => `<span>${skill}</span>`).join('')}</div>
        </article>
    `).join('');
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = projects.map(project => `
        <article class="project-card ${project.featured ? 'project-featured' : ''} reveal">
            <div class="project-card-top"><span>${project.featured ? 'FEATURED PROJECT' : project.organization}</span>${project.featured ? '<i class="fas fa-trophy" aria-label="Hackathon winner"></i>' : ''}</div>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${project.technologies.map(technology => `<span>${technology}</span>`).join('')}</div>
            <div class="project-actions">
                ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="quiet-link">GitHub <i class="fas fa-arrow-up-right-from-square"></i></a>` : '<span class="private-note">Private / not published</span>'}
                ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="quiet-link">Live Demo <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
            </div>
        </article>
    `).join('');
}

function startRevealObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    startRevealObserver();
});
