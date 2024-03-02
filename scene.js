// Create scene
const scene = new THREE.Scene();
const gltfLoader = new THREE.GLTFLoader();

// Create camera
const camera = new THREE.PerspectiveCamera(
    75,     // fov - Camera frustum vertical field of view
    window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
    0.1,   // near - Camera frustum near plane
    1000); // far - Camera frustum far plane

camera.position.set(40, 0, 80);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Light
const sunlight = new THREE.DirectionalLight(0xfffdd0, 1.0);
sunlight.position.set(5, 100, 100);
scene.add(sunlight);

// Ground (plane+texture)
const textureLoader = new THREE.TextureLoader();

// Load the texture image
textureLoader.load(
    // URL of the texture image
    'textures/irregular_stone_floor_20130930_1665458395.jpg',
    // Callback function when texture is loaded
    function(texture) {
        // Create material with the loaded texture
        const groundMaterial = new THREE.MeshPhongMaterial({ map: texture });

        // Create geometry for ground plane (e.g., PlaneGeometry)
        const groundGeometry = new THREE.PlaneGeometry(100, 100); // Adjust size as needed
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.receiveShadow = true;
        ground.position.set(0,0,35); // Adjust position as needed
        ground.rotation.x = -Math.PI / 2; // Example: Rotate 90 degrees around the X-axis

        scene.add(ground);
    }
);

//Bus station
const asphaltBusTexture = new THREE.TextureLoader();

// Load the texture image
asphaltBusTexture.load(
    // URL of the texture image
    'textures/bernard-hermant-qi-H70ga93s-unsplash.jpg',
    // Callback function when texture is loaded
    function(texture) {
        // Create material with the loaded texture
        const groundMaterial = new THREE.MeshPhongMaterial({ map: texture });

        // Create geometry for ground plane (e.g., PlaneGeometry)
        const groundGeometry = new THREE.PlaneGeometry(30, 30); // Adjust size as needed
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.receiveShadow = true;
        ground.position.set(35,0.02,70); // Adjust position as needed
        ground.rotation.x = -Math.PI / 2; // Example: Rotate 90 degrees around the X-axis

        scene.add(ground);
    }
);

// Skybox
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    'skybox/Daylight Box_Pieces/Daylight Box_Right.bmp', 'skybox/Daylight Box_Pieces/Daylight Box_Left.bmp',
    'skybox/Daylight Box_Pieces/Daylight Box_Top.bmp', 'skybox/Daylight Box_Pieces/Daylight Box_Bottom.bmp',
    'skybox/Daylight Box_Pieces/Daylight Box_Front.bmp', 'skybox/Daylight Box_Pieces/Daylight Box_Back.bmp'
]);
scene.background = texture;

// Step Geometry and Material
const textureSteps = new THREE.TextureLoader();
const numberOfSteps = 3;
const stepDepth = 1.5;
const stepWidth = 1.5;
const stepFrontWidth = 10;
const mirrorDistance = 10;

// Load the texture image for the stairs
textureSteps.load(
    'textures/annie-spratt-ctXf1GVyf9A-unsplash.jpg', // Replace with the actual path to your texture image
    function(texture) {
        // Create material with the loaded texture
        const stepMaterial = new THREE.MeshMatcapMaterial({ map: texture });

        for (let i = 0; i < numberOfSteps; i++) {
            const stepHeight = (i + 1) * 0.5;
            const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepFrontWidth);

            // Create a new mesh for each step with the textured material
            const step = new THREE.Mesh(stepGeometry, stepMaterial);
            step.position.set(i * stepDepth + 5, stepHeight / 2, stepWidth / 2 + 35);
            scene.add(step);

            // Create a mirrored step
            const mirroredStep = new THREE.Mesh(stepGeometry, stepMaterial);
            mirroredStep.position.set(-(i * stepDepth + 17) + mirrorDistance, stepHeight / 2, stepWidth / 2 + 35);
            scene.add(mirroredStep);
        }
    },
    undefined,
    function(error) {
        console.error('An error occurred loading the texture:', error);
    }
);

//Trees next to steps
const treeZPosition = 23 + stepWidth / 2 + stepFrontWidth / 2;
addTreeAtPosition(7, treeZPosition);

// Position for the second tree next to the first mirrored step
const mirroredTreeXPosition = -(19) + mirrorDistance;
addTreeAtPosition(mirroredTreeXPosition, treeZPosition);

