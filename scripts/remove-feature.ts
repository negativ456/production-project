import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const removeFeatureName = process.argv[2]; // example isArticleRatingEnabled
const featureState = process.argv[3]; // ex. off/on

const toggleFunctionName = 'toggleFeature';
const toggleComponentName = 'ToggleFeatures';

if (!removeFeatureName) {
  throw new Error('Set the name of feature flag');
}

if (!featureState) {
  throw new Error('Set the feature state');
}

if (featureState !== 'off' && featureState !== 'on') {
  throw new Error('Incorrect flag');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
function isToggleFeature(node: Node) {
  let isToggle = false;
  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggle = true;
    }
  });
  return isToggle;
}

function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
  return identifier?.getText() === toggleComponentName;
}

function replaceToggleFunction(node: Node) {
  const objectOption = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
  const onProperty = objectOption?.getProperty('on');
  const nameProperty = objectOption?.getProperty('name');
  const offProperty = objectOption?.getProperty('off');

  const onFunction = onProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const offFunction = offProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const name = nameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

  if (name !== removeFeatureName) return;

  if (featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }

  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
}

function getAttributeNodeByName(jsxAttributes: JsxAttribute[], name: string) {
  return jsxAttributes.find((node) => node.getName() === name);
}

function getReplacedComponent(attribute?: JsxAttribute) {
  const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
}

function replaceComponent(node: Node) {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  const featureName = featureNameAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getLiteralValue();

  if (featureName !== removeFeatureName) return;

  const offValue = getReplacedComponent(offAttribute);

  const onValue = getReplacedComponent(onAttribute);

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFeature(node)) {
      replaceToggleFunction(node);
    }

    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      replaceComponent(node);
    }
  });
});

project.save();
