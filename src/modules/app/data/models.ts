export class User {
    username: string;
}

export interface Device {
    Brand: string;
    DeviceName: string;
    alert_types: string;
    announced: string;
    audio_quality: string;
    battery_c: string;
    bluetooth: string;
    body_c: string;
    browser: string;
    camera: string;
    card_slot: string;
    chipset: string;
    colors: string;
    cpu: string;
    dimensions: string;
    display: string;
    edge: string;
    features: string;
    features_c: string;
    gprs: string;
    gps: string;
    gpu: string;
    internal: string;
    java: string;
    loudspeaker: string;
    loudspeaker_: string;
    messaging: string;
    multitouch: string;
    music_play: string;
    network_c: string;
    os: string;
    primary_: string;
    protection: string;
    radio: string;
    resolution: string;
    sar_eu: string;
    sar_us: string;
    secondary: string;
    sensors: string;
    sim: string;
    size: string;
    speed: string;
    stand_by: string;
    status: string;
    talk_time: string;
    technology: string;
    type: string;
    usb: string;
    video: string;
    weight: string;
    wlan: string;
    _2g_bands: string;
    _3_5mm_jack_: string;
    _3g_bands: string;
    _4g_bands: string;
}

export interface DeviceData {
    [name: string]: Device;
}

export interface Bookings {
    [device: string]: User & { bookingDate: Date };
}

export class AppState {
    user: User;
    devices: string[] = [
        'Samsung Galaxy S9',
        'Samsung Galaxy S8',
        'Samsung Galaxy S7',
        'Motorola Nexus 6',
        'LG Nexus 5X',
        'Huawei Honor 7X',
        'Apple iPhone X',
        'Apple iPhone 8',
        'Apple iPhone 4s',
        'Nokia 3310',
    ];
    deviceData: DeviceData = {};
    bookings: Bookings = {};

    constructor(user: User, deviceData: DeviceData, bookings: Bookings) {
        this.user = user;
        this.deviceData = deviceData;
        this.bookings = bookings;
    }
}
