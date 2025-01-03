let tg = window.Telegram.WebApp;

// Initialiser l'application
document.addEventListener('DOMContentLoaded', function() {
    tg.ready();
    tg.expand();

    // Mettre à jour le thème
    updateTheme();
    
    // Charger les statistiques de l'utilisateur
    loadUserStats();
});

// Mettre à jour le thème selon les paramètres Telegram
function updateTheme() {
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.textColor);
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.buttonColor);
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.buttonTextColor);
}

// Charger les statistiques de l'utilisateur
function loadUserStats() {
    const userStats = document.getElementById('userStats');
    const userData = tg.initDataUnsafe?.user;
    
    if (userData) {
        userStats.innerHTML = `
            <p>Bienvenue, ${userData.first_name}!</p>
            <p>ID: ${userData.id}</p>
        `;
    } else {
        userStats.innerHTML = '<p>Chargement des données...</p>';
    }
}

// Fonction pour envoyer un feedback
function sendFeedback() {
    tg.sendData("feedback_request");
    tg.close();
}

// Fonction pour voir l'historique
function viewHistory() {
    tg.sendData("history_request");
    tg.close();
} 