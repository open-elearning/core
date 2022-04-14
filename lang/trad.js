
function Frequire(path){
	
	this.remote = {};
	this.remote.getGlobal = function (path){
		return new FgetGlobal();
	}
	this.ipcRenderer = {};
	this.ipcRenderer.send = function (mess,data){
		return new FgetGlobal();
	}
}

function FgetGlobal(path){
	this.lang = "en"; 
	this.listassets = "en";
	this.allData = [];

}

if(typeof window.require === "undefined"){
	
	window.require = function(path){
		return new Frequire(path);
	}

}

let remElectron = require('electron');
let remote = remElectron.remote;
let globalLang = "";
let memglobalLang = "";

let tradData = [
	{"id": "addintro",
		"en": 'add introduction',
		"fr": 'ajouter une introduction',
		"de": 'einführung hinzufügen',
		"es": 'añadir introducción',
		"it": 'aggiungere un\'introduzione',
		"ne": 'een inleiding toevoegen',
		"po": 'Dodaj wstęp',
		"pobr": 'Adicionar introdução'
	},
	{"id": "addcmq",
		"en": 'add mcq',
		"fr": 'ajouter qcm',
		"de": 'mcq hinzufügen',
		"es": 'agregar mcq',
		"it": 'aggiungere qcm',
		"ne": 'qcm toevoegen',
		"po": 'Dodaj Pytanie WW',
		"pobr": 'Adicionar Questão de Múltipla Escolha'
	},
	{"id": "nextpage",
		"en": 'Next Page',
		"fr": 'Page suivante',
		"de": 'Nächste Seite',
		"es": 'Siguiente página',
		"it": 'Prossima pagina',
		"ne": 'Volgende pagina',
		"po": 'Następna Strona',
		"pobr": 'Próxima página'
	},
	{"id": "nextpagefeedback",
		"en": 'Next page and correction',
		"fr": 'Page suivante correction',
		"de": 'Nächste Seite Korrektur',
		"es": 'Siguiente página corrección',
		"it": 'Prossima pagina correzione',
		"ne": 'Volgende pagina correctie',
		"po": 'Następna Strona i korekta',
		"pobr": 'Próxima página e correção'
	},
	{"id": "nextpageisok",
		"en": 'Next&nbsp;Page&nbsp;if&nbsp;OK',
		"fr": 'Page&nbsp;suivante&nbsp;si&nbsp;OK',
		"de": 'Nächste&nbsp;Seite&nbsp;wenn&nbsp;OK',
		"es": 'Página&nbsp;siguiente&nbsp;si&nbsp;OK',
		"it": 'Prossima&nbsp;pagina&nbsp;si&nbsp;OK',
		"ne": 'Volgende&nbsp;pagina&nbsp;indien&nbsp;OK',
		"po": 'Następn&nbsp;Strona&nbsp;jeżeli&nbsp;OK',
		"pobr": 'Próxima&nbsp;Página&nbsp;se&nbsp;OK'
	},
	{"id": "previouspage",
		"en": 'Previous page',
		"fr": 'Page précédente',
		"de": 'Vorherige Seite',
		"es": 'Pagina anterior',
		"it": 'Pagina precedente',
		"ne": 'Vorige pagina',
		"po": 'Poprzednia Strona',
		"pobr": 'Página Anterior'
	},
	{"id": "tothepage",
		"en": 'To the page...',
		"fr": 'Vers la page...',
		"de": 'Zur Seite...',
		"es": 'A la pagina...',
		"it": 'Alla pagina...',
		"ne": 'Naar de pagina...',
		"po": 'Do strony ...',
		"pobr": 'Para a página ...'
	},
	{"id": "personalact",
		"en": 'Personal Act ...',
		"fr": 'Action perso ...',
		"de": 'Benut.. Aktion...',
		"es": 'Acción perso ...',
		"it": 'Azione personale ...',
		"ne": 'Persoonlijke actie...',
		"po": 'Własna akcja',
		"pobr": 'Ato pessoal...'
	},
	{"id": "displayimage",
		"en": 'Display image ...',
		"fr": 'Afficher image ...',
		"de": 'Bild anzeigen ...',
		"es": 'Ver imagen ...',
		"it": 'Visualizza Immagine ...',
		"ne": 'Afbeelding bekijken...',
		"po": 'Wyświetl obraz ...',
		"pobr": 'Mostrar imagem...'
	},
	{"id": "fullscreen",
		"en": 'Full screen',
		"fr": 'Plein écran',
		"de": 'Vollbildschirmn',
		"es": 'Pantalla completa',
		"it": 'Schermo intero',
		"ne": 'Volledig scherm',
		"po": 'Pełny ekran',
		"pobr": 'Tela cheia'
	},
	{"id": "autonextpage",
		"en": 'Auto next page',
		"fr": 'Auto page suivante',
		"de": 'Auto nächste Seite',
		"es": 'Auto pagina siguiente',
		"it": 'Auto pagina successiva',
		"ne": 'Auto volgende pagina',
		"po": 'Auto następna strona',
		"pobr": 'Página seguinte automática'
	},
	{"id": "autoplay",
		"en": 'Autoplay',
		"fr": 'Lecture automatique',
		"de": 'Automatisches Abspielen',
		"es": 'Auto-reproducción',
		"it": 'Lettura automatica',
		"ne": 'Automatisch lezen',
		"po": 'Autoplay',
		"pobr": 'Reprodução automática'
	},
	{"id": "chooseacolor",
		"en": 'Choose a color',
		"fr": 'Choisir une couleur',
		"de": 'Wähle eine Farbe',
		"es": 'Elige un color',
		"it": 'Scegliere un colore',
		"ne": 'Kies een kleur',
		"po": 'Wybierz kolor',
		"pobr": 'Escolha uma cor'
	},
	{"id": "ctr-title",
		"en": 'Open-Source Course Editor',
		"fr": 'Editeur elearning Open-Source',
		"de": 'Open-Source E-Learning-Editor',
		"es": 'Editor de elearning Open Source',
		"it": 'Editore elearning Open-Source',
		"ne": 'Open-Source E-Learning-Editor',
		"po": 'Open-Source Course Editor',
		"pobr": 'Editor de Curso de Código Aberto'
	},
	{"id": "sampletext",
		"en": 'Write your text here',
		"fr": 'écrire votre texte ici',
		"de": 'Schreiben Sie hier Ihren Text',
		"es": 'Escribe tu texto aquí',
		"it": 'Scrivi il tuo testo qui',
		"ne": 'Schrijf hier uw tekst',
		"po": 'Wpisz tekst',
		"pobr": 'Escreva seu texto aqui'
	},
	{"id": "sampletitle",
		"en": 'Enter title',
		"fr": 'Entrer titre',
		"de": 'Titel eingeben',
		"es": 'Ingresar titulo',
		"it": 'Inserisci il titolo',
		"ne": 'Titel invoeren',
		"po": 'Wpisz  tytuł',
		"pobr": 'Digite o título'
	},
	{"id": "lbltitle",
		"en": 'title',
		"fr": 'titre',
		"de": 'Titel',
		"es": 'titulo',
		"it": 'titolo',
		"ne": 'titel',
		"po": 'tytuł',
		"pobr": 'título'
	},
	{"id": "lblcomic",
		"en": 'Comics',
		"fr": 'Bandes dessinées',
		"de": 'Comics',
		"es": 'Historietas',
		"it": 'Fumetti',
		"ne": 'Strips',
		"po": 'Komiks',
		"pobr": 'Histórias em quadrinhos'
	}
	,
	{"id": "labelLife",
		"en": 'Life',
		"fr": 'Vies',
		"de": 'Leben',
		"es": 'Vida',
		"it": 'Vive',
		"ne": 'Lives',
		"po": 'Życie',
		"pobr": 'Vida'
	},
	{"id": "labelHangedMan",
		"en": 'hanged man',
		"fr": 'Le pendu',
		"de": 'gehängter Mann',
		"es": 'El ahorcado',
		"it": 'L\'impiccato',
		"ne": 'De opgehangen man',
		"po": 'Gra szubienica',
		"pobr": 'Enforcado'
	},
	{"id": "next",
		"en": 'next',
		"fr": 'suivant',
		"de": 'nächster',
		"es": 'siguiente',
		"it": 'seguendo',
		"ne": 'volgende',
		"po": 'następny',
		"pobr": 'próximo'
	},
	{"id": "return",
		"en": 'return',
		"fr": 'retour',
		"de": 'rückkehr',
		"es": 'regreso',
		"it": 'ritorna',
		"ne": 'terug',
		"po": 'powrot',
		"pobr": 'volta'
	},
	{"id": "reply",
		"en": 'reply',
		"fr": 'réponse',
		"de": 'antworten',
		"es": 'respuesta',
		"it": 'Rispondi',
		"ne": 'Antwoord',
		"po": 'ponów',
		"pobr": 'responder'
	},
	{"id": "writeqcm",
		"en": 'Write your question here',
		"fr": 'Ecrivez votre question ici',
		"de": 'Schreiben Sie Ihre Frage hier',
		"es": 'Escribe tu pregunta aquí',
		"it": 'Scrivi qui la tua domanda',
		"ne": 'Stel hier uw vraag',
		"po": 'Wpisz pytanie',
		"pobr": 'Escreva sua pergunta aqui'
	},
	{"id": "secretword",
		"en": 'Secret word',
		"fr": 'Mot secret',
		"de": 'Geheimwort',
		"es": 'Palabra secreta',
		"it": 'Parola segreta',
		"ne": 'Geheim woord',
		"po": 'Sekretne slowo',
		"pobr": 'Palavra secreta'
	},
	{"id": "definition",
		"en": 'Definition',
		"fr": 'Définition',
		"de": 'Definition',
		"es": 'Definición',
		"it": 'Definizione',
		"ne": 'Definitie',
		"po": 'Definicja',
		"pobr": 'Definição'
	},
	{"id": "newProject",
		"en": 'New Project',
		"fr": 'Nouveau Projet',
		"de": 'Neues Projekt',
		"es": 'Nuevo proyecto',
		"it": 'Nuovo progetto',
		"ne": 'Nieuw Project',
		"po": 'Nowy Projekt',
		"pobr": 'Novo Projeto'
	},
	{"id": "openProject",
		"en": 'Open Project',
		"fr": 'Ouvrir Projet',
		"de": 'Projekt öffnen',
		"es": 'Proyecto abierto',
		"it": 'Progetto aperto',
		"ne": 'Open Project',
		"po": 'Otwórz Projekt',
		"pobr": 'Abrir Projeto'
	},
	{"id": "chooseamodel",
		"en": 'Choose a mode',
		"fr": 'Choisir un modèle',
		"de": 'Wähle ein Modell',
		"es": 'Escoge un modelo',
		"it": 'Scegliere un modello',
		"ne": 'Kies een model',
		"po": 'Wybierz tryb',
		"pobr": 'Escolher um modo'
	},
	{"id": "menuFile",
		"en": 'File',
		"fr": 'Fichier',
		"de": 'Datei',
		"es": 'Archivo',
		"it": 'File',
		"ne": 'Bestand',
		"po": 'Plik',
		"pobr": 'Arquivo'
	},
	{"id": "menuMain",
		"en": 'Main',
		"fr": 'Accueil',
		"de": 'Willkommen',
		"es": 'Bienvenida',
		"it": 'Accoglienza',
		"ne": 'Home',
		"po": 'Główny',
		"pobr": 'Principal'
	},
	{"id": "menuGame",
		"en": 'Game',
		"fr": 'Jeux',
		"de": 'Spiele',
		"es": 'Juegos',
		"it": 'Giochi',
		"ne": 'Spelletjes',
		"po": 'Gra',
		"pobr": 'Jogo'
	},
	{"id": "labelSave",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Speichern',
		"es": 'Guardar',
		"it": 'Registra',
		"ne": 'Registreren',
		"po": 'Zapisz',
		"pobr": 'Salvar'
	},
	{"id": "labelOverview",
		"en": 'Overview',
		"fr": 'Aperçu',
		"de": 'Überblick',
		"es": 'Previsualización',
		"it": 'Panoramica',
		"ne": 'Overzicht',
		"po": 'Przegląd',
		"pobr": 'Visão geral'
	},
	{"id": "labelPublish",
		"en": 'Publish',
		"fr": 'Publier',
		"de": 'Publish',
		"es": 'Publicar',
		"it": 'Pubblica',
		"ne": 'Publiceren',
		"po": 'Publikuj',
		"pobr": 'Publicar'
	},
	{"id": "labelScore",
		"en": 'Score',
		"fr": 'Score',
		"de": 'Punktzahl',
		"es": 'Resultado',
		"it": 'Punteggio',
		"ne": 'Score',
		"po": 'Punkty',
		"pobr": 'Pontuação'
	},
	{"id": "labelScoreTable",
		"en": 'Score Table',
		"fr": 'Table de Score',
		"de": 'Tisch von punktzahl ',
		"es": 'Mesa de tanteo',
		"it": 'Tabella dei punteggi',
		"ne": 'Scoretabel',
		"po": 'Tabela punktów',
		"pobr": 'Tabela de pontuação'
	},
	{"id": "labelBase",
		"en": 'Base',
		"fr": 'Base',
		"de": 'Datenbank ',
		"es": 'Base',
		"it": 'Base',
		"ne": 'Basis',
		"po": 'Baza danych',
		"pobr": 'Base'
	},
	{"id": "labelPageStyle",
		"en": 'Page style',
		"fr": 'Style page',
		"de": 'Seitenstil',
		"es": 'Estilo de página',
		"it": 'Stile di pagina',
		"ne": 'Paginastijl',
		"po": 'Styl strony',
		"pobr": 'Estilo da página'
	},
	{"id": "exportBtnProjectLink",
		"en": 'To SCORM package',
		"fr": 'Vers paquet SCORM',
		"de": 'Zum SCORM-Paket',
		"es": 'Hacia paquete SCORM',
		"it": 'Al pacchetto SCORM',
		"ne": 'Naar SCORM-pakket',
		"po": 'Do pakietu SCORM',
		"pobr": 'Para pacote SCORM'
	},
	{"id": "exportBtnProjectHtml",
		"en": 'To local HTML',
		"fr": 'Vers dossier local',
		"de": 'Zu örtlicher Akte',
		"es": 'Hacia expediente local',
		"it": 'Al file locale',
		"ne": 'Naar lokaal bestand',
		"po": 'Do lokalnego pliku HTML',
		"pobr": 'Para HTML local'
	},
	{"id": "labelTitle",
		"en": 'Title',
		"fr": 'Titre',
		"de": 'Titel',
		"es": 'Título',
		"it": 'Titolo',
		"ne": 'Titel',
		"po": 'Tytuł',
		"pobr": 'Título'
	},
	{"id": "labelPageStyle",
		"en": 'Page style',
		"fr": 'Style Page',
		"de": 'Stil Seite',
		"es": 'Estilo Página',
		"it": 'Pagina di stile',
		"ne": 'Stijl pagina',
		"po": 'Styl strony',
		"pobr": 'Estilo da página'
	},
	{"id": "labelSteps",
		"en": 'Steps',
		"fr": 'Etapes',
		"de": 'Scritte',
		"es": 'Etapas',
		"it": 'Passi',
		"ne": 'Stappen',
		"po": 'Kroki',
		"pobr": 'Etapas'
	},
	{"id": "labelMct",
		"en": 'Chosing words',
		"fr": 'Choix des termes',
		"de": 'Chosing words',
		"es": 'Elegir palabras',
		"it": 'Parole scelte',
		"ne": 'Woorden kiezen',
		"po": 'Chosing words',
		"pobr": 'Escolhendo palavras'
	},
	{"id": "labelInput",
		"en": 'Input',
		"fr": 'Zone de saisie',
		"de": 'Eingabefeld',
		"es": 'campo de entrada',
		"it": 'Campo d\'ingresso',
		"ne": 'Invoerveld',
		"po": 'Wprowadź tekst',
		"pobr": 'Entrada'
	},
	{"id": "labelLines",
		"en": 'Lines',
		"fr": 'Lignes',
		"de": 'Linien',
		"es": 'Líneas',
		"it": 'Linee',
		"ne": 'Lijnen',
		"po": 'Linie',
		"pobr": 'Linhas'
	},
	{"id": "labelMcq",
		"en": 'Quiz',
		"fr": 'QCM',
		"de": 'Multiple Choice',
		"es": 'QCM',
		"it": 'Multiple Choice',
		"ne": 'Multiple Choice',
		"po": 'Test',
		"pobr": 'Quis'
	},
	{"id": "labelMcl",
		"en": 'Link the words',
		"fr": 'Liez les termes',
		"de": 'Link the words',
		"es": 'Enlazar las palabras',
		"it": 'Collega le parole',
		"ne": 'Verbind de woorden',
		"po": 'Połącz słowa',
		"pobr": 'Ligue as palavras'
	},
	{"id": "labelImage",
		"en": 'Image',
		"fr": 'Image',
		"de": 'Bild',
		"es": 'Imagen',
		"it": 'Immagine',
		"ne": 'Afbeelding',
		"po": 'Obraz',
		"pobr": 'Imagem'
	},
	{"id": "labelDialog",
		"en": 'Dialog',
		"fr": 'Dialogue',
		"de": 'Dialog',
		"es": 'Diálogo',
		"it": 'Dialogo',
		"ne": 'Dialoog',
		"po": 'Rozmowa',
		"pobr": 'Diálogo'
	},
	{"id": "labelTextZone",
		"en": 'Text zone',
		"fr": 'Zone de texte',
		"de": 'Textzone',
		"es": 'Zona de texto',
		"it": 'Zona di testo',
		"ne": 'Tekst Zone',
		"po": 'Pole tekstowe',
		"pobr": 'Zona de texto'
	},
	{"id": "labelButton",
		"en": 'Button',
		"fr": 'Bouton',
		"de": 'Taste',
		"es": 'Botón',
		"it": 'Pulsante',
		"ne": 'Knop',
		"po": 'Przycisk',
		"pobr": 'Botão'
	},
	{"id": "labelSpeechtext",
		"en": 'Speech text',
		"fr": 'Bulle de texte',
		"de": 'Sprachtext',
		"es": 'Burbuja de texto',
		"it": 'Bolla di testo',
		"ne": 'Tekstballon',
		"po": 'Dymki rozmowy',
		"pobr": 'Discurso'
	},
	{"id": "saveBtnProject",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Speichern',
		"es": 'Salvar',
		"it": 'Registra',
		"ne": 'Registreren',
		"po": 'Zapisz',
		"pobr": 'Salvar'
	},
	{"id": "exportBtnProject",
		"en": 'Export&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"fr": 'Exporter&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"de": 'Exportieren&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"es": 'Exportar&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"it": 'Esportazione&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"ne": 'Exporteren&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"po": 'Eksport&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"pobr": 'Exportar&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;'
	},
	{"id": "exportBtnProject2",
		"en": 'Extra Code',
		"fr": 'Code supplémentaire',
		"de": 'Zusätzlicher Code',
		"es": 'Código Extra',
		"it": 'Codice aggiuntivo',
		"ne": 'Extra code',
		"po": 'Kod Extra',
		"pobr": 'Código Extra'
	},
	{"id": "lbloptions",
		"en": 'Options',
		"fr": 'Options',
		"de": 'Optionen',
		"es": 'Opciones',
		"it": 'Opzioni',
		"ne": 'Opties',
		"po": 'Opcje',
		"pobr": 'Opções'
	},
	{"id": "quitBtnProject",
		"en": 'Quit',
		"fr": 'Quitter',
		"de": 'Beenden',
		"es": 'Dejar',
		"it": 'Lascia',
		"ne": 'Verlaat',
		"po": 'Wyjście',
		"pobr": 'Sair'
	},
	{"id": "deleteMessage",
		"en": 'Do you want to delete this item?',
		"fr": 'Voulez-vous supprimer cet objet?',
		"de": 'Möchten Sie dieses Objekt löschen?',
		"es": '¿Quieres eliminar este objeto?',
		"it": 'Vuoi cancellare questa voce?',
		"ne": 'Wilt u dit item verwijderen?',
		"po": 'Do you want to delete this item?',
		"pobr": 'Você deseja apagar este item?'
	},
	{"id": "save",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Speichern',
		"es": 'Salvar',
		"it": 'Registra',
		"ne": 'Registreren',
		"po": 'Zapisz',
		"pobr": 'Salvar'
	},
	{"id": "lblsave",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Speichern',
		"es": 'Salvar',
		"it": 'Registra',
		"ne": 'Registreren',
		"po": 'Zapisz',
		"pobr": 'Salvar'
	},
	{"id": "cancel",
		"en": 'Cancel',
		"fr": 'Annuler',
		"de": 'Abbrechen',
		"es": 'Cancelar',
		"it": 'Cancella',
		"ne": 'Annuleren',
		"po": 'Anuluj',
		"pobr": 'Cancelar'
	},
	{"id": "lblcancel",
		"en": 'Cancel',
		"fr": 'Annuler',
		"de": 'Abbrechen',
		"es": 'Cancelar',
		"it": 'Cancella',
		"ne": 'Annuleren',
		"po": 'Anuluj',
		"pobr": 'Cancelar'
	},
	{"id": "yes",
		"en": 'Yes',
		"fr": 'Oui',
		"de": 'Ja',
		"es": 'Sí',
		"it": 'Sì',
		"ne": 'Ja',
		"po": 'Tak',
		"pobr": 'Sim'
	},
	{"id": "no",
		"en": 'No',
		"fr": 'Non',
		"de": 'Nein',
		"es": 'No',
		"it": 'No',
		"ne": 'Geen',
		"po": 'Nie',
		"pobr": 'Não'
	},
	{"id": "edition",
		"en": 'edition',
		"fr": 'édition',
		"de": 'auflage',
		"es": 'edición',
		"it": 'edizione',
		"ne": 'editie',
		"po": 'edycja',
		"pobr": 'edição'
	},
	{"id": "text",
		"en": 'text',
		"fr": 'texte',
		"de": 'texte',
		"es": 'texto',
		"it": 'testo',
		"ne": 'tekst',
		"po": 'tekst',
		"pobr": 'texto'
	},
	{"id": "distractors",
		"en": 'Distractors',
		"fr": 'distracteurs',
		"de": 'Distraktoren',
		"es": 'Distractores',
		"it": 'Distrattori',
		"ne": 'Afleiders',
		"po": 'Rozproszenie',
		"pobr": 'Destratores'
	},
	{"id": "linkingtexts",
		"en": 'linking texts',
		"fr": 'liens texte',
		"de": 'txte verknüpfen',
		"es": 'enlazando textos',
		"it": 'link di testo',
		"ne": 'tekstlinks',
		"po": 'łączenie tekstów',
		"pobr": 'textos de link'
	},
	{"id": "apply",
		"en": 'apply',
		"fr": 'appliquer',
		"de": 'sich bewerben',
		"es": 'aplicar',
		"it": 'applicare',
		"ne": 'toepassen',
		"po": 'zatwierdź',
		"pobr": 'Aplicar'
	},
	{"id": "upload",
		"en": 'upload',
		"fr": 'charger',
		"de": 'hochladen',
		"es": 'subir',
		"it": 'caricare',
		"ne": 'laden',
		"po": 'załaduj',
		"pobr": 'carregar'
	},
	{"id": "markwords",
		"en": 'Mark the words',
		"fr": 'Marquez les mots',
		"de": 'Mark the words',
		"es": 'Marque las palabras',
		"it": 'Segna le parole',
		"ne": 'Markeer de woorden',
		"po": 'Zaznacz słowa',
		"pobr": 'Marque as palavras'
	},
	
];

