# Proiect Academic: Generarea Automata de Caption-uri si Hashtag-uri pentru Content Creators

## 1. Titlul proiectului
Tool inteligent pentru analiza unui articol lung sau a unui video si generarea automata de caption-uri si hashtag-uri optimizate pentru platforme sociale diferite, precum LinkedIn, TikTok si Instagram.

## 2. Descriere generala
Acest proiect isi propune dezvoltarea unei aplicatii care preia continut de tip text sau video, extrage ideile principale si genereaza automat variante de postari adaptate pentru mai multe platforme social media. Solutia urmareste sa reduca timpul necesar procesului de creare a continutului si sa ofere rezultate relevante, coerente si usor de utilizat de catre content creators sau specialisti de marketing.

## 3. Scopul proiectului
Scopul principal al aplicatiei este automatizarea procesului de transformare a unui continut lung intr-un set de postari scurte si optimizate, adaptate la specificul fiecarei platforme de social media.

## 4. Obiective
- Preluarea continutului din surse text si video.
- Analiza semantica a continutului sursa.
- Extragerea ideilor principale din materialul initial.
- Generarea automata de caption-uri pentru platforme diferite.
- Generarea de hashtag-uri relevante in functie de context si platforma.
- Oferirea unei interfete simple prin care utilizatorul poate incarca fisierul si vizualiza rezultatele.

## 5. Functionalitati principale
- Introducere articol sub forma de text.
- Upload video pentru prelucrare.
- Extrage transcriptul din continut video.
- Rezuma ideile principale din continut.
- Genereaza caption-uri diferentiate pentru LinkedIn, TikTok si Instagram.
- Genereaza hashtag-uri specifice fiecarei platforme.
- Ofera mai multe variante de caption pentru acelasi input.
- Permite selectarea tonului postarii: profesional, casual, educational sau promotional.

## 6. Structura proiectului pe echipa

### 6.1 NLP si procesare
Aceasta componenta reprezinta nucleul inteligent al aplicatiei si include analiza continutului, extragerea de informatie si generarea output-ului final.

#### Task-uri principale
- [ ] Definirea pipeline-ului de procesare pentru input text si video.
- [ ] Alegerea modelului sau serviciului pentru transcriere audio-video.
- [ ] Curatarea si normalizarea textului obtinut din articol sau transcript.
- [ ] Extragerea ideilor principale si a cuvintelor-cheie.
- [ ] Identificarea tonului si a temei continutului sursa.
- [ ] Proiectarea prompturilor pentru generarea caption-urilor.
- [ ] Generarea de caption-uri distincte pentru LinkedIn, TikTok si Instagram.
- [ ] Generarea automata de hashtag-uri relevante si variate.
- [ ] Stabilirea regulilor de diferentiere intre platforme.
- [ ] Testarea calitatii rezultatelor pe exemple diverse.
- [ ] Ajustarea prompturilor si a logicii de procesare in functie de rezultate.
- [ ] Definirea formatului de raspuns trimis catre backend.

#### Subtask-uri recomandate pentru partea de AI
- [ ] Cercetare privind modelele NLP potrivite pentru sumarizare si generare text.
- [ ] Evaluarea unei solutii de speech-to-text pentru fisiere video.
- [ ] Crearea unui set de exemple de input si output pentru testare.
- [ ] Construirea logicii de sumarizare a continutului lung.
- [ ] Construirea logicii de generare caption pe baza contextului extras.
- [ ] Construirea logicii de generare hashtag-uri pe baza temei si platformei.
- [ ] Definirea unor criterii de evaluare pentru calitatea caption-urilor.
- [ ] Documentarea limitarilor modelului si a cazurilor dificile.

### 6.2 Backend
Componenta de backend gestioneaza fluxul de date dintre interfata, modulele de procesare si stocare.

#### Task-uri principale
- [ ] Alegerea framework-ului backend.
- [ ] Crearea structurii proiectului si a rutelor principale.
- [ ] Implementarea endpoint-ului pentru upload text.
- [ ] Implementarea endpoint-ului pentru upload video.
- [ ] Integrarea modulului de procesare NLP.
- [ ] Gestionarea cererilor catre serviciile AI.
- [ ] Validarea input-ului primit de la utilizator.
- [ ] Tratarea erorilor pentru fisiere invalide sau raspunsuri incomplete.
- [ ] Definirea formatului JSON pentru request si response.
- [ ] Implementarea unui istoric minimal al solicitarilor, daca este necesar.
- [ ] Conectarea la o baza de date sau la un sistem de stocare, daca proiectul include persistenta.
- [ ] Scrierea documentatiei pentru API.