// Position for the lamp between the two trees
const tree1XPosition = 7; // X position of the first tree
const tree2XPosition = mirroredTreeXPosition; // X position of the second tree
const lampXPosition = (tree1XPosition + tree2XPosition) / 2; // Average X position between the trees
const lampZPosition = treeZPosition; // Same Z position as the trees

// Load the lamp model at the calculated position
loadModel('importedModels/moscow_lamp_post/scene.gltf', [lampXPosition, 0, lampZPosition], [1, 1, 1], [0, 0, 0]); // Adjust the path to your lamp model
// Position for the new lamp, 20 units to the left of the current lamp
const newLampXPosition = lampXPosition - 20;

// Load the new lamp model at the calculated position
loadModel('importedModels/moscow_lamp_post/scene.gltf', [newLampXPosition, 0, lampZPosition], [1, 1, 1], [0, 0, 0]);
const newLampX2Position = lampXPosition - 35;

// Load the new lamp model at the calculated position
loadModel('importedModels/moscow_lamp_post/scene.gltf', [newLampX2Position, 0, lampZPosition], [1, 1, 1], [0, 0, 0]);

const newLampX3Position = lampXPosition + 20;

// Load the new lamp model at the calculated position
loadModel('importedModels/moscow_lamp_post/scene.gltf', [newLampX3Position, 0, lampZPosition], [1, 1, 1], [0, 0, 0]);

// Calculate position for the bench between newLampXPosition and newLampX2Position
const benchBetweenLampsXPosition = (newLampXPosition + newLampX2Position) / 2;
const benchBetweenLampsZPosition = lampZPosition; // Same Z position as the lamps

// Load the bench model at this position
loadModel('importedModels/benchOld/scene.gltf', [benchBetweenLampsXPosition, 0, benchBetweenLampsZPosition], [0.5, 0.5, 0.5], [0, Math.PI / 2 , 0]);

// Assuming newLampX3Position is the position of the most right lamp
// and tree1XPosition is the position of the nearest tree to this lamp
const benchNearRightLampXPosition = (newLampX3Position + tree1XPosition) / 2;
const benchNearRightLampZPosition = lampZPosition; // Same Z position as the lamp and tree

// Load the bench model at this position
loadModel('importedModels/benchOld/scene.gltf', [benchNearRightLampXPosition, 0, benchNearRightLampZPosition], [0.5, 0.5, 0.5], [0, Math.PI / 2 , 0]);

// Define the positions for the bushes around the stairs
function addBushesToFormHalfSquare() {
    const stepWidth = 1.5;
    const mirrorDistance = 10;
    const bushOffsetX = 2; // Distance behind the stairs on the X-axis
    const numberOfBushes = 4; // Number of bushes you want to add along Z axis
    const bushSpacing = 3; // Spacing between each bush
    const bushExtension = 2; // Number of additional bushes along X axis on each side

    // Add bushes along the Z-axis
    for (let i = 0; i < numberOfBushes; i++) {
        const zPosition = stepWidth / 2 + 32 + i * bushSpacing; // Adjust Z position as needed
        addBushAtPosition(10 + bushOffsetX, zPosition); // Bushes behind the first set of stairs
        addBushAtPosition(mirrorDistance - 22 - bushOffsetX, zPosition); // Bushes behind the mirrored set of stairs
    }

    // Add bushes along the X-axis at the ends
    for (let i = 0; i < bushExtension; i++) {
        const xPositionFirstSet = bushOffsetX + (i + 1) * bushSpacing; // X positions extending from the first set
        const xPositionMirroredSet = mirrorDistance - 12 - bushOffsetX - (i + 1) * bushSpacing; // X positions extending from the mirrored set
        const zPositionEnd = stepWidth / 2 + 32 + (numberOfBushes - 1) * bushSpacing; // Z position at the end of the bush line

        addBushAtPosition(xPositionFirstSet, zPositionEnd); // Bushes extending on X axis from the first set
        addBushAtPosition(xPositionMirroredSet, zPositionEnd); // Bushes extending on X axis from the mirrored set
    }
}

// Call the function to add bushes in a half-square shape
addBushesToFormHalfSquare();







