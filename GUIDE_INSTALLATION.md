# SMART SITE · Audit FTTH — Guide d'installation (PWA)

## Contenu du dossier
| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (carte, points, liaisons, vertical, photos, export) |
| `manifest.webmanifest` | Nom, icône et couleurs de l'application installée |
| `sw.js` | Fonctionnement hors ligne (l'application s'ouvre sans Internet) |
| `icons/` | Icônes de l'application (Android, iPhone) |

Ne renommez pas ces fichiers et gardez-les ensemble dans le même dossier.

---

## Étape 1 — Mettre l'application en ligne (une seule fois, gratuit)
L'application doit être publiée sur un lien **https** : c'est obligatoire pour la caméra, le GPS, l'installation et le mode hors ligne.

### Option A — Netlify Drop (la plus simple, 5 minutes)
1. Sur un PC, ouvrez **https://app.netlify.com/drop**
2. Créez un compte gratuit (e-mail ou Google).
3. Glissez **le dossier entier** (celui qui contient `index.html`) dans la zone.
4. Netlify affiche un lien du type `https://nom-au-hasard.netlify.app`.
5. Dans *Site configuration → Change site name*, renommez-le, par exemple `smartsite-audit-ftth` → lien final : `https://smartsite-audit-ftth.netlify.app`

### Option B — GitHub Pages
1. Créez un dépôt public sur github.com, téléversez tous les fichiers (en gardant le dossier `icons`).
2. *Settings → Pages → Branch : main → Save*.
3. Le lien apparaît après 1 à 2 minutes : `https://votre-compte.github.io/nom-du-depot/`

---

## Étape 2 — Installer sur les téléphones des techniciens
Envoyez le lien https au technicien (WhatsApp, SMS…).

**Android (Chrome)**
1. Ouvrez le lien dans **Chrome** (pas dans le navigateur interne de WhatsApp).
2. Menu **⋮ → Installer l'application** (ou « Ajouter à l'écran d'accueil »). Le bouton **📲 Installer l'application** apparaît aussi dans ☰ Paramètres.
3. L'icône **Audit FTTH** apparaît sur l'écran d'accueil ; l'application s'ouvre en plein écran.
4. Autorisez **Position** et **Appareil photo** à la première demande.

**iPhone (Safari)**
1. Ouvrez le lien dans **Safari**.
2. Bouton **Partager ⬆️ → Sur l'écran d'accueil**.

Après la première ouverture, l'application fonctionne **sans Internet**. Seul le fond de carte satellite a besoin d'Internet ; les points, liaisons, formulaires et photos fonctionnent hors ligne.

---

## Étape 3 — Réglages conseillés sur chaque téléphone
- **☰ Paramètres → Qualité des photos** : *Haute (2048 px)* par défaut. Choisissez *Standard (1600 px)* pour les grosses missions : les photos prennent environ 5 fois moins de place que les originaux.
- **Choisir où enregistrer les exports (Android)** : Chrome **⋮ → Paramètres → Téléchargements → activer « Demander où enregistrer les fichiers »**. À chaque export, le téléphone demandera le dossier (Documents, carte SD…).
- **Export chaque soir** : ☰ → Export → *Télécharger* (ou *Partager* vers Drive quand le téléphone le propose). Envoyez le ZIP au bureau, puis importez-le dans **SMARTSITE_FTTH_OFFICE.html**.
- **Stockage protégé** : visible dans ☰ Paramètres. Une application installée est normalement protégée ; si « non protégé » s'affiche, exportez tous les jours.

---

## Mettre à jour l'application
1. Remplacez `index.html` par la nouvelle version.
2. Dans `sw.js`, augmentez la version : `const VERSION='v1';` → `'v2'`.
3. Republiez le dossier (Netlify : glissez-le de nouveau sur la page *Deploys* du site).
4. Sur les téléphones, la nouvelle version s'installe toute seule ; elle est active après avoir **fermé puis rouvert** l'application. Les données du technicien ne sont pas touchées.

---

## Obtenir un APK Android (facultatif)
1. Ouvrez **https://www.pwabuilder.com**, collez le lien https de l'application, *Start*.
2. *Package for stores → Android → Generate*.
3. Téléchargez le ZIP : il contient l'APK à installer (ou l'AAB pour le Play Store) et le fichier `assetlinks.json` à ajouter au site pour enlever la barre d'adresse.

L'APK ouvre la même application en ligne : les mises à jour publiées sur le site arrivent aussi dans l'APK.

---

## Limites à connaître
- Un navigateur de téléphone (Android comme iPhone) **ne permet pas** à une application web d'écrire en permanence dans un dossier choisi du téléphone. Les données restent dans l'espace protégé de l'application ; c'est l'**export** qui choisit l'emplacement (réglage Chrome ci-dessus, ou Partager vers Drive/Fichiers).
- Si la mémoire du téléphone est pleine, le système peut effacer les données d'un site **non protégé**. D'où : installer l'application + exporter chaque jour.
- Ne videz pas les données du site dans Chrome (*Paramètres → Confidentialité → Effacer les données*) avant d'avoir exporté.
