class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.move = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false
        };

        this.busState = 0;
        this.busTimer = 0;
        this.carInvisibleState = false;
        this.carInvisibleTimer = 0;
        this.busAtStation = true;
        this.carCanDrive = true;
        this.peugeotInvisibleState = false;
        this.peugeotTimer = 0;
        this.peugeotInvisibleTimer = 0;

        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW':
                this.move.forward = true;
                break;
            case 'KeyS':
                this.move.backward = true;
                break;
            case 'KeyA':
                this.move.left = true;
                break;
            case 'KeyD':
                this.move.right = true;
                break;
            case 'Space':
                this.move.up = true;
                break;
            case 'ShiftLeft':
                this.move.down = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case 'KeyW':
                this.move.forward = false;
                break;
            case 'KeyS':
                this.move.backward = false;
                break;
            case 'KeyA':
                this.move.left = false;
                break;
            case 'KeyD':
                this.move.right = false;
                break;
            case 'Space':
                this.move.up = false;
                break;
            case 'ShiftLeft':
                this.move.down = false;
                break;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
    }

    update() {
        this.view.render();
        const speed = 0.5;
        const direction = new THREE.Vector3();

        if (this.move.forward) this.view.camera.position.add(this.view.camera.getWorldDirection().multiplyScalar(speed));
        if (this.move.backward) this.view.camera.position.add(this.view.camera.getWorldDirection().multiplyScalar(-speed));
        if (this.move.left) {
            this.view.camera.getWorldDirection(direction);
            direction.cross(this.view.camera.up);
            this.view.camera.position.addScaledVector(direction, speed);
        }
        if (this.move.right) {
            this.view.camera.getWorldDirection(direction);
            direction.cross(this.view.camera.up);
            this.view.camera.position.addScaledVector(direction, -speed);
        }
        if (this.move.up) this.view.camera.position.y += speed;
        if (this.move.down) this.view.camera.position.y -= speed;

        //car and Peugeot animation logic
        const car = this.view.model.scene.getObjectByName('car');
        const peugeot = this.view.model.scene.getObjectByName('peugeotCar');

        if (car && peugeot) {
            if (!this.carInvisibleState && this.carCanDrive) {
                car.position.x += 0.1;
                if (car.position.x > 45) {
                    car.visible = false;
                    this.carInvisibleState = true;
                    car.position.x = -45;
                }
            } else if (this.carInvisibleState) {
                this.carInvisibleTimer += 1 / 60;
                if (this.carInvisibleTimer > 55) {
                    car.visible = true;
                    this.carInvisibleState = false;
                    this.carInvisibleTimer = 0;
                }
            }

            if (!this.peugeotInvisibleState && this.carCanDrive) {
                peugeot.position.x -= 0.1;
                if (peugeot.position.x < -45) {
                    peugeot.visible = false;
                    this.peugeotInvisibleState = true;
                    peugeot.position.x = 45;
                }
            } else if (this.peugeotInvisibleState) {
                this.peugeotInvisibleTimer += 1 / 60;
                if (this.peugeotInvisibleTimer > 55) {
                    peugeot.visible = true;
                    this.peugeotInvisibleState = false;
                    this.peugeotInvisibleTimer = 0;
                }
            }
        }

        //water fountain animation
        const fountainGroup = this.view.model.scene.getObjectByName('WaterFountain');
        if (fountainGroup) {
            const {waterParticles, timeOffset} = fountainGroup.userData;
            const particleSpeed = 0.05;
            const maxParticleHeight = 17;
            const particleDropHeight = 2;

            waterParticles.forEach((particle, index) => {
                const time = ((timeOffset + index * 0.1) % 4) - 2;
                let yPos = 7 + (time * maxParticleHeight) - (4.9 * time * time);
                if (yPos < particleDropHeight) yPos = 7;
                particle.position.y = yPos;
            });

            fountainGroup.userData.timeOffset += 0.05;
        }

        //bus animation
        const lerpAngle = (currentAngle, targetAngle, delta) => {
            const pi = Math.PI;
            const difference = (targetAngle - currentAngle + 3 * pi) % (2 * pi) - pi;
            return currentAngle + difference * delta;
        };

        const drivingBus = this.view.model.scene.getObjectByName("drivingBus");
        const initialBusPosition = {x: 42, y: 0, z: 65};
        const initialBusRotation = {x: 0, y: Math.PI, z: 0};

        if (drivingBus) {
            this.busTimer += 0.05;
            switch (this.busState) {
                case 0:
                    this.busAtStation = true;
                    this.carCanDrive = true;
                    if (this.busTimer > 50) {
                        this.busState = 1;
                        this.busTimer = 0;
                    }
                    break;
                case 1:
                    this.busAtStation = false;
                    this.carCanDrive = false;
                    drivingBus.position.z -= 0.1;
                    if (this.busTimer > 27.5) {
                        this.busState = 2;
                        this.busTimer = 0;
                    }
                    break;
                case 2:
                    const targetYRotation = Math.PI / 2 + Math.PI / 2 + Math.PI / 2;
                    const rotationDelta = 0.05;

                    drivingBus.rotation.y = lerpAngle(drivingBus.rotation.y, targetYRotation, rotationDelta);

                    if (Math.abs(drivingBus.rotation.y - targetYRotation) < 0.01) {
                        this.busState = 3;
                        this.busTimer = 0;
                    }
                    break;

                case 3:
                    drivingBus.position.x -= 0.1;
                    if (this.busTimer > 40) {
                        this.busState = 4;
                        this.busTimer = 0;
                        drivingBus.visible = false;
                        drivingBus.rotation.y = Math.PI / 2;
                    }
                    break;
                case 4:
                    if (this.busTimer > 15) {
                        drivingBus.visible = true;
                        drivingBus.position.z += 4;
                        this.busState = 5;
                        this.busTimer = 0;
                    }
                    break;
                case 5:
                    drivingBus.position.x += 0.1;
                    if (this.busTimer > 38.5) {
                        this.busState = 6;
                        this.busTimer = 0;
                    }
                    break;
                case 6:
                    drivingBus.rotation.y = Math.PI / 2 + Math.PI / 2 + Math.PI / 2 + Math.PI / 2;
                    if (this.busTimer > 1) {
                        this.busState = 7;
                        this.busTimer = 0;
                    }
                    break;
                case 7:
                    drivingBus.position.z += 0.1;
                    if (this.busTimer > 25) {
                        this.busState = 8;
                        this.busTimer = 0;
                    }
                    break;
                case 8:
                    if (this.busTimer > 10) {
                        this.busState = 0;
                        this.busTimer = 0;
                        drivingBus.rotation.set(initialBusRotation.x, initialBusRotation.y, initialBusRotation.z);
                        drivingBus.position.set(initialBusPosition.x, initialBusPosition.y, initialBusPosition.z);
                    }
                    this.busAtStation = true;
                    this.carCanDrive = true;
                    break;
            }
        }
    }
}
