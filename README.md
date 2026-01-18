<!-- Badges -->
<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-9.39-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)

</div>

Dashboard di monitoraggio in tempo reale per arnie intelligenti con sensori IoT.

## 📊 Cosa monitoriamo

L'app fornisce un cruscotto per monitorare metriche ambientali e operative dell'alveare raccolte da sensori IoT (ad esempio temperatura, umidità, peso, suono).

Funzionalità tipiche:

- Visualizzazioni time-series per analisi storica
- Tabella dei rilevamenti recenti
- Soglie configurabili e notifiche (opzionale)

I dettagli esatti (tipi di sensori, intervalli, soglie) possono variare a seconda dell'installazione e dei dispositivi disponibili.

Aspetti pratici rilevanti per il monitoraggio:

- Cicli stagionali e variazioni di attività durante l'anno.
- Prodotti tipici dell'alveare (miele, polline, cera, propoli, pappa reale).
- Fenomeni operativi da considerare: perdita di risorse, saccheggio, sciamatura e invernamento.

## 🧰 Librerie

Le badge in alto mostrano le versioni principali; qui trovi le librerie secondarie e il loro scopo nel progetto:

- **shadcn/ui** — libreria di componenti pronta, basata su Radix (stili e pattern UI)
- **Recharts** — grafici e visualizzazioni time-series per i sensori
- **React Router** — navigazione e routing dell'applicazione
- **Lucide React** — icone vettoriali leggere per l'interfaccia

Suggerimenti:

- Se aggiungi integrazioni esterne, incapsula chiamate API in una cartella `src/services`.

## 🔐 Variabili d'ambiente

Una variabile d'ambiente è un valore di configurazione esterno all'applicazione che può cambiare a seconda dell'ambiente (sviluppo, test, produzione) senza modificare il codice.

In Vite, le variabili d'ambiente che devono essere accessibili al frontend devono iniziare con il prefisso `VITE_`.

Crea un file `.env` (o `.env.local`) nella root del progetto:
```env
VITE_API_BASE_URL=https://api.example.com
VITE_ENABLE_NOTIFICATIONS=true
VITE_APP_ENV=development
```
Per l'ambiente di produzione, crea un file `.env.production`.

Esempio di utilizzo nel codice:
```javascript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const pollingInterval = Number(import.meta.env.VITE_POLLING_INTERVAL ?? 5000);
```
> ⚠️ **Nota**: non inserire mai segreti o token sensibili nel .env frontend. Le variabili VITE_* sono incluse nel bundle finale.

Nella repository, le variabili presenti servono esclusivamente come esempi a fini dimostrativi ed educativi.
## 🚀 Quick Start

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview
```

---

<div align="center">
Made with 🐝 for beekeepers
</div>
