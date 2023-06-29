# Projet de vérification des conflits CSS

Ce projet est destiné à détecter les conflits potentiels entre les sélecteurs de classe et d'ID de deux fichiers CSS différents.

## Fonctionnalités

- Récupère le contenu des fichiers CSS à partir de leurs URL respectives.
- Analyse les sélecteurs de classe et d'ID de chaque fichier CSS.
- Vérifie les conflits potentiels entre les sélecteurs.
- Affiche les sélecteurs en conflit ainsi que les lignes correspondantes dans chaque fichier.

## Utilisation

1. Assurez-vous d'avoir Node.js installé sur votre système.
2. Clonez ce dépôt sur votre machine locale.
3. Exécutez `npm install` pour installer les dépendances.
4. Modifiez le fichier `verifierConflitsCSS.js` pour spécifier les URL des fichiers CSS que vous souhaitez vérifier.
5. Exécutez `node verifierConflitsCSS.js` pour démarrer la vérification des conflits.
6. Les conflits potentiels seront affichés dans la console.

## Exemple de sortie

Conflits potentiels trouvés :

Sélecteur en conflit : .active
Dans le fichier "dashboard.css":

Ligne 10: .active {
Ligne 20: .active:hover {
Dans le fichier "selectize.default.min.css":
Ligne 5: .active {
Ligne 15: .active:hover {


## Auteur

Ce projet a été créé par [zabuza225] et est sous licence [Licence]. Pour toute question ou suggestion, veuillez me contacter à [launcher4400@gmail.com].

