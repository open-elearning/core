

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
	},
	{"id": "addcmq",
		"en": 'add mcq',
		"fr": 'ajouter qcm',
		"de": 'mcq hinzufügen',
		"es": 'agregar mcq',
	},
	{"id": "nextpage",
		"en": 'Next Page',
		"fr": 'Page suivante',
		"de": 'Nächste Seite',
		"es": 'Siguiente página',
	},
	{"id": "nextpagefeedback",
		"en": 'Next page and correction',
		"fr": 'Page suivante et correction',
		"de": 'Nächste Seite und Korrektur',
		"es": 'Siguiente página y corrección',
	},
	{"id": "nextpageisok",
		"en": 'Next&nbsp;Page&nbsp;if&nbsp;OK',
		"fr": 'Page&nbsp;suivante&nbsp;si&nbsp;OK',
		"de": 'Nächste&nbsp;Seite&nbsp;wenn&nbsp;OK',
		"es": 'Página&nbsp;siguiente&nbsp;si&nbsp;OK'
	},
	{"id": "previouspage",
		"en": 'Previous page',
		"fr": 'Page précédente',
		"de": 'Vorherige Seite',
		"es": 'Pagina anterior'
	},
	{"id": "tothepage",
		"en": 'To the page...',
		"fr": 'Vers la page...',
		"de": 'Zur Seite...',
		"es": 'A la pagina...'
	},
	{"id": "personalact",
		"en": 'Personal Act ...',
		"fr": 'Action perso ...',
		"de": 'Benut.. Aktion...',
		"es": 'Acción perso ...'
	},
	{"id": "fullscreen",
		"en": 'Full screen',
		"fr": 'Plein écran',
		"de": 'Vollbildschirmn',
		"es": 'Pantalla completa',
	},
	{"id": "autonextpage",
		"en": 'Auto next page',
		"fr": 'Auto page suivante',
		"de": 'Auto nächste Seite',
		"es": 'Auto pagina siguiente',
	},
	{"id": "autoplay",
		"en": 'Autoplay',
		"fr": 'Lecture automatique',
		"de": 'Automatisches Abspielen',
		"es": 'Auto-reproducción',
	},
	{"id": "chooseacolor",
		"en": 'Choose a color',
		"fr": 'Choisir une couleur',
		"de": 'Wähle eine Farbe',
		"es": 'Elige un color',
	},
	{"id": "ctr-title",
		"en": 'Open-Source Course Editor',
		"fr": 'Editeur elearning Open-Source',
		"de": 'Open-Source E-Learning-Editor',
		"es": 'Editor de elearning Open Source',
	},
	{"id": "sampletext",
		"en": 'Write your text here',
		"fr": 'écrire votre texte ici',
		"de": 'Schreiben Sie hier Ihren Text',
		"es": 'Escribe tu texto aquí',
	},
	{"id": "sampletitle",
		"en": 'Enter title',
		"fr": 'Entrer titre',
		"de": 'Titel eingeben',
		"es": 'Ingresar titulo',
	},
	{"id": "lbltitle",
		"en": 'title',
		"fr": 'titre',
		"de": 'Titel',
		"es": 'titulo',
	},
	{"id": "lblcomic",
		"en": 'Comics',
		"fr": 'Bandes dessinées',
		"de": 'Comics',
		"es": 'Historietas',
	}
	,
	{"id": "labelLife",
		"en": 'Life',
		"fr": 'Vies',
		"de": 'Leben',
		"es": 'Vida',
	},
	{"id": "labelHangedMan",
		"en": 'hanged man',
		"fr": 'Le pendu',
		"de": 'gehängter Mann',
		"es": 'El ahorcado',
	},
	{"id": "next",
		"en": 'next',
		"fr": 'suivant',
		"de": 'nächster',
		"es": 'siguiente',
	},
	{"id": "return",
		"en": 'return',
		"fr": 'retour',
		"de": 'rückkehr',
		"es": 'regreso',
	},
	{"id": "reply",
		"en": 'reply',
		"fr": 'réponse',
		"de": 'antworten',
		"es": 'respuesta',
	},
	{"id": "writeqcm",
		"en": 'Write your question here',
		"fr": 'Ecrivez votre question ici',
		"de": 'Schreiben Sie Ihre Frage hier',
		"es": 'Escribe tu pregunta aquí',
	},
	{"id": "secretword",
		"en": 'Secret word',
		"fr": 'Mot secret',
		"de": 'Geheimwort',
		"es": 'Palabra secreta',
	},
	{"id": "definition",
		"en": 'Definition',
		"fr": 'Définition',
		"de": 'Definition',
		"es": 'Definición',
	},
	{"id": "newProject",
		"en": 'New Project',
		"fr": 'Nouveau Projet',
		"de": 'Neues Projekt',
		"es": 'Nuevo proyecto',
	},
	{"id": "openProject",
		"en": 'Open Project',
		"fr": 'Ouvrir Projet',
		"de": 'Projekt öffnen',
		"es": 'Proyecto abierto',
	},
	{"id": "chooseamodel",
		"en": 'Choose a mode',
		"fr": 'Choisir un modèle',
		"de": 'Wähle ein Modell',
		"es": 'Escoge un modelo',
	},
	{"id": "menuFile",
		"en": 'File',
		"fr": 'Fichier',
		"de": 'Datei',
		"es": 'Archivo',
	},
	{"id": "menuMain",
		"en": 'Main',
		"fr": 'Accueil',
		"de": 'Willkommen',
		"es": 'Bienvenida',
	},
	{"id": "menuGame",
		"en": 'Game',
		"fr": 'Jeux',
		"de": 'Spiele',
		"es": 'Juegos',
	},
	{"id": "labelSave",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Speichern',
		"es": 'Guardar',
	},
	{"id": "labelOverview",
		"en": 'Overview',
		"fr": 'Aperçu',
		"de": 'Überblick',
		"es": 'Previsualización',
	},
	{"id": "labelPublish",
		"en": 'Publish',
		"fr": 'Publier',
		"de": 'Publish',
		"es": 'Publicar',
	},
	{"id": "labelScore",
		"en": 'Score',
		"fr": 'Score',
		"de": 'Punktzahl',
		"es": 'Resultado',
	},
	{"id": "labelScoreTable",
		"en": 'Score Table',
		"fr": 'Table de Score',
		"de": 'Tisch von punktzahl ',
		"es": 'Mesa de tanteo',
	},
	{"id": "labelBase",
		"en": 'Base',
		"fr": 'Base',
		"de": 'Datenbank ',
		"es": 'Base',
	},
	{"id": "labelPageStyle",
		"en": 'Page style',
		"fr": 'style page',
		"de": 'Seitenstil',
		"es": 'Estilo de página',
	},
	{"id": "exportBtnProjectLink",
		"en": 'To SCORM package',
		"fr": 'Vers paquet SCORM',
		"de": 'Zum SCORM-Paket',
		"es": 'Hacia paquete SCORM',
	},
	{"id": "exportBtnProjectHtml",
		"en": 'To local HTML',
		"fr": 'Vers dossier local',
		"de": 'Zu örtlicher Akte',
		"es": 'Hacia expediente local',
	},
	{"id": "labelTitle",
		"en": 'Title',
		"fr": 'Titre',
		"de": 'Titel',
		"es": 'Título',
	},
	{"id": "labelPageStyle",
		"en": 'Page style',
		"fr": 'Style Page',
		"de": 'Stil Seite',
		"es": 'Estilo Página',
	},
	{"id": "labelSteps",
		"en": 'Steps',
		"fr": 'Etapes',
		"de": 'Scritte',
		"es": 'Etapas',
	},
	{"id": "labelMct",
		"en": 'MCT',
		"fr": 'TCM',
		"de": 'MCT',
		"es": 'MCT',
	},
	{"id": "labelInput",
		"en": 'Input',
		"fr": 'Zone de saisie',
		"de": 'Eingabefeld',
		"es": 'campo de entrada',
	},
	{"id": "labelLines",
		"en": 'Lines',
		"fr": 'Lignes',
		"de": 'Linien',
		"es": 'Líneas',
	},
	{"id": "labelMcq",
		"en": 'MCQ',
		"fr": 'QCM',
		"de": 'Multiple Choice',
		"es": 'QCM',
	},
	{"id": "labelImage",
		"en": 'Image',
		"fr": 'Image',
		"de": 'Bild',
		"es": 'Imagen',
	},
	{"id": "labelDialog",
		"en": 'Dialog',
		"fr": 'Dialogue',
		"de": 'Dialog',
		"es": 'Diálogo',
	},
	{"id": "labelTextZone",
		"en": 'Text zone',
		"fr": 'Zone de texte',
		"de": 'Textzone',
		"es": 'Zona de texto',
	},
	{"id": "labelButton",
		"en": 'Button',
		"fr": 'Bouton',
		"de": 'Taste',
		"es": 'Botón',
	},
	{"id": "labelSpeechtext",
		"en": 'Speech text',
		"fr": 'Bulle de texte',
		"de": 'Sprachtext',
		"es": 'Burbuja de texto',
	},
	{"id": "saveBtnProject",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Sparen',
		"es": 'Salvar'
	},
	{"id": "exportBtnProject",
		"en": 'Export&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"fr": 'Exporter&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"de": 'Exportieren&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
		"es": 'Exportar&nbsp;&nbsp;&nbsp;&nbsp;&#x203A;',
	},
	{"id": "exportBtnProject2",
		"en": 'Extra Code',
		"fr": 'Code supplémentaire',
		"de": 'Zusätzlicher Code',
		"es": 'Código Extra',
	},
	{"id": "lbloptions",
		"en": 'Options',
		"fr": 'Options',
		"de": 'Optionen',
		"es": 'Opciones',
	},
	{"id": "quitBtnProject",
		"en": 'Quit',
		"fr": 'Quitter',
		"de": 'Verlassen',
		"es": 'Dejar',
	},
	{"id": "deleteMessage",
		"en": 'Do you want to delete this item?',
		"fr": 'Voulez-vous supprimer cet objet?',
		"de": 'Möchten Sie dieses Objekt löschen?',
		"es": '¿Quieres eliminar este objeto?',
	},
	{"id": "save",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Sparen',
		"es": 'Salvar',
	},
	{"id": "lblsave",
		"en": 'Save',
		"fr": 'Enregistrer',
		"de": 'Sparen',
		"es": 'Salvar',
	},
	{"id": "cancel",
		"en": 'Cancel',
		"fr": 'Annuler',
		"de": 'Stornieren',
		"es": 'Cancelar',
	},
	{"id": "lblcancel",
		"en": 'Cancel',
		"fr": 'Annuler',
		"de": 'Stornieren',
		"es": 'Cancelar',
	},
	{"id": "yes",
		"en": 'Yes',
		"fr": 'Oui',
		"de": 'Ja',
		"es": 'Sí',
	},
	{"id": "no",
		"en": 'No',
		"fr": 'Non',
		"de": 'Nein',
		"es": 'No',
	},
	{"id": "edition",
		"en": 'edition',
		"fr": 'édition',
		"de": 'auflage',
		"es": 'edición',
	},
	{"id": "text",
		"en": 'text',
		"fr": 'texte',
		"de": 'texte',
		"es": 'texto',
	},
	{"id": "distractors",
		"en": 'distractors',
		"fr": 'distracteurs',
		"de": 'Distraktoren',
		"es": 'distractores',
	},
	{"id": "linkingtexts",
		"en": 'linking texts',
		"fr": 'liens texte',
		"de": 'txte verknüpfen',
		"es": 'enlazando textos',
	},
	{"id": "apply",
		"en": 'apply',
		"fr": 'appliquer',
		"de": 'sich bewerben',
		"es": 'aplicar',
	},
	{"id": "upload",
		"en": 'upload',
		"fr": 'charger',
		"de": 'hochladen',
		"es": 'subir',
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
			
		}

	}
	
	return idtrad;
	
}

traductor();