function addTreeAtPosition(xPosition, zPosition) {
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(xPosition, 1.5, zPosition);
    scene.add(trunk);

    const canopyMaterial = new THREE.MeshLambertMaterial({ color: 0x00FF00 });

    // Array of canopy positions relative to the trunk
    const canopyPositions = [
        { x: 0, y: 5, z: 0 },
        { x: 1, y: 3.5, z: 1 },
        { x: -1, y: 3.5, z: 1 },
        { x: 1, y: 3.5, z: -1 },
        { x: -1, y: 3.5, z: -1 },
    ];

    // Create and position each sphere in the canopy
    canopyPositions.forEach(pos => {
        const canopyGeometry = new THREE.SphereGeometry(1.5, 32, 32); // Adjust size as needed
        const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
        canopy.position.set(xPosition + pos.x, pos.y, zPosition + pos.z);
        scene.add(canopy);
    });
}

addBushAtPosition(26, 85);
addBushAtPosition(30, 85);
addBushAtPosition(34, 85);
addBushAtPosition(38, 85);
addBushAtPosition(42, 85);
addBushAtPosition(46, 85);
addBushAtPosition(49, 83, Math.PI/2);
addBushAtPosition(49, 79, Math.PI/2);
addBushAtPosition(49, 75, Math.PI/2);
addBushAtPosition(49, 71, Math.PI/2);
addBushAtPosition(49, 67, Math.PI/2);
addBushAtPosition(49, 63, Math.PI/2);
addBushAtPosition(49, 59, Math.PI/2);

function addBushAtPosition(xPosition, zPosition, rotationY = 0) {
    const bushMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 }); // A green color for the bush
    const bushGroup = new THREE.Group(); // Group to hold all parts of the bush

    // Canopy positions for the bottom layer of the bush
    const bottomCanopyPositions = [
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: -1, y: 1, z: 0 }
    ];

    // Canopy positions for the top layer of the bush
    const topCanopyPositions = [
        { x: 0.5, y: 2, z: 0 },
        { x: -0.5, y: 2, z: 0 }
    ];

    // Create and position each sphere for the bottom layer
    bottomCanopyPositions.forEach(pos => {
        const bottomCanopyGeometry = new THREE.SphereGeometry(1, 32, 32); // Spheres for the bottom layer
        const bottomCanopy = new THREE.Mesh(bottomCanopyGeometry, bushMaterial);
        bottomCanopy.position.set(pos.x, pos.y, pos.z);
        bushGroup.add(bottomCanopy);
    });

    // Create and position each sphere for the top layer
    topCanopyPositions.forEach(pos => {
        const topCanopyGeometry = new THREE.SphereGeometry(0.8, 32, 32); // Slightly smaller spheres for the top layer
        const topCanopy = new THREE.Mesh(topCanopyGeometry, bushMaterial);
        topCanopy.position.set(pos.x, pos.y, pos.z);
        bushGroup.add(topCanopy);
    });

    // Set the position and rotation of the whole bush
    bushGroup.position.set(xPosition, 0, zPosition);
    bushGroup.rotation.y = rotationY;

    // Add the group to the scene
    scene.add(bushGroup);
}
function createWaterFountain() {
    const fountainGroup = new THREE.Group();
    const textureLoaderBasin = new THREE.TextureLoader();
    textureLoaderBasin.load(
        'textures/annie-spratt-ctXf1GVyf9A-unsplash.jpg', // Corrected texture path
        function(texture) {
            const basinMaterial = new THREE.MeshPhongMaterial({
                map: texture,
                color: 0xe5de00,
                side: THREE.DoubleSide
            });
            // Top basin of the fountain
            const basinPoints = [];
            for (let i = 0; i < 10; i++) {
                basinPoints.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 5, (i - 5) * 2));
            }
            const basinGeometry = new THREE.LatheGeometry(basinPoints,6);
            const basin = new THREE.Mesh(basinGeometry, basinMaterial);
            basin.position.set(0, 2.5, 0);
            fountainGroup.add(basin);
        },
        undefined,
        function(error) {
            console.error('An error occurred loading the texture:', error);
        }
    );
    // Tap (cylinder) in the middle
    const tapGeometry = new THREE.CylinderGeometry(0.2, 0.2, 13, 32);
    const tapMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const tap = new THREE.Mesh(tapGeometry, tapMaterial);
    tap.position.set(0, 7, 0);
    fountainGroup.add(tap);

    // Texture Loader for the sink
    const textureLoaderSink = new THREE.TextureLoader();

    // Load the texture image for the sink
    textureLoaderSink.load(
        'textures/cia-gould-5-WsIPUwhlI-unsplash.jpg', // Replace with the actual path to your texture image
        function(texture) {
            // Create material with the loaded texture for the sink
            const sinkMaterial = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });

            // Sink geometry
            const sinkGeometry = new THREE.RingGeometry(7, 1, 6); // Inner radius, outer radius, segments
            const sink = new THREE.Mesh(sinkGeometry, sinkMaterial);
            sink.position.set(0, 10, 0); // Slightly above the leg to be visible inside the basin

            // Rotate to make it horizontal and adjust rotation around Y-axis
            const sinkRotationX = Math.PI / 2;
            const sinkRotationY = 0; // Adjust this value to fit the sink in the fountain (try multiples of Math.PI / 3)
            sink.rotation.set(sinkRotationX, sinkRotationY, 33);

            fountainGroup.add(sink);
        },
        undefined,
        function(error) {
            console.error('An error occurred loading the texture:', error);
        }
    );

    // Water particles
    const waterParticles = [];
    const waterMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
    for (let i = 0; i < 20; i++) { // Number of particles
        const waterGeometry = new THREE.SphereGeometry(0.1, 16, 16); // Small sphere for water droplet
        const waterDroplet = new THREE.Mesh(waterGeometry, waterMaterial);
        waterDroplet.position.set(0, 15, 0); // Starting position at the tap
        waterParticles.push(waterDroplet);
        fountainGroup.add(waterDroplet);
    }

    fountainGroup.userData = { waterParticles, timeOffset: 0 };

    // Adjust position and scale as needed
    fountainGroup.position.set(-1, 0.8, 36);
    fountainGroup.scale.set(0.1, 0.1, 0.1);

    // Add to the scene
    scene.add(fountainGroup);

    fountainGroup.name = 'WaterFountain';
}

