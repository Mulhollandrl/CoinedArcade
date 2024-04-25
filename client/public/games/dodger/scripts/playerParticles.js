function playerParticleSystem(xCoord, yCoord, context) {
    'use strict';

    let image = new Image();
    let isReady = false;  // Can't render until the texture is loaded

    //
    // Get the texture to use for the particle system loading and ready for rendering
    image.onload = function() {
        isReady = true;
    }
    image.src = "games/dodger/assets/particle.png";

    let nextName = 1;       // Unique identifier for the next particle
    let particles = {};

    let x = xCoord;
    let y = yCoord;

    function create() {
        let size = Math.random() * (20 - 10) + 10;
        let p = {
                center: { x: x, y: y },
                size: { x: size, y: size},  // Making square particles
                direction: { x: (Math.random() * 2) - 1, y: (Math.random() * 2) - 1 },
                speed: Math.random() * (50 - 30) + 30, // pixels per second
                rotation: 0,
                lifetime: Math.random() * (10 - 1) + 1,    // How long the particle should live, in seconds
                alive: 0    // How long the particle has been alive, in seconds
            };

        return p;
    }

    function setXCoord(newX) {
        x = newX
    }

    function update(elapsedTime) {
        let removeMe = [];

        //
        // We work with time in seconds, elapsedTime comes in as milliseconds
        elapsedTime = elapsedTime / 1000;
        
        Object.getOwnPropertyNames(particles).forEach(function(value, index, array) {
            let particle = particles[value];
            //
            // Update how long it has been alive
            particle.alive += elapsedTime;

            //
            // Update its center
            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

            //
            // Rotate proportional to its speed
            particle.rotation += particle.speed / 500;

            //
            // If the lifetime has expired, identify it for removal
            if (particle.alive > particle.lifetime) {
                removeMe.push(value);
            }
        });

        //
        // Remove all of the expired particles
        for (let particle = 0; particle < removeMe.length; particle++) {
            delete particles[removeMe[particle]];
        }
        removeMe.length = 0;

        //
        // Generate some new particles
        for (let particle = 0; particle < 1; particle++) {
            //
            // Assign a unique name to each particle
            particles[nextName++] = create();
        }
    }

    function render() {
        if (isReady) {
            Object.getOwnPropertyNames(particles).forEach( function(value) {
                let particle = particles[value];
                // DO ROTATION
                // 
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                context.drawImage(image, particle.center.x, particle.center.y, particle.size.x, particle.size.y);
            });
        }
    }

    let api = {
        setXCoord : setXCoord,
        update : update,
        render : render,
        get particles() { return particles; }
    };

    return api;
}
