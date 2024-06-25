document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/skills')
        .then(response => response.json())
        .then(skills => {
            const skillsList = document.getElementById('skills-list');
            skills.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.innerHTML = `
                    <h3>${skill.title}</h3>
                    <p>${skill.description}</p>
                    <p><strong>Category:</strong> ${skill.category}</p>
                    <p><strong>Author:</strong> ${skill.author.username}</p>
                `;
                skillsList.appendChild(skillItem);
            });
        })
        .catch(error => {
            console.error('Error fetching skills:', error);
        });
});
