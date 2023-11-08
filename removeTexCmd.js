// Import necessary modules
import { NodeIO } from '@gltf-transform/core';
import { dedup } from '@gltf-transform/functions';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import gltf from 'vite-plugin-gltf';

// Function to remove textures from the glTF document
function removeTextures() {
  return async (document) => {
    for (const texture of document.getRoot().listTextures()) {
      texture.dispose();
    }
  };
}

// Main function to process the glb file
async function processGLB(inputPath, outputPath) {
  // Initialize the glTF I/O module with all extensions
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);

  // Read the glTF document from the input path
  const document = await io.read(inputPath);

  // Remove textures from the glTF document
  await document.transform(removeTextures());

  // Combine any duplicate materials
  await document.transform(dedup());

  // Write the modified glTF document to the output path
  await io.write(outputPath, document);

  console.log(`Textures removed and output saved to ${outputPath}`);
}

// Get input and output file paths from command line arguments
const [inputPath, outputPath] = process.argv.slice(2);

// Call the function to remove textures and save the modified glb file
if (inputPath && outputPath) {
  processGLB(inputPath, outputPath);
} else {
  console.error('Please provide input and output file paths.');
}
