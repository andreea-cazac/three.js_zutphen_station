class Model {
    constructor() {
        this.scene = new THREE.Scene();
        this.gltfLoader = new THREE.GLTFLoader();

        this.addGround('textures/irregular_stone_floor_20130930_1665458395.jpg', 100, 100,  0,0,35);
        this.addLight();
        this.addSkybox();
        this.addBusStation();
        this.addParkingArea();
        this.addRoads();

        this.decorateStationArea();
        this.drawStreetDecorations();

        this.addDrivingCars();
        this.addDutchHouses();
    }

    addGround(texturePath, width, height, positionX, positionY, positionZ) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            texturePath,
            (texture) => {
                const groundMaterial = new THREE.MeshPhongMaterial({ map: texture });
                const groundGeometry = new THREE.PlaneGeometry(width, height);
                const ground = new THREE.Mesh(groundGeometry, groundMaterial);
                ground.receiveShadow = true;
                ground.position.set(positionX, positionY, positionZ);
                ground.rotation.x = -Math.PI/2
                this.scene.add(ground);
            },
            undefined,
            (error) => {
                console.error('An error occurred loading the texture:', error);
            }
        );
    }

    addLight() {
        const sunlight = new THREE.DirectionalLight(0xfffdd0, 1.0);
        sunlight.position.set(1, 1, 1);
        this.scene.add(sunlight);
    }

    addSkybox() {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'skybox/Daylight Box_Pieces/Daylight Box_Right.bmp',
            'skybox/Daylight Box_Pieces/Daylight Box_Left.bmp',
            'skybox/Daylight Box_Pieces/Daylight Box_Top.bmp',
            'skybox/Daylight Box_Pieces/Daylight Box_Bottom.bmp',
            'skybox/Daylight Box_Pieces/Daylight Box_Front.bmp',
            'skybox/Daylight Box_Pieces/Daylight Box_Back.bmp'
        ]);
        this.scene.background = texture;
    }

    addDutchHouses(){
        this.loadModel('importedModels/dutch_canals_house_amsterdam_1/scene.gltf', [46, 0, 0], [1, 1, 1]);
        this.loadModel('importedModels/stylized_amsterdam_house/scene.gltf', [36,0,-2], [1.2, 1.2, 1.2], [0, -Math.PI/2 , 0]);
        this.loadModel('importedModels/dutch_canals_house_amsterdam_3/scene.gltf', [-18, 0, -6], [1, 1, 1]);
        this.loadModel('importedModels/dutch_canals_house_amsterdam_4/scene.gltf', [40.5, 0, -6], [1.2, 1.2, 1.2]);
        this.loadModel('importedModels/dutch_canals_house_amsterdam_1/scene.gltf', [30.4, 0, 0], [1, 1, 1], null,0xc6e6fb);
        this.loadModel('importedModels/handmade_store_free/scene.gltf', [-12, 0, -4], [0.01, 0.01, 0.01], [0, Math.PI/2, 0]);
        this.loadModel('importedModels/urban_garage_door/scene.gltf', [14, 2, -9], [2,2,2], [0, -Math.PI/2,0]);
        this.loadModel('importedModels/cafe_nikki/scene.gltf', [-27, -1.5, -4], [0.015, 0.015, 0.015], );
        this.loadModel('importedModels/dutch_canals_house_amsterdam_3/scene.gltf', [20, 0, -6], [1,1,1]);
        this.loadModel('importedModels/urban_garage_door/scene.gltf', [-12, 2, -9], [2,2,2], [0, Math.PI/2,0]);
        this.loadModel('importedModels/handmade_store_free/scene.gltf', [13, 0, -3.5], [0.01, 0.01, 0.01], [0, -Math.PI/2, 0],);
        this.loadModel('importedModels/stylized_amsterdam_house/scene.gltf', [-33, 0, -2], [1.2, 1.2, 1.2], [0, -Math.PI/2, 0]);
        this.loadModel('importedModels/miniature_christmas_store/scene.gltf', [-44, 5, -4], [0.01, 0.01, 0.01], [0, Math.PI,0]);
        this.loadModel('importedModels/dutch_canals_house_amsterdam_4/scene.gltf', [-37.5, 0, -6], [1.2, 1.2, 1.2]);
    }
    addBusStation(){
        this.addGround('textures/bernard-hermant-qi-H70ga93s-unsplash.jpg', 30,30, 35, 0.02, 70);
        this.addPillar(new THREE.Vector3(47, 0, 66), "A");
        this.addPillar(new THREE.Vector3(47, 0, 80), "B");

        //add models
        this.loadModel('importedModels/transit_bus__two_service_doors_variant/scene.gltf', [33, 0, 82], [1.2,1.2,1.2], [0, Math.PI/2, 0]);
        this.loadModel('importedModels/standard_bus_stop/scene.gltf', [47, 0, 63], [1,1,1], [0, -Math.PI/2,0]);
        this.loadModel('importedModels/standard_bus_stop/scene.gltf', [47, 0, 78], [1,1,1], [0, -Math.PI/2,0]);
        this.loadModel('importedModels/transit_bus__two_service_doors_variant/scene.gltf', [42,0,65], [1.2,1.2,1.2], [0, Math.PI, 0], null, "drivingBus");

        //add bikes
        this.loadModel('importedModels/bicycle_parking/scene.gltf', [33, 0, 51], [2,2,2], [0, Math.PI/2, 0], 0x767676);
        this.loadModel('importedModels/bicycle_parking/scene.gltf', [33, 0, 43], [2,2,2], [0, Math.PI/2, 0], 0x767676);
        this.loadModel('importedModels/bicycle_parking/scene.gltf', [33, 0, 35], [2,2,2], [0, Math.PI/2, 0], 0x767676);
        this.loadModel('importedModels/bicycle_parking/scene.gltf', [33, 0, 27], [2,2,2], [0, Math.PI/2, 0], 0x767676);

        //add bushes
        this.drawBushes(6,26,85);
        this.drawBushes(7, 49, 83, Math.PI/2);

        //train station
        this.loadModel('importedModels/mount_royal_train_station/scene.gltf', [-10, 17, 86], [0.7, 0.7, 0.7], [0, Math.PI, 0]);
    }

    addRoads(){
        this.createRoad('bike', 0, 4, 100, 3);
        this.createRoad('bike', 0, 20, 100, 3);
        this.createRoad('car', 0, 12, 100, 8);

        //bus road
        this.createOrientedRoad('car', 25, 38.5, 33, 3, 'x');
        this.addCenterLine(23.5, 38.5, 33.5);
        this.createOrientedRoad('car', 22, 38.5, 33, 3, 'x');

        //parking area road
        this.createOrientedRoad('car', -58, 38.5, 33, 3, 'x');
        this.addCenterLine(-59.5, 38.5, 33.5);
        this.createOrientedRoad('car', -61,38.5, 33, 3, 'x');
    }

    //station
    addPillar(position, stationName) {
        const pillarGeometry = new THREE.CylinderGeometry(0.15, 0.15, 4.5, 32);
        const pillarMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.set(position.x, position.y + 2.25, position.z);

        const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
        const sphereTop = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereTop.position.set(position.x, position.y + 4.5, position.z);

        const boardGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
        const boardMaterial = new THREE.MeshLambertMaterial({ color: 0x3366ff });
        const board = new THREE.Mesh(boardGeometry, boardMaterial);
        board.position.set(position.x, position.y + 4.75, position.z);

        const loader = new THREE.FontLoader();
        loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new THREE.TextGeometry(stationName, {
                font: font,
                size: 1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: false
            });
            const textMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textGeometry.computeBoundingBox();
            const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            const boardWidth = 1.5;
            textMesh.position.set(position.x - (textWidth / 2), position.y + 4.85, position.z + (boardWidth / 2) - 0.75);
            this.scene.add(textMesh);
        });

        const pillarGroup = new THREE.Group();
        pillarGroup.add(pillar);
        pillarGroup.add(sphereTop);
        pillarGroup.add(board);

        this.scene.add(pillarGroup);
    }

    //parking area
    addParkingArea(){
        this.addGround('textures/bernard-hermant-qi-H70ga93s-unsplash.jpg', 30,30,-35, 0.02, 70);
        this.addParkingLines();
        this.drawBushes(5, -48, 85);
        this.drawBushes(8, -49.5, 84, Math.PI/2);

        this.parkCars();
    }

    addParkingLines() {
        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); //white color for the lines
        const lineGeometry = new THREE.PlaneGeometry(8, 0.1);

        const linePositions = [
            new THREE.Vector3(-35, 0.03, 70),
            new THREE.Vector3(-35, 0.03, 73),
            new THREE.Vector3(-35, 0.03, 76),
            new THREE.Vector3(-35, 0.03, 79),
            new THREE.Vector3(-35, 0.03, 82),
            new THREE.Vector3(-35, 0.03, 67),
            new THREE.Vector3(-35, 0.03, 64),
            new THREE.Vector3(-35, 0.03, 61),
        ];

        linePositions.forEach(position => {
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.rotation.x = -Math.PI / 2;
            line.position.copy(position);
            this.scene.add(line);
        });
    }

    parkCars() {
        const carPositions = [
            [-41, -1, 70],
            [-41, -1, 73],
            [-41, -1, 82],
            [-41, -1, 61],
            [-41, -1, 67],
        ];

        const carScale = [1, 1, 1];
        const carRotation = [0, Math.PI / 2, 0];

        carPositions.forEach(position => {
            this.loadModel('importedModels/car-peugeot_206/scene.gltf', position, carScale, carRotation);
        });
    }

    //decorations:
    decorateStationArea(){
        const stepWidth = 1.5;
        const stepFrontWidth = 10;
        const mirrorDistance = 10;

        this.addStoneChairs(stepWidth, stepFrontWidth, mirrorDistance);

        //trees next to stone chairs
        const treeZPosition = 23 + stepWidth / 2 + stepFrontWidth / 2;
        this.addTreeAtPosition(7, treeZPosition);
        const mirroredTreeXPosition = -(19) + mirrorDistance;
        this.addTreeAtPosition(mirroredTreeXPosition, treeZPosition);

        //add bushes
        this.addBushesToFormHalfSquare();

        //addLampsBenches
        this.addLampsBenches(7,mirroredTreeXPosition,treeZPosition);

        this.createWaterFountain();
    }
    addStoneChairs(stepWidth, stepFrontWidth, mirrorDistance){
        const textureSteps = new THREE.TextureLoader();
        const numberOfSteps = 3;
        const stepDepth = 1.5;

        textureSteps.load(
            'textures/annie-spratt-ctXf1GVyf9A-unsplash.jpg',
            (texture) => {
                const stepMaterial = new THREE.MeshMatcapMaterial({ map: texture });

                for (let i = 0; i < numberOfSteps; i++) {
                    const stepHeight = (i + 1) * 0.5;
                    const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepFrontWidth);

                    const step = new THREE.Mesh(stepGeometry, stepMaterial);
                    step.position.set(i * stepDepth + 5, stepHeight / 2, stepWidth / 2 + 35);
                    this.scene.add(step);

                    const mirroredStep = new THREE.Mesh(stepGeometry, stepMaterial);
                    mirroredStep.position.set(-(i * stepDepth + 17) + mirrorDistance, stepHeight / 2, stepWidth / 2 + 35);
                    this.scene.add(mirroredStep);
                }
            },
            undefined,
            function(error) {
                console.error('An error occurred loading the texture:', error);
            }
        );
    }
    addLampsBenches(tree1XPosition, mirroredTreeXPosition, treeZPosition) {
        const lampXPosition = (tree1XPosition + mirroredTreeXPosition) / 2;
        const lampZPosition = treeZPosition;

        //load lamps
        this.loadLampModel(lampXPosition, lampZPosition);
        this.loadLampModel(lampXPosition - 20, lampZPosition);
        this.loadLampModel(lampXPosition - 35, lampZPosition);
        this.loadLampModel(lampXPosition + 20, lampZPosition);

        //load benches
        this.loadBenchModel((lampXPosition - 20 + lampXPosition - 35) / 2, lampZPosition - 2);
        this.loadBenchModel((lampXPosition + 20 + tree1XPosition) / 2, lampZPosition - 2);
    }

    loadLampModel(xPosition, zPosition) {
        this.loadModel('importedModels/moscow_lamp_post/scene.gltf', [xPosition, 0, zPosition], [1, 1, 1], [0, 0, 0]);
    }

    loadBenchModel(xPosition, zPosition) {
        this.loadModel('importedModels/benchOld/scene.gltf', [xPosition, 0, zPosition], [1, 1, 1], [0, Math.PI / 2, 0]);
    }

    //nature: trees bushes
    addBushesToFormHalfSquare() {
        const stepWidth = 1.5;
        const mirrorDistance = 10;
        const bushOffsetX = 0;
        const numberOfBushes = 4;
        const bushSpacing = 3;
        const bushExtension = 6;
        const bushRows = 7;
        const xPositionDecreasePerRow = 2;

        for (let row = 0; row < bushRows; row++) {
            const xPosition = 10 + bushOffsetX + row * xPositionDecreasePerRow;

            for (let i = 0; i < numberOfBushes; i++) {
                const zPosition = stepWidth / 2 + 30 + i * bushSpacing;
                this.addBushAtPosition(xPosition, zPosition, Math.PI / 2);

                const mirroredXPosition = mirrorDistance - 22 - bushOffsetX - row * xPositionDecreasePerRow;
                this.addBushAtPosition(mirroredXPosition, zPosition, Math.PI / 2);
            }
        }
        for (let i = 0; i < bushExtension; i++) {
            const xPositionFirstSet = bushOffsetX + (i + 2) * bushSpacing;
            const xPositionMirroredSet = mirrorDistance - 14 - bushOffsetX - (i + 1) * bushSpacing;
            const zPositionEnd = stepWidth / 2 + 32 + (numberOfBushes - 1) * bushSpacing;

            this.addBushAtPosition(xPositionFirstSet, zPositionEnd);
            this.addBushAtPosition(xPositionMirroredSet, zPositionEnd);
        }
    }

    createWaterFountain() {
        const fountainGroup = new THREE.Group();
        const textureLoaderBasin = new THREE.TextureLoader();
        textureLoaderBasin.load(
            'textures/annie-spratt-ctXf1GVyf9A-unsplash.jpg',
            function(texture) {
                const basinMaterial = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0xe5de00,
                    side: THREE.DoubleSide
                });
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
        const tapGeometry = new THREE.CylinderGeometry(0.2, 0.2, 13, 32);
        const tapMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const tap = new THREE.Mesh(tapGeometry, tapMaterial);
        tap.position.set(0, 7, 0);
        fountainGroup.add(tap);

        const textureLoaderSink = new THREE.TextureLoader();

        textureLoaderSink.load(
            'textures/cia-gould-5-WsIPUwhlI-unsplash.jpg',
            function(texture) {
                const sinkMaterial = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });

                const sinkGeometry = new THREE.RingGeometry(7, 1, 6);
                const sink = new THREE.Mesh(sinkGeometry, sinkMaterial);
                sink.position.set(0, 10, 0);

                const sinkRotationX = Math.PI / 2;
                const sinkRotationY = 0;
                sink.rotation.set(sinkRotationX, sinkRotationY, 33);

                fountainGroup.add(sink);
            },
            undefined,
            function(error) {
                console.error('An error occurred loading the texture:', error);
            }
        );

        const waterParticles = [];
        const waterMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
        for (let i = 0; i < 20; i++) {
            const waterGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const waterDroplet = new THREE.Mesh(waterGeometry, waterMaterial);
            waterDroplet.position.set(0, 15, 0);
            waterParticles.push(waterDroplet);
            fountainGroup.add(waterDroplet);
        }

        fountainGroup.userData = { waterParticles, timeOffset: 0 };
        fountainGroup.position.set(-1, 0.8, 36);
        fountainGroup.scale.set(0.1, 0.1, 0.1);

        this.scene.add(fountainGroup);

        fountainGroup.name = 'WaterFountain';
    }
    drawBushes(bushesAmount, startXPos, startZPos, rotation = null) {
        if (rotation === null) {
            for (let i = 0; i < bushesAmount; i++) {
                const xPosition = startXPos + i * 4;
                this.addBushAtPosition(xPosition, startZPos);
            }
        } else {
            for (let i = 0; i < bushesAmount; i++) {
                const zPosition = startZPos - i * 4;
                this.addBushAtPosition(startXPos, zPosition, rotation);
            }
        }
    }

    addBushAtPosition(xPosition, zPosition, rotationY = 0) {
        const bushMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 }); //green color for the bush
        const bushGroup = new THREE.Group();

         const bottomCanopyPositions = [
            { x: 0, y: 1, z: 0 },
            { x: 1, y: 1, z: 0 },
            { x: -1, y: 1, z: 0 }
        ];

        const topCanopyPositions = [
            { x: 0.5, y: 2, z: 0 },
            { x: -0.5, y: 2, z: 0 }
        ];

        bottomCanopyPositions.forEach(pos => {
            const bottomCanopyGeometry = new THREE.SphereGeometry(1, 32, 32);
            const bottomCanopy = new THREE.Mesh(bottomCanopyGeometry, bushMaterial);
            bottomCanopy.position.set(pos.x, pos.y, pos.z);
            bushGroup.add(bottomCanopy);
        });

        topCanopyPositions.forEach(pos => {
            const topCanopyGeometry = new THREE.SphereGeometry(0.8, 32, 32);
            const topCanopy = new THREE.Mesh(topCanopyGeometry, bushMaterial);
            topCanopy.position.set(pos.x, pos.y, pos.z);
            bushGroup.add(topCanopy);
        });

        bushGroup.position.set(xPosition, 0, zPosition);
        bushGroup.rotation.y = rotationY;

        this.scene.add(bushGroup);
    }

    addTreeAtPosition(xPosition, zPosition) {
        const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(xPosition, 1.5, zPosition);
        this.scene.add(trunk);

        const canopyMaterial = new THREE.MeshLambertMaterial({ color: 0x00FF00 });

        const canopyPositions = [
            { x: 0, y: 5, z: 0 },
            { x: 1, y: 3.5, z: 1 },
            { x: -1, y: 3.5, z: 1 },
            { x: 1, y: 3.5, z: -1 },
            { x: -1, y: 3.5, z: -1 },
        ];

        canopyPositions.forEach(pos => {
            const canopyGeometry = new THREE.SphereGeometry(1.5, 32, 32);
            const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
            canopy.position.set(xPosition + pos.x, pos.y, zPosition + pos.z);
            this.scene.add(canopy);
        });
    }
    //roads
   createZebraCrossing(positionX, positionZ, roadWidth) {
        const stripeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });
        const numberOfStripes = 7;
        const stripeLength = roadWidth;
        const stripeWidth = 0.7;
        const gapBetweenStripes = 0.5;
        const totalCrossingLength = numberOfStripes * stripeWidth + (numberOfStripes - 1) * gapBetweenStripes;

        for (let i = 0; i < numberOfStripes; i++) {
            const stripeGeometry = new THREE.PlaneGeometry(stripeLength, stripeWidth);
            const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
            stripe.rotation.x = -Math.PI / 2;
            const zPosition = positionZ + (i * (stripeWidth + gapBetweenStripes)) - totalCrossingLength / 2;
            stripe.position.set(positionX, 0.11, zPosition);
            this.scene.add(stripe);
        }
    }

    createRoad(type, positionX, positionZ, roadLength, roadWidth) {
        let roadMaterial, roadGeometry, roadMesh;

        const borderMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color(0xa45a52) });
        const borderGeometry = new THREE.BoxGeometry(roadLength, 0.2, 0.2);

        if (type === 'bike') {
            const roadTexture = new THREE.TextureLoader().load('textures/engin-akyurt-HPXHqpVruqI-unsplash.jpg');
            roadMaterial = new THREE.MeshMatcapMaterial({ map: roadTexture, color: new THREE.Color(0xcccccc) });
        } else if (type === 'car') {
            const roadTexture = new THREE.TextureLoader().load('textures/olga-thelavart-MHh6VeVnJRM-unsplash.jpg');
            roadMaterial = new THREE.MeshMatcapMaterial({ map: roadTexture });
        }

        roadGeometry = new THREE.PlaneGeometry(roadLength, roadWidth);
        roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
        roadMesh.rotation.x = -Math.PI / 2;
        roadMesh.position.set(positionX, 0.1, positionZ);
        this.scene.add(roadMesh);

        const border1 = new THREE.Mesh(borderGeometry, borderMaterial);
        border1.position.set(positionX, 0.2, positionZ + roadWidth / 2 + 0.1);
        this.scene.add(border1);

        const border2 = new THREE.Mesh(borderGeometry, borderMaterial);
        border2.position.set(positionX, 0.2, positionZ - roadWidth / 2 - 0.1);
        this.scene.add(border2);

        if (type === 'car') {
            const lineMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });
            const dashGeometry = new THREE.PlaneGeometry(1, 0.1);
            const numberOfDashes = roadLength / 3;
            const dashSpacing = 3;

            for (let i = 0; i < numberOfDashes; i++) {
                const dash = new THREE.Mesh(dashGeometry, lineMaterial);
                dash.rotation.x = -Math.PI / 2;
                dash.position.set(positionX + (i * dashSpacing) - roadLength / 2, 0.11, positionZ);
                this.scene.add(dash);
            }

            this.createZebraCrossing(-19, 12.25, roadWidth);
            this.createZebraCrossing(27, 12.25, roadWidth);
        }
    }

    addDrivingCars(){
        this.loadModel('importedModels/car_sport/scene.gltf', [-45, 57.25, 10], [1,1,1], [0, Math.PI/2, 0], null, "car");
        this.loadModel('importedModels/car-peugeot_206/scene.gltf', [45, -1, 16], [1, 1, 1], [0, -Math.PI / 2, 0], null, "peugeotCar");
    }
    //street decor
    addBenches() {
        const benchModelPath = 'importedModels/benchOld/scene.gltf';
        const benchScale = [1, 1, 1];
        const benchRotation = [0, Math.PI / 2 + Math.PI / 2 + Math.PI / 2, 0];

        this.loadModel(benchModelPath, [1, 0, -6], benchScale, benchRotation);
        this.loadModel(benchModelPath, [-7, 0, -6], benchScale, benchRotation);

        const benchPositionBetweenHouses = [(20 - 18) / 2, 0, -6];
        this.loadModel(benchModelPath, benchPositionBetweenHouses, benchScale, benchRotation);
    }

    addTrees() {
        const treeModelPath = 'importedModels/maple_tree/scene.gltf';
        const treeScale = [0.1, 0.1, 0.1];
        const treeRotation = [0, Math.PI / 2, 0];

        this.loadModel(treeModelPath, [4.5, 0, -6.5], treeScale, treeRotation);
    }

    addLamps() {
        const lampModelPath = 'importedModels/moscow_lamp_post/scene.gltf';
        const lampScale = [1, 1, 1];
        const lampRotation = [0, Math.PI / 2, 0];

        this.loadModel(lampModelPath, [-3, 0, -6], lampScale, lampRotation);
    }

    addFlowers() {
        const flowerModelPath = 'importedModels/moon_tears/scene.gltf';
        const flowerScale = [0.5, 0.5, 0.5];

        const flowerPositions = [
            [-2, 0, -5], [-4, 0, -6], [-4, 0, -7], [-5, 0, -8],
            [-1, 0, -6], [2, 0, -7], [3, 0, -5],
            [-6, 0, -6], [-7, 0, -7], [-7, 0, -5]
        ];

        flowerPositions.forEach(position => {
            this.loadModel(flowerModelPath, position, flowerScale);
        });
    }

    drawStreetDecorations() {
        this.addBenches();
        this.addTrees();
        this.addLamps();
        this.addFlowers();
    }

    createOrientedRoad(type, positionX, positionZ, roadLength, roadWidth, orientation = 'z') {
        let roadMaterial, roadGeometry, roadMesh;

        const roadTexture = new THREE.TextureLoader().load(
            type === 'bike' ? 'textures/engin-akyurt-HPXHqpVruqI-unsplash.jpg' : 'textures/olga-thelavart-MHh6VeVnJRM-unsplash.jpg'
        );
        roadMaterial = new THREE.MeshMatcapMaterial({ map: roadTexture });
        roadGeometry = new THREE.PlaneGeometry(roadLength, roadWidth);
        roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
        roadMesh.rotation.x = -Math.PI / 2;

        if (orientation === 'x') {
            roadMesh.rotation.z = Math.PI / 2;
            roadMesh.position.set(positionX + roadLength / 2, 0.1, positionZ);
        } else {
            roadMesh.position.set(positionX, 0.1, positionZ);
        }

        this.scene.add(roadMesh);
    }

    addCenterLine(positionX, positionZ, roadLength) {
        const lineMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });
        const lineGeometry = new THREE.PlaneGeometry(0.2, 33);
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.rotation.x = -Math.PI / 2;
        line.position.set(positionX + roadLength / 2, 0.11, positionZ);

        this.scene.add(line);
    }

    loadModel(path, position, scale, rotation = null, color = null, name = null) {
        this.gltfLoader.load(path, (gltf) =>  {
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

            this.scene.add(model);
        });
    }
}
