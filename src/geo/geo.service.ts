import { Injectable } from '@nestjs/common';
import * as geoip from 'geoip-lite';

@Injectable()
export class GeoService {
    getGeoData(ip: string) {
        const geo = geoip.lookup(ip);
        if (!geo) {
            throw new Error('NotFound');
        }
        return {
            lat: geo.ll[0],
            lng: geo.ll[1],
            country: geo.country,
            city: geo.city
        };
    }
}