// Call the function to create the water fountain
createWaterFountain();

function createRoad(type, positionX, positionZ, roadLength, roadWidth) {
    let roadMaterial, roadGeometry, roadMesh;

    // Common settings for both road types
    const borderMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color(0xa45a52) });
    const borderGeometry = new THREE.BoxGeometry(roadLength, 0.2, 0.2);

    // Create road based on type
    if (type === 'bike') {
        const roadTexture = new THREE.TextureLoader().load('textures/engin-akyurt-HPXHqpVruqI-unsplash.jpg');
        roadMaterial = new THREE.MeshMatcapMaterial({ map: roadTexture, color: new THREE.Color(0xcccccc) });
    } else if (type === 'car') {
        const roadTexture = new THREE.TextureLoader().load('textures/olga-thelavart-MHh6VeVnJRM-unsplash.jpg');
        roadMaterial = new THREE.MeshMatcapMaterial({ map: roadTexture });
    }

    // Create road geometry and mesh
    roadGeometry = new THREE.PlaneGeometry(roadLength, roadWidth);
    roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(positionX, 0.1, positionZ);
    scene.add(roadMesh);

    // Create borders
    const border1 = new THREE.Mesh(borderGeometry, borderMaterial);
    border1.position.set(positionX, 0.2, positionZ + roadWidth / 2 + 0.1);
    scene.add(border1);

    const border2 = new THREE.Mesh(borderGeometry, borderMaterial);
    border2.position.set(positionX, 0.2, positionZ - roadWidth / 2 - 0.1);
    scene.add(border2);

    // Add dashes for car road
    if (type === 'car') {
        const lineMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });
        const dashGeometry = new THREE.PlaneGeometry(1, 0.1);
        const numberOfDashes = roadLength / 3; // Adjust as needed
        const dashSpacing = 3; // Spacing based on the number of dashes and road length

        for (let i = 0; i < numberOfDashes; i++) {
            const dash = new THREE.Mesh(dashGeometry, lineMaterial);
            dash.rotation.x = -Math.PI / 2;
            dash.position.set(positionX + (i * dashSpacing) - roadLength / 2, 0.11, positionZ);
            scene.add(dash);
        }

        createZebraCrossing(-19, 12.25, roadWidth);
        createZebraCrossing(27, 12.25, roadWidth);
    }
}
function createZebraCrossing(positionX, positionZ, roadWidth) {
    const stripeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });
    const numberOfStripes = 7;
    const stripeLength = roadWidth; // Length of each stripe to cover the road width
    const stripeWidth = 0.7; // Width of each stripe
    const gapBetweenStripes = 0.5; // Gap between stripes
    const totalCrossingLength = numberOfStripes * stripeWidth + (numberOfStripes - 1) * gapBetweenStripes;

    for (let i = 0; i < numberOfStripes; i++) {
        const stripeGeometry = new THREE.PlaneGeometry(stripeLength, stripeWidth);
        const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe.rotation.x = -Math.PI / 2;
        // Position each stripe along the Z-axis
        const zPosition = positionZ + (i * (stripeWidth + gapBetweenStripes)) - totalCrossingLength / 2;
        stripe.position.set(positionX, 0.11, zPosition);
        scene.add(stripe);
    }
}

