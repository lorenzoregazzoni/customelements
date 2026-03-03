export function registerStylesheet(style) {
    // Create an empty "constructed" stylesheet
    const sheet = new CSSStyleSheet();
    // Apply a rule to the sheet
    sheet.replaceSync(style);

    // Apply the stylesheet to a document
    document.adoptedStyleSheets.push(sheet);
}