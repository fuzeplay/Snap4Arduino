// //Used to ID this message as an LED_STRIP message
const LED_STRIP = 0x7C;

//Add Fuze methods to set LED Strip Colors
Arduino.prototype.addFuzeMethods = function() {
    let myself = this;
    myself.board.setLEDStripColor = function (ledPin, colorCode) {
        myself.board.sysexCommand([
            LED_STRIP,
            ledPin,
            colorCode
        ]);
    };
};