// Usage
createRoad('bike', 0, 4, 100, 3); // Create a bike road
createRoad('bike', 0, 20, 100, 3); // Create a bike road
createRoad('car', 0, 12, 100, 8); // Create a car road
// Usage: Create a road from the moving bus to the main road
function createOrientedRoad(type, positionX, positionZ, roadLength, roadWidth, orientation = 'z') {
    let roadMaterial, roadGeometry, roadMesh;

    // Load road texture based on type
    const roadTexture = new THREE.TextureLoader().load(
        type === 'bike' ? 'textures/engin-akyurt-HPXHqpVruqI-unsplash.jpg' : 'textures/olga-thelavart-MHh6VeVnJRM-unsplash.jpg'
    );
    roadMaterial = new THREE.MeshMatcapMaterial({ map: roadTexture });

    // Create road geometry and mesh
    roadGeometry = new THREE.PlaneGeometry(roadLength, roadWidth);
    roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    roadMesh.rotation.x = -Math.PI / 2;

    if (orientation === 'x') {
        // For roads parallel to the X-axis
        roadMesh.rotation.z = Math.PI / 2;
        roadMesh.position.set(positionX + roadLength / 2, 0.1, positionZ);
    } else {
        // For roads parallel to the Z-axis (default)
        roadMesh.position.set(positionX, 0.1, positionZ);
    }

    scene.add(roadMesh);
}

function addCenterLine(positionX, positionZ, roadLength) {
    const lineMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });
    const lineGeometry = new THREE.PlaneGeometry(0.2, 33); // Line along the Z-axis, length of the road
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.rotation.x = -Math.PI / 2;

    // Position the line in the center of the road
    line.position.set(positionX + roadLength / 2, 0.11, positionZ);

    scene.add(line);
}

// Usage example for adding center lines to your roads
createOrientedRoad('car', 25, 38.5, 33, 3, 'x');
addCenterLine(23.5, 38.5, 33.5); // Center line for the first road

createOrientedRoad('car', 22, 38.5, 33, 3, 'x');
function addPillar(position, stationName) {
    // Create pillar
    const pillarGeometry = new THREE.CylinderGeometry(0.15, 0.15, 4.5, 32); // Height increased to 4.5
    const pillarMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.set(position.x, position.y + 2.25, position.z); // Adjusted position

    // Create spherical top
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const sphereTop = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereTop.position.set(position.x, position.y + 4.5, position.z); // Adjusted position

    // Create board
    const boardGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
    const boardMaterial = new THREE.MeshLambertMaterial({ color: 0x3366ff }); // Blue color for the board
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(position.x, position.y + 4.75, position.z); // Positioned on top of the pillar
    scene.add(board);

    // Create text
    const loader = new THREE.FontLoader();
    loader.load( 'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        const textGeometry = new THREE.TextGeometry( stationName, {
            font: font,
            size: 1, // Increased size of the text
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: false
        });
        const textMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        const textMesh = new THREE.Mesh( textGeometry, textMaterial );

        // Center the text on the board
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        const boardWidth = 1.5; // Width of the board
        textMesh.position.set(position.x - (textWidth / 2), position.y + 4.85, position.z + (boardWidth / 2) - 0.75); // Adjusted position
        scene.add(textMesh);
    });

    // Create a group to hold the pillar, sphere, and board
    const pillarGroup = new THREE.Group();
    pillarGroup.add(pillar);
    pillarGroup.add(sphereTop);
    pillarGroup.add(board);

    // Add the group to the scene
    scene.add(pillarGroup);
}

