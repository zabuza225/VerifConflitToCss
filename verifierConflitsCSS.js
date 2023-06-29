const axios = require('axios');
const fs = require('fs');

async function verifierConflitsCSS() {
  try {
    // Récupérer le contenu du fichier "dashboard.css"
    const dashboardResponse = await axios.get('https://mariage.testaguima.com/assets2/css/dashboard.css');
    const dashboardCSS = dashboardResponse.data;

    // Récupérer le contenu du fichier "selectize.default.min.css"
    const selectizeResponse = await axios.get('https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/css/selectize.default.min.css');
    const selectizeCSS = selectizeResponse.data;

    // Analyser les sélecteurs de classe et d'ID du fichier "selectize.default.min.css"
    const selectizeSelectors = extractSelectorsFromCSS(selectizeCSS);

    // Analyser les sélecteurs de classe et d'ID du fichier "dashboard.css"
    const dashboardSelectors = extractSelectorsFromCSS(dashboardCSS);

    // Vérifier les conflits potentiels
    const conflicts = checkConflicts(selectizeSelectors, dashboardSelectors, selectizeCSS, dashboardCSS);

    // Afficher les conflits potentiels
    if (conflicts.length > 0) {
      console.log('Conflits potentiels trouvés :');
      conflicts.forEach((conflict) => {
        console.log(`Sélecteur en conflit : ${conflict.selector}`);
        console.log(`Dans le fichier "dashboard.css":`);
        conflict.lines1.forEach((line) => {
          console.log(`- Ligne ${line.line}: ${line.content}`);
        });
        console.log(`Dans le fichier "selectize.default.min.css":`);
        conflict.lines2.forEach((line) => {
          console.log(`- Ligne ${line.line}: ${line.content}`);
        });
        console.log('---------------------------');
      });
    } else {
      console.log('Aucun conflit de sélecteur trouvé.');
    }
    
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers CSS :', error);
  }
}

// Fonction pour extraire les sélecteurs de classe et d'ID à partir du contenu CSS
function extractSelectorsFromCSS(cssContent) {
  const selectors = [];
  const regex = /([.#][^\s{]+)/g;
  let match;

  while ((match = regex.exec(cssContent)) !== null) {
    selectors.push(match[0]);
  }

  return selectors;
}

// Fonction pour vérifier les conflits potentiels entre les sélecteurs
// Fonction pour vérifier les conflits potentiels entre les sélecteurs et renvoyer les lignes concernées
function checkConflicts(selectors1, selectors2, cssContent1, cssContent2) {
  const conflicts = [];

  selectors1.forEach((selector1) => {
    if (selectors2.includes(selector1)) {
      const regex = new RegExp(`${selector1}\\b`, 'g');
      const lines1 = getLinesWithSelector(cssContent1, regex);
      const lines2 = getLinesWithSelector(cssContent2, regex);

      conflicts.push({
        selector: selector1,
        lines1,
        lines2,
      });
    }
  });

  return conflicts;
}

// Fonction pour extraire les lignes contenant un sélecteur spécifique
function getLinesWithSelector(cssContent, regex) {
  const lines = [];
  const contentArray = cssContent.split('\n');

  contentArray.forEach((line, index) => {
    if (line.match(regex)) {
      lines.push({
        line: index + 1,
        content: line.trim(),
      });
    }
  });

  return lines;
}

// Appeler la fonction pour vérifier les conflits
verifierConflitsCSS()
  .then((conflicts) => {
    conflicts.forEach((conflict) => {
      console.log(`Conflits potentiels pour le sélecteur "${conflict.selector}":`);

      console.log(`Dans le fichier "dashboard.css":`);
      conflict.lines1.forEach((line) => {
        console.log(`- Ligne ${line.line}: ${line.content}`);
      });

      console.log(`Dans le fichier "selectize.default.min.css":`);
      conflict.lines2.forEach((line) => {
        console.log(`- Ligne ${line.line}: ${line.content}`);
      });

      console.log('---------------------------');
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des fichiers CSS :', error);
  });