let timeTrad = 3000;

function traductor(){
	
	var getGlob = remote.getGlobal('sharedObj');
	globalLang = getGlob.lang;
	
	if(memglobalLang!=globalLang){
		
		memglobalLang = globalLang;
		
		for(var i = 0; i < tradData.length; i++){ 
			
			var idObj = tradData[i].id;
			
			var el = document.getElementById(idObj);
			if(el){
				
				if(globalLang=='en'){
					el.innerHTML = '&nbsp;' + tradData[i].en + '&nbsp;';
				}
				if(globalLang=='fr'){
					el.innerHTML = '&nbsp;' + tradData[i].fr + '&nbsp;';
				}
				if(globalLang=='de'){
					el.innerHTML = '&nbsp;' + tradData[i].de + '&nbsp;';
				}
				if(globalLang=='es'){
					el.innerHTML = '&nbsp;' + tradData[i].es + '&nbsp;';
				}
				if(globalLang=='it'){
					el.innerHTML = '&nbsp;' + tradData[i].it + '&nbsp;';
				}
				if(globalLang=='ne'){
					el.innerHTML = '&nbsp;' + tradData[i].ne + '&nbsp;';
				}
				if(globalLang=='po'){
					el.innerHTML = '&nbsp;' + tradData[i].po + '&nbsp;';
				}
				if(globalLang=='pobr'){
					el.innerHTML = '&nbsp;' + tradData[i].pobr + '&nbsp;';
				}
				
			}
			
			var elcn = document.getElementsByClassName(idObj);
			
			for(var j=0;j<elcn.length;j++){
				
				if(globalLang=='en'){
					elcn[j].innerHTML = tradData[i].en;
				}
				if(globalLang=='fr'){
					elcn[j].innerHTML = tradData[i].fr;
				}
				if(globalLang=='de'){
					elcn[j].innerHTML = tradData[i].de;
				}
				if(globalLang=='es'){
					elcn[j].innerHTML = tradData[i].es;
				}
				if(globalLang=='it'){
					elcn[j].innerHTML = tradData[i].it;
				}
				if(globalLang=='ne'){
					elcn[j].innerHTML = tradData[i].ne;
				}
				if(globalLang=='po'){
					elcn[j].innerHTML = tradData[i].po;
				}
				if(globalLang=='pobr'){
					elcn[j].innerHTML = tradData[i].pobr;
				}
				
			}
			
		}
		
	}

	timeTrad = timeTrad + 500;
	
	setTimeout(function(){
		traductor();
	},timeTrad);
	
}

function getTrdU(idtrad){
	var txtInit = getTrd(idtrad);
	return txtInit.charAt(0).toUpperCase() + txtInit.slice(1);
}

function getTrd(idtrad){
	
	for(var i = 0; i < tradData.length; i++){ 

		if(idtrad==tradData[i].id){
			
			if(globalLang=='en'){
				return tradData[i].en;
			}
			if(globalLang=='fr'){
				return tradData[i].fr;
			}
			if(globalLang=='de'){
				return tradData[i].de;
			}
			if(globalLang=='es'){
				return tradData[i].es;
			}
			if(globalLang=='it'){
				return tradData[i].it;
			}
			if(globalLang=='ne'){
				return tradData[i].ne;
			}
			if(globalLang=='po'){
				return tradData[i].po;
			}
			if(globalLang=='pobr'){
				return tradData[i].pobr;
			}

		}

	}
	
	return idtrad;
	
}

traductor();