// Usage
addPillar(new THREE.Vector3(47, 0, 66), "A"); // Position for the first pillar, station A
addPillar(new THREE.Vector3(47, 0, 80), "B"); // Position for the second pillar, station B






const controls = new THREE.OrbitControls(camera, renderer.domElement);
// Variables for Keyboard Controls
let move = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'KeyW':
            move.forward = true;
            break;
        case 'KeyS':
            move.backward = true;
            break;
        case 'KeyA':
            move.left = true;
            break;
        case 'KeyD':
            move.right = true;
            break;
    }
});

// Event Listener for Key Up
document.addEventListener('keyup', function (event) {
    switch (event.code) {
        case 'KeyW':
            move.forward = false;
            break;
        case 'KeyS':
            move.backward = false;
            break;
        case 'KeyA':
            move.left = false;
            break;
        case 'KeyD':
            move.right = false;
            break;
    }
});

function loadModel(path, position, scale, rotation = null, color = null, name = null) {
    gltfLoader.load(path, function(gltf) {
        const model = gltf.scene;
        model.name = name;
        model.position.set(...position);
        model.scale.set(...scale);

        if (rotation) {
            model.rotation.set(...rotation);
        }

        if (color) {
            model.traverse((object) => {
                if (object.isMesh) {
                    object.material.color.set(color);
                }
            });
        }

        scene.add(model);
    });
}

//HOUSES
loadModel('importedModels/dutch_canals_house_amsterdam_1/scene.gltf', [46, 0, 0], [1, 1, 1]);
loadModel('importedModels/stylized_amsterdam_house/scene.gltf', [36,0,-2], [1.2, 1.2, 1.2], [0, -Math.PI/2 , 0]);
loadModel('importedModels/dutch_canals_house_amsterdam_3/scene.gltf', [-18, 0, -6], [1, 1, 1]);
loadModel('importedModels/dutch_canals_house_amsterdam_4/scene.gltf', [40.5, 0, -6], [1.2, 1.2, 1.2]);
loadModel('importedModels/dutch_canals_house_amsterdam_1/scene.gltf', [30.4, 0, 0], [1, 1, 1], null,0xc6e6fb);
loadModel('importedModels/handmade_store_free/scene.gltf', [-12, 0, -4], [0.01, 0.01, 0.01], [0, Math.PI/2, 0]);
loadModel('importedModels/urban_garage_door/scene.gltf', [14, 2, -9], [2,2,2], [0, -Math.PI/2,0]);
loadModel('importedModels/cafe_nikki/scene.gltf', [-27, -1.5, -4], [0.015, 0.015, 0.015], );
loadModel('importedModels/dutch_canals_house_amsterdam_3/scene.gltf', [20, 0, -6], [1,1,1]);
loadModel('importedModels/urban_garage_door/scene.gltf', [-12, 2, -9], [2,2,2], [0, Math.PI/2,0]);
loadModel('importedModels/handmade_store_free/scene.gltf', [13, 0, -3.5], [0.01, 0.01, 0.01], [0, -Math.PI/2, 0],);
loadModel('importedModels/stylized_amsterdam_house/scene.gltf', [-33, 0, -2], [1.2, 1.2, 1.2], [0, -Math.PI/2, 0]);
loadModel('importedModels/miniature_christmas_store/scene.gltf', [-44, 5, -4], [0.01, 0.01, 0.01], [0, Math.PI,0]);
loadModel('importedModels/dutch_canals_house_amsterdam_4/scene.gltf', [-37.5, 0, -6], [1.2, 1.2, 1.2]);

//STREET DECORATIONS
// Define the bench model
const benchModelPath = 'importedModels/benchOld/scene.gltf';
const benchPosition = [1, 0, -6]; // Adjust the position as needed
const benchScale = [0.5, 0.5, 0.5]; // Adjust the scale as needed
const benchRotation = [0, Math.PI / 2 + Math.PI / 2 + Math.PI / 2, 0]; // Rotate the bench by 270 degrees around the Y-axis

// Load the bench model with rotation
loadModel(benchModelPath, benchPosition, benchScale, benchRotation);
// Define the second bench model
const secondBenchPosition = [-7, 0, -6]; // Adjusted position to 4 units to the left of the lamp
const secondBenchRotation = [0, Math.PI / 2 + Math.PI / 2 + Math.PI / 2, 0]; // Rotate the bench by 90 degrees around the Y-axis

