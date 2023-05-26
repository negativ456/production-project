import { Node, Project, SyntaxKind } from 'ts-morph';

const removeFeatureName = process.argv[2]; // example isArticleRatingEnabled
const featureState = process.argv[3]; // ex. off/on

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
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeature') {
      isToggle = true;
    }
  });
  return isToggle;
}
files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFeature(node)) {
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
  });
});

project.save();