#### Posibile responsabilitati tehnice
- [ ] Gestionarea autentificarii, daca este inclusa in versiunea finala.
- [ ] Administrarea upload-ului de fisiere mari.
- [ ] Orchestrarea fluxului: input -> procesare -> output.
- [ ] Conectarea backend-ului la frontend.

### 6.3 Frontend
Frontend-ul va oferi interfata prin care utilizatorul interactioneaza cu aplicatia.

#### Task-uri principale
- [ ] Alegerea tehnologiei pentru interfata.
- [ ] Proiectarea layout-ului principal al aplicatiei.
- [ ] Crearea paginii de introducere a continutului text.
- [ ] Crearea componentei pentru upload video.
- [ ] Implementarea unui formular pentru alegerea platformei tinta.
- [ ] Implementarea unui selector pentru tonul dorit al postarii.
- [ ] Afisarea caption-urilor generate.
- [ ] Afisarea hashtag-urilor generate.
- [ ] Implementarea functiei de copiere rapida a rezultatelor.
- [ ] Afisarea starilor de incarcare si a mesajelor de eroare.
- [ ] Asigurarea unui design simplu, clar si responsive.



### Responsabilitati asumate pe partea de AI
- [ ] definirea pipeline-ului de procesare pentru text si video
- [ ] alegerea modelului de generare si a solutiei de transcriere
- [ ] realizarea logicii de sumarizare
- [ ] realizarea logicii de generare caption-uri
- [ ] realizarea logicii de generare hashtag-uri
- [ ] testarea si imbunatatirea calitatii output-ului
- [ ] colaborarea cu backend-ul pentru integrarea modulelor AI

## 8. Tehnologii posibile
- Frontend: React sau Next.js
- Backend: Node.js cu Express sau Python cu FastAPI
- NLP / AI: OpenAI API
- Speech-to-text: Whisper
- Baza de date: PostgreSQL sau MongoDB
- Stocare fisiere: sistem local sau cloud storage

## 9. Etape de dezvoltare
1. Analiza cerintei si impartirea responsabilitatilor in echipa.
2. Alegerea tehnologiilor si definirea arhitecturii.
3. Implementarea componentelor de frontend, backend si AI in paralel.
4. Integrarea modulelor dezvoltate de fiecare membru.
5. Testarea functionala a fluxului complet.
6. Corectarea problemelor si rafinarea rezultatelor generate.
7. Pregatirea documentatiei finale si a prezentarii proiectului.

## 10. Rezultate asteptate
La finalul proiectului, aplicatia trebuie sa poata primi un articol sau un video si sa returneze automat caption-uri si hashtag-uri relevante, adaptate platformei alese, intr-o forma clara si usor de utilizat.

## 11. Plan de implementare backend, Whisper si integrare frontend

### 11.1 Backend
- Crearea unui backend in Python cu FastAPI, deoarece se potriveste cu logica NLP existenta.
- Definirea a doua endpoint-uri principale: unul pentru text si unul pentru upload video.
- Standardizarea unui format unic de raspuns pentru summary, caption-uri, hashtag-uri, transcript si erori.
- Validarea input-ului pentru text gol, fisiere invalide si valori incorecte pentru platforma sau ton.

### 11.2 Integrare Whisper
- Mutarea logicii de transcriere din scriptul local intr-un serviciu backend dedicat.
- Extractia audio din video, daca este necesara, inainte de transcriere.
- Incarcarea modelului Whisper o singura data si reutilizarea lui pentru toate cererile.
- Trimiterea transcriptului mai departe catre modulul de sumarizare si generare caption-uri.

### 11.3 Integrare cu frontend-ul
- Inlocuirea modului mock din frontend cu apeluri reale catre backend.
- Pastrarea fluxului existent din interfata pentru text, video, platforme, ton si afisarea rezultatelor.
- Alinierea tipurilor din frontend cu schema de raspuns a backend-ului.
- Tratarea clara a starilor de incarcare si a erorilor pentru procesarea video, care poate dura mai mult.

### 11.4 Ordinea de implementare
1. Backend API si schema de raspuns.
2. Endpoint-ul de transcriere video cu Whisper.
3. Endpoint-ul pentru text si generarea caption-urilor.
4. Conectarea frontend-ului la backend.
5. Testare end-to-end pentru un exemplu de text si unul de video.

## 12. Observatii pentru colaborare pe GitHub
- [ ] Fiecare membru actualizeaza sectiunea corespunzatoare componentei sale.
- [ ] Task-urile se bifeaza pe masura ce sunt finalizate.
- [ ] README-ul poate fi extins cu instructiuni de rulare, arhitectura si contributii dupa stabilirea stack-ului final.
