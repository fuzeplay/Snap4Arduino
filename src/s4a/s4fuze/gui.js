//Loads a costume from disk and adds it to the costumes tab for the current active sprite
//Can also set this costume (and it's label (imageName) to the current sprite.
//Can be improved in the future to get the imageName straight from the costumes file
IDE_Morph.prototype.addCostumeToSprite = function (imageURL, imageName, assignToCurrentSprite = false) {

    loadCostume(imageURL, imageName)
        .then(costume => {

            if (costume.isTainted()) {
                this.inform(
                    'Unable to import this image',
                    'The picture you wish to import has been\n' +
                    'tainted by a restrictive cross-origin policy\n' +
                    'making it unusable for costumes in Snap!. \n\n' +
                    'Try downloading this picture first to your\n' +
                    'computer, and import it from there.'
                );
                return;
            }

            this.currentSprite.addCostume(costume);

            if (assignToCurrentSprite) {
                this.currentSprite.wearCostume(costume);
            }

            this.hasChangedMedia = true;
        }, error => {
            this.inform(
                error
            );
        });
};

loadCostume = function(imageURL, imageName) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function () {
            const canvas = newCanvas(new Point(img.width, img.height), true);
            canvas.getContext('2d').drawImage(img, 0, 0);
            resolve(new Costume(canvas, imageName));
        };

        img.src = imageURL;
    });
};


//Load Fuze costumes right off the bat
IDE_Morph.prototype.loadFuzeCostumes = function() {
    this.addCostumeToSprite("Costumes/bot_radio.png", "Fuze Bot Radio");
    this.addCostumeToSprite("Costumes/bot_standing.png", "Fuze Bot Standing");
    this.addCostumeToSprite("Costumes/catch_the_light.png", "Fuze Catch the Light", true);
    this.addCostumeToSprite("Costumes/glow_admire.png", "Fuze Glow Admire");
    this.addCostumeToSprite("Costumes/paints.png", "Fuze Paints");
    this.addCostumeToSprite("Costumes/see_stars.png", "Fuze see Stars");
    this.addCostumeToSprite("Costumes/shock_and_aew.png", "Fuze Shock and Awe");
};