// Load the second bench model with rotation
loadModel(benchModelPath, secondBenchPosition, benchScale, secondBenchRotation);


// Adjust the position of the bench between the two houses
const benchPositionBetweenHouses = [(20 - 18) / 2, 0, -6]; // Calculate the midpoint between the two house positions

// Load the bench model at the calculated position with rotation
loadModel(benchModelPath, benchPositionBetweenHouses, benchScale, benchRotation);
// Define the tree model
// Define the tree model
const treeModelPath = 'importedModels/maple_tree/scene.gltf';
const treePosition = [4.5, 0, -6.5]; // Adjusted position to 3 units to the right
const treeScale = [0.1, 0.1, 0.1]; // Adjust the scale to be 1/5 of the original size
const treeRotation = [0, Math.PI / 2, 0]; // Rotate the tree by 90 degrees around the Y-axis

// Load the tree model with rotation and smaller scale
loadModel(treeModelPath, treePosition, treeScale, treeRotation);
// Define the lamp model
const lampModelPath = 'importedModels/moscow_lamp_post/scene.gltf';
const lampPosition = [-3, 0, -6]; // Adjusted position to 4 units to the left of the bench
const lampScale = [1, 1, 1]; // Adjust the scale as needed
const lampRotation = [0, Math.PI / 2, 0]; // Rotate the lamp by 90 degrees around the Y-axis

// Load the lamp model with rotation
loadModel(lampModelPath, lampPosition, lampScale, lampRotation);
// Define the flower model
const flowerModelPath = 'importedModels/moon_tears/scene.gltf'; // Assuming the path to the flower model
const flowerScale = [0.5, 0.5, 0.5]; // Adjust the scale as needed

// Load flowers close to the lamp
const flowerPositionsNearLamp = [
    [-2, 0, -5], // Adjusted position to be close to the lamp
    [-4, 0, -6], // Adjusted position to be close to the lamp
    [-4, 0, -7], // Adjusted position to be close to the lamp
    [-5, 0, -8]  // Adjusted position to be close to the lamp
];

flowerPositionsNearLamp.forEach(position => {
    loadModel(flowerModelPath, position, flowerScale);
});

// Load flowers close to the first bench
const flowerPositionsNearFirstBench = [
    [-1, 0, -6], // Adjusted position to be close to the first bench
    [2, 0, -7],   // Adjusted position to be close to the first bench
    [3, 0, -5]  // Adjusted position to be close to the first bench
];

flowerPositionsNearFirstBench.forEach(position => {
    loadModel(flowerModelPath, position, flowerScale);
});

// Load flowers close to the second bench
const flowerPositionsNearSecondBench = [
    [-6, 0, -6], // Adjusted position to be close to the second bench
    [-7, 0, -7], // Adjusted position to be close to the second bench
    [-7, 0, -5]  // Adjusted position to be close to the second bench
];

flowerPositionsNearSecondBench.forEach(position => {
    loadModel(flowerModelPath, position, flowerScale);
});




// DRIVING CARS
loadModel('importedModels/car_sport/scene.gltf', [-30, 57.25, 10], [1,1,1], [0, Math.PI/2, 0], null, "car");

//PARKED CARS

//DRIVING BIKES

//STATION
loadModel('importedModels/mount_royal_train_station/scene.gltf', [-10, 17, 87], [0.7, 0.7, 0.7], [0, Math.PI, 0]);

//BUS STATION
loadModel('importedModels/transit_bus__two_service_doors_variant/scene.gltf', [33, 0, 82], [1.2,1.2,1.2], [0, Math.PI/2, 0]);
loadModel('importedModels/standard_bus_stop/scene.gltf', [47, 0, 63], [1,1,1], [0, -Math.PI/2,0]);
loadModel('importedModels/standard_bus_stop/scene.gltf', [47, 0, 78], [1,1,1], [0, -Math.PI/2,0]);
loadModel('importedModels/transit_bus__two_service_doors_variant/scene.gltf', [42,0,65], [1.2,1.2,1.2], [0, Math.PI, 0], null, "drivingBus");
//animation

// Global variables for bus animation
let busState = 0; // 0: initial, 1: moving forward, 2: turning left, etc.
let busTimer = 0; // Timer to track animation progress


