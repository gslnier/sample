# Test site de Q

## Installation de la base données

Lancer le server avec la base de données.

Vérifier bien que mongodb soit installé sur votre poste

[Installer mongodb](https://docs.mongodb.com/manual/installation/)

Ouvrez un nouveau terminal


```bash
mongod --dbpath=./data/
```

Cette commande permet de dire à mongo le dossier ou seront stockés les données.

```bash
cd ./server/
npm i
npm run start:dev
```


## Installation de l'application

```bash
cd ./questions-quizz/
npm i
npm run serve
```
