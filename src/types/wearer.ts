  interface Wearer {
    deviceId: string;
    firstName: string;
    lastName: string;
    phone: string;
    imei: string;
    weight: number;
    height: number;
    birthday: Date | null;
    steps: number;
    deviceManufacturer: string;
    userInCharge: User;
    settings: WatchSettings;
    lastKnownLocation: GeoPoint;
    lastLocationTime: Date;
    lastAccuracy: number;
    accuracy: number;
    batteryPercentage: number;
    avatarId: number;
    active: boolean;
    lastTKQ: Date | null;
    hearts: number;
    hasWatchOn: boolean;
    GPSMode: number;
    lastGpsDate: Date;
    fromGps: boolean;
    oldLocation: string[];
    // image: File | null; // Not sure how you want to handle files
    pushy: string | null;
    updatedLocation: boolean;
    model: number;
    firstLinked: Date;
    batterySaveInUse: boolean;
  }
  