function animate() {
    requestAnimationFrame(animate);

    // Move the car
    const car = scene.getObjectByName('car');
    if (car) {
        car.position.x += 0.1;
        if (car.position.x > 10) car.position.x = -10;
    }

    // Camera Movement
    const speed = 0.1;
    if (move.forward) camera.position.z -= speed;
    if (move.backward) camera.position.z += speed;
    if (move.left) camera.position.x -= speed;
    if (move.right) camera.position.x += speed;

    // Animate water particles
    const fountainGroup = scene.getObjectByName('WaterFountain');
    if (fountainGroup) {
        const { waterParticles, timeOffset } = fountainGroup.userData;

        const particleSpeed = 0.05; // Control the speed of the particle movement
        const maxParticleHeight = 17; // Maximum height particles will reach
        const particleDropHeight = 2; // Height of the basin

        waterParticles.forEach((particle, index) => {
            // Calculate individual time offset for each particle
            const time = ((timeOffset + index * 0.1) % 4) - 2; // Cycle of 4 seconds, shifted to have -2 to 2 range

            // Calculate the new Y position of the particle
            let yPos = 7 + (time * maxParticleHeight) - (4.9 * time * time);

            // Reset particle position after it falls back
            if (yPos < particleDropHeight) {
                yPos = 7; // Initial height at the tap
            }

            particle.position.y = yPos;
            particle.position.x = 0; // You can adjust this if needed
        });

        // Increment the time offset
        fountainGroup.userData.timeOffset += 0.05;
    }

    // Bus Animation
    const drivingBus = scene.getObjectByName("drivingBus");
    if (drivingBus) {
        busTimer += 0.05; // Increment timer (assuming 60 FPS, adjust if needed)

        switch (busState) {
            case 0: // Initial state, waiting at station
                if (busTimer > 3) {
                    busState = 1; // Move to next state
                    busTimer = 0; // Reset timer
                }
                break;
            case 1: // Move forward on Z axis
                drivingBus.position.z -= 0.1; // Adjust speed if needed
                if (busTimer > 24) {
                    busState = 2;
                    busTimer = 0;
                }
                break;
            case 2: // First part of the turn: turn by 60 degrees
                const turnSpeed60 = Math.PI / 2 / 50; // 60 degrees turn speed (adjust as needed)
                drivingBus.rotation.y += turnSpeed60;
                if (busTimer > 10) { // Adjust timing for smoothness
                    busState = 3;
                    busTimer = 0;
                }
                break;

            // case 3: // Second part of the turn: additional 30 degrees to complete 90 degrees
            //     const turnSpeed30 = Math.PI / 6/50 ; // 30 degrees turn speed (adjust as needed)
            //     drivingBus.rotation.y += turnSpeed30;
            //     if (busTimer > 50) { // Adjust timing for smoothness
            //         busState = 4; // Proceed to next state
            //         busTimer = 0;
            //     }
            //     break;

            case 3: // Move forward on X axis (negative)
                drivingBus.position.x -= 0.1;
                if (busTimer > 40) {
                    busState = 4;
                    busTimer = 0;
                    drivingBus.visible = false; // Hide the bus
                }
                break;
            // case 4: // Bus disappears for 15 seconds
            //     if (busTimer > 15) {
            //         drivingBus.visible = true; // Reappear the bus
            //         drivingBus.rotation.y += Math.PI; // Rotate 180 degrees
            //         busState = 5;
            //         busTimer = 0;
            //     }
            //     break;
            // case 5: // Move forward on X axis (positive)
            //     drivingBus.position.x += 0.1;
            //     if (busTimer > 5) {
            //         busState = 6;
            //         busTimer = 0;
            //     }
            //     break;
            // case 6: // Turn right
            //     drivingBus.rotation.y -= Math.PI / 2 / 50;
            //     if (busTimer > 1) {
            //         busState = 7;
            //         busTimer = 0;
            //     }
            //     break;
            // case 7: // Move forward on Z axis (positive)
            //     drivingBus.position.z += 0.1;
            //     if (busTimer > 3) {
            //         busState = 8; // Bus stops for 10 seconds
            //         busTimer = 0;
            //     }
            //     break;
            // case 8: // Bus stopped at station
            //     if (busTimer > 10) {
            //         busState = 0; // Reset to initial state
            //         busTimer = 0;
            //     }
            //     break;
        }
    }


    // Update controls
    controls.update();

    renderer.render(scene, camera);
}
animate();
