import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                console.log("Model Mesh Name:", child.name);
                // Apply a subtle smile if morph targets are available
                if (child.morphTargetInfluences && child.morphTargetDictionary) {
                  const smile = child.morphTargetDictionary["mouthSmile"];
                  const smileL = child.morphTargetDictionary["mouthSmileLeft"];
                  const smileR = child.morphTargetDictionary["mouthSmileRight"];
                  const smile2 = child.morphTargetDictionary["Smile"];

                  if (smile !== undefined) child.morphTargetInfluences[smile] = 0.6;
                  if (smileL !== undefined) child.morphTargetInfluences[smileL] = 0.6;
                  if (smileR !== undefined) child.morphTargetInfluences[smileR] = 0.6;
                  if (smile2 !== undefined) child.morphTargetInfluences[smile2] = 0.6;
                }

                const mesh = child as THREE.Mesh;
                const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

                materials.forEach((mat: any) => {
                  // Standardize name for matching
                  const name = child.name.toLowerCase();

                  // Skip styling for eyes to keep original "old eye balls"
                  if (name.includes("eye")) {
                    return;
                  }

                  // Clone material to avoid shared references
                  const newMat = mat.clone() as any;

                  // Force material properties to be clean (No hidden textures)
                  newMat.emissive?.setHex(0x000000);
                  newMat.emissiveMap = null;
                  newMat.normalMap = null;
                  newMat.bumpMap = null;
                  newMat.specularMap = null;
                  newMat.roughnessMap = null;
                  newMat.metalnessMap = null;
                  newMat.aoMap = null;
                  newMat.alphaMap = null;
                  newMat.map = null; // Basic texture map

                  // Categorization Logic
                  const isTop = name.includes("top") || name.includes("shirt") || name.includes("vest") || name.includes("suit") || name.includes("outfit");
                  const isBottom = name.includes("bottom") || name.includes("pant") || name.includes("leg") || name.includes("shoe") || name.includes("boot");
                  const isHair = name.includes("hair") || name.includes("brow");

                  if (isTop) {
                    newMat.color.setHex(0xFF8C00); // Orange Top
                    newMat.roughness = 0.7;
                  } else if (isBottom) {
                    newMat.color.setHex(0x111111); // Dark Bottoms
                    newMat.roughness = 0.8;
                  } else if (isHair) {
                    newMat.color.setHex(0x3d2b1f); // Dark Brown Hair/Brows
                    newMat.roughness = 0.9;
                  } else {
                    // Universal Fallback: Face, Skin, Ears, Body etc.
                    newMat.color.setHex(0xebc89a); // Skin Tone
                    newMat.roughness = 0.6;
                  }

                  // Reassign the material
                  if (Array.isArray(mesh.material)) {
                    const idx = (mesh.material as any[]).indexOf(mat);
                    if (idx !== -1) (mesh.material as any[])[idx] = newMat;
                  } else {
                    mesh.material = newMat;
                  }
                });

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
