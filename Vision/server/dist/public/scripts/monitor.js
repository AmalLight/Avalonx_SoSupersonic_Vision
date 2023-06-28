"use strict";
class Monitor {
    constructor(i) { this.device = i; }
    setPC() { this.device = 1; }
    setTablet() { this.device = 2; }
    setSmartphone() { this.device = 3; }
    setNull() { this.device = 0; }
    static pc() { return 1; }
    static tablet() { return 2; }
    static smartphone() { return 3; }
    static nothing() { return 0; }
    static width() { return 0.96; }
    static padding() { return 7 * 3; }
    static border() { return 2; }
    setDevice(value) {
        if (value == Monitor.pc())
            this.setPC();
        else if (value == Monitor.tablet())
            this.setTablet();
        else if (value == Monitor.smartphone())
            this.setSmartphone();
        else
            this.setNull();
    }
    getDevice() { return this.device; }
}
