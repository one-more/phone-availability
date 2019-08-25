import { DeviceData } from '~/modules/app/data/models';
import { FONO_TOKEN } from '~/modules/app/data/constants';

export function getDeviceData(devices: string[]): Promise<DeviceData> {
    return Promise.all(
        devices.map(device =>
            fetch(`https://fonoapi.freshpixl.com/v1/getdevice?token=${FONO_TOKEN}&device=${device}`).then(body =>
                body.json(),
            ),
        ),
    ).then(responses => {
        const deviceData: DeviceData = {};
        for (let i = 0; i < devices.length; i++) {
            deviceData[devices[i]] = responses[i][0];
        }
        return deviceData;
    });
}
