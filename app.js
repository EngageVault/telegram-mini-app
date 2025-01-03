const tg = window.Telegram.WebApp;

function sendFeedback() {
    // Implémenter la logique de feedback
    tg.showAlert('Fonctionnalité en cours de développement');
}

function viewHistory() {
    // Implémenter la logique d'historique
    tg.showAlert('Fonctionnalité en cours de développement');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    tg.expand();
}); 