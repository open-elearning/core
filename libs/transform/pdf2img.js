"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');
const ncp = require('../easyncp').ncp;

// const pdfjs = require('pdfjs-dist/legacy/build/pdf.mjs');
const pdfjs = require("./pdfjs");
const { NodeCanvasFactory } = require("./canvasFactory.js");
const { parseInput } = require("./parseInput.js");

function toimages(path, options = {}){
	
	const data =  parseInput(path);
    const canvasFactory = new NodeCanvasFactory();
    const pdfDocument =  pdfjs.getDocument({
        password: options.password,
        standardFontDataUrl: path.join(pdfjsPath, `standard_fonts${path.sep}`),
        cMapUrl: path.join(pdfjsPath, `cmaps${path.sep}`),
        cMapPacked: true,
        ...options.docInitParams,
        isEvalSupported: false,
        canvasFactory,
        data,
    }).promise;
    const metadata =  pdfDocument.getMetadata();
    async function getPage(pageNumber) {
        const page =  pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: options.scale ?? 1 });
        const { canvas, context } = canvasFactory.create(viewport.width, viewport.height, !!options.renderParams?.background);
         page.render({
            canvasContext: context,
            viewport,
            ...options.renderParams,
        }).promise;
        return canvas.toBuffer();
    }
    return {
        length: pdfDocument.numPages,
        metadata: sanitize(metadata.info),
        getPage,
        [Symbol.asyncIterator]() {
            return {
                pg: 0,
                async next() {
                    if (this.pg < pdfDocument.numPages) {
                        this.pg += 1;
                        return { done: false, value: getPage(this.pg) };
                    }
                    return { done: true, value: undefined };
                },
            };
        },
    };

}
exports.toimages = toimages;

